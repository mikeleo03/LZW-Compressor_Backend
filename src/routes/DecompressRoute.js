import express from 'express';
import { decompress } from '../algorithm/algorithm.js';
import Decompress from '../models/Decompress.js';

const router = express.Router();
router.use(express.json());

// Handle decompression answer
router.get('/answer', async (req, res) => {
    try {
        // 1. Return the answer
        let answer = decompress(req.query.text, req.query.enhanced);
        
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

        const decompressData = new Decompress({
            text: req.query.text,
            time: time,
            date: date,
            decompressed: answer,
            enhanced: enhanced,
        });

        console.log(decompressData);
    
        // Saving to the database
        await decompressData.save();
        res.status(200).json({ data: answer });

    } catch (error) {
        console.error("Error decompressing data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});  

export default router;