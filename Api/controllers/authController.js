import bcrypt from "bcrypt";
import userCollection from "../models/registrationModel.js";
import jwt from "jsonwebtoken";
import { messages } from "../utils/constant.js";

export const authUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    const auth = await userCollection.findOne({
      email: email,
      isDelete: false,
    });
    if (!auth) {
      return res.status(404).json({
        message: messages.notFound,
        success: false,
      });
    }

    const comparePassword = await bcrypt.compare(password, auth.password);

    if (!comparePassword) {
      return res.status(401).json({
        message: messages.passwordInvalid,
        success: false,
      });
    }

    const payload = {
      userId: auth._id,
      userRole: auth.role,
      email: auth.email,
      firstName: auth.firstName,
      lastName: auth.lastName,
      gender: auth.gender,
    };

    const token = jwt.sign(payload, process.env.JWT_TOKEN);

    return res.status(200).json({
      message: messages.loginSuccess,
      userRole: auth.role,
      token: token,
      userDetail: auth,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: messages.serverError,
      error: error.message,
      success: false,
    });
  }
};
