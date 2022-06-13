const auth = require("../utils/encryption");
const User = require("../modules/user/model");
const messages = require("../utils/messages")["common"];
const response = require("../utils/response");

const authenticate = async (req, res, next) => {
  let token = req.cookies.Authorization || req.headers.authorization;
  if (token) {
    try {
      const userExist = await auth.findByToken(token);
      if (userExist) {
        const user = await User.findById(userExist._id)
        if (user) {
          req.user = user;
          return next();
        }
      }
    } catch (err) {
      response.sendSystemError(res, err);
    }
  }
  else {
    return response.sendError(res, messages.unauthorized_login);
  }
};

module.exports = authenticate;
