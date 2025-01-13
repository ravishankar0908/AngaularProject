import userCollection from "../models/registrationModel.js";
import { messages } from "../utils/constant.js";

export const getAllDeletedUser = async (req, res) => {
  try {
    const deletedUser = await userCollection.find({ isDelete: true });
    if (deletedUser.length === 0) {
      return res.status(400).json({
        message: messages.notFound,
      });
    }
    return res.status(200).json({
      message: messages.found,
      userDetails: deletedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: messages.serverError,
      error: error.message,
    });
  }
};

// reset deleted user
export const resetUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const { reset } = req.body;

    const deleteUser = await userCollection.findByIdAndUpdate(
      { _id: userId },
      { $set: { isDelete: reset } }
    );

    if (!deleteUser) {
      return res.status(400).json({
        message: messages.notReset,
      });
    }
    return res.status(200).json({
      message: messages.reset,
    });
  } catch (error) {
    return res.status(500).json({
      message: messages.serverError,
      error: error.message,
    });
  }
};
