import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import http from 'http'
import {Server} from 'socket.io'
import {Document} from './models/document.model.js'

const app  = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true
      }
})

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "50mb" }))
app.use(express.urlencoded({extended: true, limit: '50mb'}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/user.route.js'

app.use('/api/v1/user', userRouter);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinDocument', (docId) => {
        socket.join(docId);
        console.log('User connected to doc:', docId);
    });

    socket.on('updateDocument', async (docId, content, userId) => {
        try {
            const document = await Document.findById(docId);

            if (!document) {
                return socket.emit('error', 'Document not found');
            }

            document.content = content;
            document.version.push({
                versionNumber: document.version.length + 1,
                change: "Content updated",
                editedBy: userId
            });

            await document.save();

            io.to(docId).emit('contentUpdate', { content, userId });
        } catch (error) {
            console.error('Error updating document:', error);
            socket.emit('error', 'Failed to update document');
        }
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
});

export { app }