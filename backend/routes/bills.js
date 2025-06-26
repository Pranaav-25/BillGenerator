const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');

// @route   GET api/bills
// @desc    Get all bills
// @access  Public
router.get('/', async (req, res) => {
    try {
        const bills = await Bill.find().sort({ date: -1 });
        res.json(bills);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/bills
// @desc    Create a new bill
// @access  Public
router.post('/', async (req, res) => {
    const { customerName, email, items, rating, disclaimer } = req.body;

    // Calculate total
    const total = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    try {
        const newBill = new Bill({
            customerName,
            email,
            items,
            total,
            rating,
            disclaimer,
        });

        const bill = await newBill.save();
        res.json(bill);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/bills/:id
// @desc    Get bill by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id);
        if (!bill) {
            return res.status(404).json({ msg: 'Bill not found' });
        }
        res.json(bill);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Bill not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router; 