const mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['TO_DO', 'IN_PROGRESS', 'DONE'], 
        default: 'TO_DO'                    
    },
}, { timestamps: true });

module.exports = mongoose.model('tasks', taskSchema);