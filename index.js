import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import resourceRoutes from './routes/resources.js';
import contactRoutes from './routes/contact.js'; // ✅ أضفنا Route التواصل معنا

// تحميل متغيرات البيئة
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// الاتصال بـ MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // خروج لو الاتصال فشل
  });

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://lustrious-gingersnap-3b0d0d.netlify.app', // 👈 دومين Netlify الخاص بك
    'https://shafaq-luxury-04d73b.netlify.app'         // 👈 لو عندك نسخة تانية
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/contact', contactRoutes); // ✅ أضفنا هنا Route التواصل معنا

// ✅ Health check بسيط
app.get('/api/health', (req, res) => {
  res.json({
    message: 'Server is running ✅',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    message: 'حدث خطأ في الخادم',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'الصفحة غير موجودة' });
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
