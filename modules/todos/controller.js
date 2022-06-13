const model = require('./model');
var encryption = require('../../utils/encryption');
const response = require('../../utils/response');
const messages = require('../../utils/messages');

class TodoController {
    async create(req, res) {
        try {
            let token = req.cookies.Authorization;
            let user = await encryption.findByToken(token);
            req.body.uid = user._id;
            const make = await model.create(req.body);
            response.sendSuccess(res, messages.common.success, make);
        }
        catch (err) {
            console.log(err);
            response.sendError(res, messages.todo.error);
        }
    }
    async get(req, res) {
        try {
            let meta = {};
            let page = req.query.page || 0;
            let limit = req.query.limit || 5;
            let sort = req.query.sort || 'createdAt';
            let order = 1;
            let query = req.query || {};
            delete query.page;
            delete query.limit;
            delete query.sort;
            if (req.query.order === 'asc') {
                order = 1;
            }
            else if (req.query.order === 'desc') {
                order = -1;
            }
            delete query.order;
            if (query.search) {
                query.title = { $regex: query.search, $options: 'i' };
                delete query.search;
            }
            if (query.startDate) {
                query.time = { $gte: query.startDate };
                delete query.startDate;
            }
            if (query.endDate) {
                query.time = { $lte: query.endDate };
                delete query.endDate;
            }
            if (query.startDate && query.endDate) {
                query.time = { $gte: query.startDate, $lte: query.endDate };
                delete query.startDate;
                delete query.endDate;
            }
            if (query.date) {
                let get_date = new Date(query.date);
                let start_date = new Date(get_date.getFullYear(), get_date.getMonth(), get_date.getDate(), 0, 0, 0);
                let end_date = new Date(get_date.getFullYear(), get_date.getMonth(), get_date.getDate(), 23, 59, 59);
                query.time = { $gte: start_date, $lte: end_date }; 
                delete query.date;
            }
            let todos = await model.find(query).skip(page * limit).limit(limit).sort({ sort: order });
            let count = await model.countDocuments(query);
            meta.page = page+1;
            meta.limit = limit;
            meta.total = count;
            meta.pages = Math.ceil(count / limit);
            response.sendSuccess(res, messages.common.success, todos, meta);
        }
        catch (err) {
            console.log(err);
            response.sendError(res, messages.todo.error);
        }
    }
    async edit(req, res) {
        try {
            const todo = await model.findByIdAndUpdate(req.params.id, req.body);
            response.sendSuccess(res, messages.common.success, todo);
        }
        catch (err) {
            console.log(err);
            response.sendError(res, messages.todo.error);
        }
    }
    async delete(req, res) {
        try {
            const todo = await model.findByIdAndDelete(req.params.id);
            response.sendSuccess(res, messages.common.success, todo);
        }
        catch (err) {
            console.log(err);
            response.sendError(res, messages.todo.error);
        }
    }
}
module.exports = new TodoController();