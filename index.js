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
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/contact', contactRoutes); // ✅ أضفنا هنا Route التواصل معنا

// Health check
app.get('/api/health', async (req, res) => {
  try {
    // استدعاء الموديلات لإحصاء عدد المستخدمين والموارد
    const { default: User } = await import('./models/User.js');
    const { default: Resource } = await import('./models/Resource.js');
    const { default: Contact } = await import('./models/Contact.js');

    const userCount = await User.countDocuments();
    const resourceCount = await Resource.countDocuments();
    const contactCount = await Contact.countDocuments();

    res.json({
      message: 'Server is running',
      status: 'OK',
      timestamp: new Date().toISOString(),
      users: userCount,
      resources: resourceCount,
      contacts: contactCount
    });
  } catch (err) {
    console.error('Health check error:', err);
    res.status(500).json({ message: 'Error fetching health stats' });
  }
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
