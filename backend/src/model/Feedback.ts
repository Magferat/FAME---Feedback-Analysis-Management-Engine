import mongoose, { Document, Schema } from "mongoose";

export interface IFeedback extends Document {
  name: string;
  message: string;
  category?: string;
  priority?: string;
  sentiment?: string;
  team?: string;
  createdAt: Date;
}

const FeedbackSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    category: String,
    priority: String,
    sentiment: String,
    team: String,
  },
  { timestamps: true }
);

export default mongoose.model<IFeedback>("Feedback", FeedbackSchema);