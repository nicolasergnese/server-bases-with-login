/* const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const { number } = require('joi');

const chartSchema = new mongoose.Schema({
    labels:{type: number, required:true},
    data:{type: number, required:true},
});


const Chart = mongoose.model("chart", chartSchema);

const validate = (data) =>{
    const schema = Joi.object({
        labels: Joi.number().required().label('Labels'),
        data: Joi.number().required().label('Data'),
    });
    return schema.validate(data);
};

module.exports = {Chart, validate}; */