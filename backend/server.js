const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const materialRoutes = require('./routes/materialRoutes');
const placementRoutes = require('./routes/placementRoutes');
const eventRoutes = require('./routes/eventRoutes');
const forumRoutes = require('./routes/discussionRoutes'); // File ka naam check kar lena (discussion ya forum)
const lostFoundRoutes = require('./routes/lostFoundRoutes');

// 1. Load Environment Variables
dotenv.config();

// 2. Connect to MongoDB
connectDB();

const app = express();

// 3. CORS Configuration (MOST IMPORTANT FOR DEPLOYMENT)
app.use(cors({
    origin: [
        "http://localhost:5173", // Local testing ke liye
        "https://idyllic-faun-9e86c2.netlify.app" // APNA NETLIFY LINK YAHAN DALO
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// 4. Static folder for File Uploads (Study Materials/Images ke liye)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 5. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/placements', placementRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/discussions', forumRoutes);
app.use('/api/lostfound', lostFoundRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('Campus Connect API is live and running...');
});

// 6. Server Port Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});