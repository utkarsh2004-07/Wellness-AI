import mongoose from 'mongoose';

const RoutineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  video_url: {
    type: String,
    default: null
  },
  thumbnail_url: {
    type: String,
    default: null
  },
  steps: [{
    step_number: Number,
    instruction: String,
    duration: String,
    image_url: String
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  premium_required: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ['face-yoga', 'massage', 'exercise'],
    default: 'face-yoga'
  },
  duration_minutes: {
    type: Number,
    default: 10
  }
}, {
  timestamps: true
});

export default mongoose.models.Routine || mongoose.model('Routine', RoutineSchema);