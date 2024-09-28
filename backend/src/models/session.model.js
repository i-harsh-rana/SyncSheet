import mongoose from "mongoose";

const sessionSchema = new Schema({
    documnetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
        required: true
    },
    activeUsers: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: {
            type: String,
        },
        cutsorPosition: {
            type: Number
        }
    }],
    changes: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        chnage:{
            type: String
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
}, {timestamps: true})

export const Session = new mongoose.model('Session', sessionSchema);