import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['video', 'book', 'website', 'course', 'tutorial', 'channel'],
    required: true
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'mobile', 'general', 'tools', 'algorithms'],
    required: true
  },
  language: {
    type: String,
    default: 'ar'
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  tags: [{
    type: String
  }],
  author: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  isFree: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Resource', resourceSchema);