const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    items: [{
        description: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }
    }],
    total: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: 5,
    },
    disclaimer: {
        type: String,
        default: 'Thank you for your business!',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('bill', BillSchema); 