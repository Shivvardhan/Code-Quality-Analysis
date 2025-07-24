const aiService = require("../services/ai.service");
const aiScore = require("../services/ai.score");

module.exports.getReview = async (req, res) => {
  const code = req.body.code;

  if (!code) {
    return res.status(400).send("code is required");
  }

  const response = await aiService(code);

  res.send(response);
};

module.exports.getScore = async (req, res) => {
  const code = req.body.code;

  if (!code) {
    return res.status(400).send("code is required");
  }

  const response = await aiScore(code);

  res.send(response);
};
