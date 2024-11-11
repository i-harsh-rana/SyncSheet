import connectDB from './db/index.db.js'
import dotenv from 'dotenv';
import { app, server } from './app.js'

dotenv.config({
    path: './.env'
})

connectDB()
    .then(() => {
        server.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
            console.log(`Socket.IO is ready for connections`);
        })
    })
    .catch((error) => {
        console.log("Database connection error: ", error);
        process.exit(1);  
    })