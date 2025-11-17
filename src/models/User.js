import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  subscription_status: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free'
  },
  premium_timestamp: {
    type: Date,
    default: null
  },
  profile_image: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model('User', UserSchema);