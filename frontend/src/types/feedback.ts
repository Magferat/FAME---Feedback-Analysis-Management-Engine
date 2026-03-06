export interface Feedback {
  _id: string;
  name: string;
  message: string;
  category?: string;
  priority?: string;
  sentiment?: string;
  team?: string;
  createdAt: string;
}