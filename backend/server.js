const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const path = require('path');
const materialRoutes = require('./routes/materialRoutes');
const placementRoutes = require('./routes/placementRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const eventRoutes = require('./routes/eventRoutes');
const lostFoundRoutes = require('./routes/lostFoundRoutes');


// 1. Load environment variables
dotenv.config();

// 2. Database connect karo
connectDB();

// 3. Express ko initialize karo
const app = express();

// 4. Middlewares (Inka order routes se pehle hona chahiye)
app.use(cors());
app.use(express.json()); // Ye line backend ko JSON samajhne mein madad karti hai
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// 5. Routes define karo
app.use('/api/auth', authRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/placements', placementRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/lostfound', lostFoundRoutes);


// Test Route
app.get('/', (req, res) => {
    res.send('Campus Connect API is running...');
});

// 6. Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});