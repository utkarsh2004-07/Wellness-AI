import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  thumbnail_url: {
    type: String,
    default: null
  },
  category: {
    type: String,
    enum: ['face-yoga', 'massage', 'exercise', 'tutorial'],
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  duration_seconds: {
    type: Number,
    default: 0
  },
  premium_required: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.models.Video || mongoose.model('Video', VideoSchema);