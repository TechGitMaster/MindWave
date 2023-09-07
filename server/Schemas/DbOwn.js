const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = (emailBy) => {

    const schema = new Schema({
        name: { type: String, required: true },
        idApi: { type: String, required: true },
        chat: { type: [], required: true },
    }, { timestamps: true }) 


    if(mongoose.models[emailBy]) return mongoose.models[emailBy];

    return mongoose.model(emailBy, schema);
}