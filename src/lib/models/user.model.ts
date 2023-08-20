import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  image: String,
  bio: String,
  phoneNumber: String,
  skills: [String],
  certifications: [String],
  experience: [
    {
      startDate: Date,
      endDate: Date,
      company: String,
      designation: String,
      mode: String,
    },
  ],
  education: [
    {
      startDate: Date,
      endDate: Date,
      college: String,
      degree: String,
      mode: String,
      description: String,
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
