/* const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { number } = require('joi');

const chartSchema = new mongoose.Schema({ //attributi chart
    labels: {type: number, required:true}, // asse x
    datasets: {type: number, required:true}
});

const Chart = mongoose.model("chart",chartSchema);

const validate = (data) =>{ //serve?
    const schema = Joi.object({
        labels: Joi.number().required().label('Labels'),
        datasets: Joi.number().required().label('Datasets'),
    });
    return schema.validate(data);
};

module.exports = {Chart, validate}; */