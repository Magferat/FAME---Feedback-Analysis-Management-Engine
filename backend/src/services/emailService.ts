// import dotenv from "dotenv";
// import Config from "../model/Config";

// dotenv.config();

// import nodemailer from "nodemailer";


// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   connectionTimeout: 10000,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });


// export const sendTeamEmail = async (team: string, feedbackDetails: any) => {
//   try {
//     const config = await Config.findOne();

//     // console.log("CONFIG FROM DB:", config);
//     // console.log("TEAM FROM LLM:", team);

//     let teamEmail = "";

//     if (team === "Support") teamEmail = config?.supportEmail || "";
//     if (team === "Sales") teamEmail = config?.salesEmail || "";
//     if (team === "Engineering") teamEmail = config?.engineeringEmail || "";

//     if (!teamEmail) {
//       console.log("No email configured for this team.");
//       return;
//     }

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: teamEmail,
//       subject: `FAME : New ${feedbackDetails.priority} Priority Feedback`,
//       text: `
// New Feedback Received:

// Name: ${feedbackDetails.name}
// Message: ${feedbackDetails.message}
// Category: ${feedbackDetails.category}
// Priority: ${feedbackDetails.priority}
// Sentiment: ${feedbackDetails.sentiment}
// Team: ${feedbackDetails.team}
//       `,
//     });

//     console.log("Email sent successfully");
//   } catch (error) {
//     console.error("Email sending failed:", error);
//   }
// };

import { Resend } from "resend";
import Config from "../model/Config";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTeamEmail = async (team: string, feedbackDetails: any) => {
  try {
    const config = await Config.findOne();

    let teamEmail = "";

    if (team === "Support") teamEmail = config?.supportEmail || "";
    if (team === "Sales") teamEmail = config?.salesEmail || "";
    if (team === "Engineering") teamEmail = config?.engineeringEmail || "";

    if (!teamEmail) {
      console.log("No email configured for this team.");
      return;
    }

    await resend.emails.send({
      from: "FAME Feedback <onboarding@resend.dev>", // default test sender
      to: teamEmail,
      subject: `FAME: ${feedbackDetails.priority} Priority Feedback`,
      text: `
Dear ${feedbackDetails.team} Team,
You have received new feedback through the FAME system. Please find the details below:
Name: ${feedbackDetails.name}
Message: ${feedbackDetails.message}
Category: ${feedbackDetails.category}
Priority: ${feedbackDetails.priority}
Sentiment: ${feedbackDetails.sentiment}
Please review the feedback and take necessary actions.
Best regards,
FAME Feedback System
      `,
    });

    console.log("Email sent successfully with Resend");
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};