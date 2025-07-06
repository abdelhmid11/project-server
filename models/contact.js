import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// ✅ استخدم موديل موجود لو كان متسجل بالفعل
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact;
