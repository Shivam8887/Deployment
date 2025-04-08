require('dotenv').config();
const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const { dbConnect } = require('./Configs/database');

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
dbConnect();

// CORS setup
app.use(cors({
    origin: process.env.CLIENT_URL?.split(',') || ["http://localhost:5173"],
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
    name: "sid", // Optional: name of the cookie
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
}));

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Server is healthy' });
});

// API routes
const routes = require('./Routes/routes');
app.use('/api', routes);

// Frontend static serving (optional)
if (process.env.NODE_ENV === 'production') {
    const clientPath = path.join(__dirname, '../client/dist');
    app.use(express.static(clientPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(clientPath, 'index.html'));
    });
}

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
});
