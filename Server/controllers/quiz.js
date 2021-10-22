const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const postScore = async (req, res) => {
  const { quizId, score } = req.body;
  const { _id } = req.user;

  const quizProperty = "quizCat" + quizId.toString();
  //   [] stands for dynamic property name
  await User.findByIdAndUpdate(_id, { $push: { [quizProperty]: { score } } });
  res.status(StatusCodes.OK).json({ status: "success", data: { score } });
};

const getScore = async (req, res) => {
  const { quizId } = req.query;
  const { _id } = req.user;

  const quizProperty = "quizCat" + quizId.toString();
  const user = await User.findOne({ _id });
  return res
    .status(StatusCodes.OK)
    .json({ status: "success", data: { score: user[quizProperty] } });
};
module.exports = { postScore, getScore };
