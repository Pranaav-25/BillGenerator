const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Bill Generator API is running...');
});

// Define Routes
app.use('/api/bills', require('./routes/bills'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 