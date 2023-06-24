import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import compressRouter from './routes/CompressRoute.js';
import decompressRouter from './routes/DecompressRoute.js';

dotenv.config();
const app = express();

// This variabel stores the value in env file to connect to DB
let connect;

const executorFunction = (resolve, reject) => {
    //This is just an executorFunction of a promise for connecting to DB
    connect = process.env.CONNECT_DB;

    if (connect) {
        resolve(connect);
    } else {
        reject("fail to read .env file");
    }
}

const read_env = () => {
    // This function return a promise which will try to connect to DB
    return new Promise(executorFunction);
}

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const prefix = "/api";

// SECURE API
// app.use(prefix + '/compHist', queryRouter)
app.use(prefix + '/compress', compressRouter)
/* app.use(prefix + '/compressDb', queryRouter)
app.use(prefix + '/decompHist', historyRouter) */
app.use(prefix + '/decompress', decompressRouter)
// app.use(prefix + '/decompressDb', historyRouter)

//Connecting to DB
read_env()
.then((e) => {
    console.log("Connecting to Database....")
    mongoose.connect(e, {autoIndex: true})
})
.then(() => console.log('Database connected'))
.catch(() => {
    console.log('fail to connect to DB')
})

const port = process.env.PORT || 443;
app.listen(port, () => console.log(`Listening on port ${port} : http://localhost:${port}`));