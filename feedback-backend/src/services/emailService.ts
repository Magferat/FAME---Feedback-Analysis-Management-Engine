import dotenv from "dotenv";
import Config from "../model/Config";

dotenv.config();

import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // 👈 fixes self-signed cert issue
  },
});

// import Config from "../models/Config";

export const sendTeamEmail = async (team: string, feedbackDetails: any) => {
  try {
    const config = await Config.findOne();

    console.log("CONFIG FROM DB:", config);
    console.log("TEAM FROM LLM:", team);

    let teamEmail = "";

    if (team === "Support") teamEmail = config?.supportEmail || "";
    if (team === "Sales") teamEmail = config?.salesEmail || "";
    if (team === "Engineering") teamEmail = config?.engineeringEmail || "";

    if (!teamEmail) {
      console.log("No email configured for this team.");
      return;
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: teamEmail,
      subject: `FAME : New ${feedbackDetails.priority} Priority Feedback`,
      text: `
New Feedback Received:

Name: ${feedbackDetails.name}
Message: ${feedbackDetails.message}
Category: ${feedbackDetails.category}
Priority: ${feedbackDetails.priority}
Sentiment: ${feedbackDetails.sentiment}
Team: ${feedbackDetails.team}
      `,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};

