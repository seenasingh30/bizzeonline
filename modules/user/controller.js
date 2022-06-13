const model = require('./model');
var encryption = require('../../utils/encryption');
const response = require('../../utils/response');
const messages = require('../../utils/messages');

class UserController {
    async signup(req, res) {
        try {
            const { name, email, password } = req.body;
            const user = await model.findOne({ email });
            if (user) {
                return response.error(res, messages.user.user_exist);
            }
            const hash = await encryption.hashPasswordUsingBcrypt(password)
            const newUser = await model.create({ name, email, password: hash });
            return response.sendSuccess(res, messages.user.signupSuccess, newUser);
        } catch (error) {
            return response.sendError(res, messages.user.signupError);
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await model.findOne({ email });
            if (!user) {
                return response.sendError(res, messages.user.login_failed);
            }
            const isValid = await encryption.comparePasswordUsingBcrypt(password, user.password);
            if (!isValid) {
                return response.sendError(res, messages.user.login_failed);
            }
            let data = {
                _id: user._id,
                date : new Date(),
            }
            const token = await encryption.generateAuthToken(data);
            res.cookie('Authorization', token);
            return response.sendSuccess(res, messages.user.login_success, user);
        } catch (error) {
            console.log(error);
            return response.sendError(res, messages.user.login_failed);
        }
    }
    async get(req, res) {
        try {
           let meta = {};
           let limit = req.query.limit || 10;
           let page = req.query.page || 0;
           let query = req.query || {};
           delete query.limit;
           delete query.page;
           meta.page = page;
           let users = await model.find(query).skip(page * limit).limit(limit);
           meta.total = await model.find(query).countDocuments();
           return response.sendSuccess(res,messages.common.success ,users, meta);
        }
        catch (error) {
            return response.sendError(res, messages.common.error, error);
        }
    }


}
module.exports = new UserController();