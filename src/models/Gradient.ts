import mongoose, { Schema, Document } from 'mongoose';

export interface IGradient extends Document {
  name: string;
  imageUrl: string;
  createdBy: string;
}

const GradientSchema: Schema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdBy: { type: String, required: true }, // Use String type to accept Clerk user IDs
});

// Force model refresh to clear any cached schema
if (mongoose.models.Gradient) {
  delete mongoose.models.Gradient;
}

export default mongoose.model<IGradient>('Gradient', GradientSchema);
