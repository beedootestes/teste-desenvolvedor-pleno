const questionModel = require('../models/questionModel');

const getAll = async () => questionModel.getAll();

module.exports = { getAll };