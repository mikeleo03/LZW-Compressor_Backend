import express from 'express';
import { compress } from '../algorithm/algorithm.js';
import Compress from '../models/Compress.js';

const router = express.Router();
router.use(express.json());

// Handle compression answer
router.get('/answer', async (req, res) => {
    try {
        // 1. Return the answer
        let answer = compress(req.query.text);

        // 2. Put into database
        var today = new Date();
        var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
        var time = today.getHours() + "." + today.getMinutes();
    
        // Create model to be saved in the database
        const compressData = new Compress({
            text: req.query.text,
            time: time,
            date: date,
            compressed: answer
        });

        console.log(compressData);
    
        // Saving to the database
        await compressData.save();
        res.status(200).json({ data: answer });

    } catch (error) {
        console.error("Error compressing data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});  

export default router;