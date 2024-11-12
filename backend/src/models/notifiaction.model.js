import mongoose, { model, Schema } from "mongoose";

const notificationSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['document-edit', 'invitation', 'permission-change', 'other'],
        required: true
    },
    documentId: {
        type: Schema.Types.ObjectId,
        ref: 'Document',
        required: true
    },
    invitationId: {
        type: Schema.Types.ObjectId,
        ref: 'Invitation',
        required: false
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['unread', 'read'],
        default: 'unread'
    }
})

export const Notification = model('Notification', notificationSchema);