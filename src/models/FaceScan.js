import mongoose from 'mongoose';

const FaceScanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  bloating_score: {
    type: Number,
    min: 0,
    max: 10
  },
  jawline_score: {
    type: Number,
    min: 0,
    max: 10
  },
  puffiness: {
    type: Number,
    min: 0,
    max: 10
  },
  metrics: {
    cheek_puff: Number,
    jawline_visibility: Number,
    double_chin_level: Number,
    notes: String,
    recommendations: [String],
    // MediaPipe metrics
    jawline_angle: Number,
    face_width_ratio: Number,
    cheek_swelling_index: Number,
    symmetry_score: Number
  }
}, {
  timestamps: true
});

export default mongoose.models.FaceScan || mongoose.model('FaceScan', FaceScanSchema);