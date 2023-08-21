const mongoose = require('mongoose');
const Schema = mongoose.Schema;


module.exports = () => {
    const schema = new Schema({
        email: { type: String, required: true }
    }, { timestamps: true });


    if(mongoose.models['Accounts']) return mongoose.models['Accounts'];
    return mongoose.model('Accounts', schema);
}