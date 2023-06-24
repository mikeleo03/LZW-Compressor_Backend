import express from 'express';
import Compress from '../models/Compress.js';
import Decompress from '../models/Decompress.js';

const router = express.Router();
router.use(express.json());

// Handle compression history
router.get('/compress', async (req, res) => {
    try {
        // Retrieve all entries from the "Compress" collection
        const allEntries = await Compress.find({});
        res.status(200).json({ data: allEntries });

    } catch (error) {
        console.error("Error compressing data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}); 

// Handle decompression history
router.get('/decompress', async (req, res) => {
    try {
        // Retrieve all entries from the "Compress" collection
        const allEntries = await Decompress.find({});
        res.status(200).json({ data: allEntries });

    } catch (error) {
        console.error("Error compressing data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});  

export default router;