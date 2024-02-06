// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './Router/Router.js';
import Database from './Utilities/Database.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Welcome to product rate',
    });
});

app.use('/api/v1', router);

app.listen(PORT, async () => {
    try {
        console.log(`Server is running on port ${PORT}`);
        const con = await Database.connect();
        console.log(con.message);
    } catch (error) {
        console.error(`Error starting the server: ${error.message}`);
    }
});
