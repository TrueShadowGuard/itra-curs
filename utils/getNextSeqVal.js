const mongoose = require('mongoose')
const Counter = require('../models/Counter')

async function getNextSequenceValue(sequenceName){
    const counter = await Counter.findOne( { name: sequenceName})
    counter.count += 1;
    await counter.save();

    return counter.count;
}

module.exports = getNextSequenceValue;
