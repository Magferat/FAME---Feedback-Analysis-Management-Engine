// models/Config.ts


import mongoose from "mongoose";

const configSchema = new mongoose.Schema({
  supportEmail: String,
  salesEmail: String,
  engineeringEmail: String,
});

export default mongoose.model("Config", configSchema);