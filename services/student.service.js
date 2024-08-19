const studentModel = require('../models/student.model');

const studentService = {

    getAll: async () => {
        return await studentModel.find();
    },

    saveAll: async (data) => {
        return await studentModel.create(data);
    },

    updateAll: async (id, newData) => {
        return await studentModel.findByIdAndUpdate(id, newData, { new: true });
    },

    deleteAll: async (id) => {
        return await studentModel.findByIdAndDelete(id);
    },

    getName: async (name) => {
        return await studentModel.findOne({name:name});
    }

};

module.exports = studentService;
