const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")

// Environment Variables Config
dotenv.config('.env')

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`UncaughtException Error: ${err.stack}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})

const app = express()
app.use(express.json())

app.use(cors())

// DataBase Connection
const db = require('./Config/database');

const { errorMiddleware } = require("./Middlewares/responseHandler")

//Import Routes and Error Middleware
app.use('/api',require('./Routes'))
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
console.log("PORT: ", port);

// Server Listen
const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

// Unhandled Promise Rejection
process.on('unhandleRejection', (err) => {
    console.log(`Error---------------: ${err}`);
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");
    server.close(() => {
        process.exit(1)
    })
})



