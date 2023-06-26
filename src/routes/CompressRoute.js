import express from 'express';
import { compress } from '../algorithm/algorithm.js';
import Compress from '../models/Compress.js';

const router = express.Router();
router.use(express.json());

// Handle compression answer
router.get('/answer', async (req, res) => {
    try {
        // 1. Return the answer
        let [answer, ratio] = compress(req.query.text, req.query.enhanced);

        // 2. Put into database
        var today = new Date();
        var date = today.getDate().toString().padStart(2, '0') + '/' +
                   (today.getMonth() + 1).toString().padStart(2, '0') + '/' +
                   today.getFullYear();
        var time = today.getHours().toString().padStart(2, '0') + '.' +
                   today.getMinutes().toString().padStart(2, '0');
    
        // Create model to be saved in the database
        let enhanced = ''
        if (req.query.enhanced === 'true') {
            enhanced = '[Enhanced]'
        } else {
            enhanced = '[Basic]'
        }

        const compressData = new Compress({
            text: req.query.text,
            time: time,
            date: date,
            compressed: answer,
            enhanced: enhanced,
            remained: ratio.toFixed(2),
        });
    
        // Saving to the database
        await compressData.save();
        res.status(200).json({ data: [answer, ratio] });

    } catch (error) {
        console.error("Error compressing data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});  

export default router;