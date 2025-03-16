const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
    email: String,
    phone: String,
    summary: String,
    education: [
      {
        degree: String,
        institution: String,
        year: String,
      },
    ],
    experience: [
      {
        title: String,
        company: String,
        duration: String,
        description: String,
      },
    ],
    skills: [String],
    certifications: [
      {
        title: String,
        issuer: String,
        year: String,
        link: String,
      },
    ],
    projects: [
      {
        title: String,
        description: String,
        link: String,
        technologies: [String],
      },
    ],
    socialLinks: {
      linkedin: String,
      github: String,
      portfolio: String,
    },
    languages: [String],
    hobbies: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", ResumeSchema);
