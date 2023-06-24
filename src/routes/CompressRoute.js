import express from 'express';
import { compress } from '../algorithm/algorithm.js';

const router = express.Router();
router.use(express.json());

router.get('/answer', async (req, res) => {
    try {
        let answer = compress(req.query.text);
        res.status(200).json({ data: answer });
    } catch (error) {
        console.error("Error compressing data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});  

export default router;