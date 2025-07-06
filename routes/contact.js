import express from 'express';
import Contact from '../models/contact.js';

const router = express.Router();

// POST /api/contact
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'جميع الحقول مطلوبة' });
    }

    try {
        const newMessage = new Contact({ name, email, message });
        await newMessage.save();
        res.status(201).json({ success: true, message: 'تم إرسال الرسالة بنجاح' });
    } catch (err) {
        console.error('❌ خطأ في حفظ الرسالة:', err);
        res.status(500).json({ success: false, message: 'حدث خطأ أثناء إرسال الرسالة' });
    }
});

export default router;
