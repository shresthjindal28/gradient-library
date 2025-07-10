import mongoose, { Schema, Document } from 'mongoose';

export interface IGradient extends Document {
  name: string;
  imageUrl: string;
  createdBy: mongoose.Types.ObjectId;
}

const GradientSchema: Schema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.models.Gradient || mongoose.model<IGradient>('Gradient', GradientSchema);
