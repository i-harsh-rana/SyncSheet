import {model, Schema} from "mongoose";

const documentSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: "Untitled Document"
    },
    content: {
        type: String,
        default: ''
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    permissions: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        permission: {
            type: String,
            enum: ['read-only', 'read-write']
        }
    }],
    version: [{
        versionNumber:{
            type: Number,
            required: true
        },
        content:{
            type: String,
            required: true
        },
        timestamp:{
            type: Date,
            default: Date.now
        },
        editedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
},{timestamps: true})

export const Document = model('Document', documentSchema);