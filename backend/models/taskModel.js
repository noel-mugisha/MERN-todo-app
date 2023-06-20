
const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema ({
    task : {
        type:String,
        required : true
    },
    completed : {
        type:Boolean,
        default:false
    }
});

const taskModel = mongoose.model('Tasks',taskSchema);

module.exports = taskModel

