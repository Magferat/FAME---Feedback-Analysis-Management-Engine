import express from "express";
import Feedback from "../model/Feedback";
import { analyzeFeedback } from "../services/llmService";
import { sendTeamEmail } from "../services/emailService";

const router = express.Router();

/**
 *  POST /api/feedback
 */
// router.post("/", async (req, res) => {
//   try {
//     const { name, message } = req.body;

//     const feedback = await Feedback.create({
//       name,
//       message,
//     });

//     res.status(201).json(feedback);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating feedback" });
//   }
// });


router.post("/", async (req, res) => {
  try {
    const { name, message } = req.body;

    //  Send to AI
    const aiResult = await analyzeFeedback(message);

    //  Save everything in DB
    const feedback = await Feedback.create({
      name,
      message,
      category: aiResult?.category,
      priority: aiResult?.priority,
      sentiment: aiResult?.sentiment,
      team: aiResult?.team,
    });
    
    //  SEND EMAIL
    if (aiResult?.team) {
    await sendTeamEmail(aiResult.team, feedback);
    }
    
    res.status(201).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating feedback" });
  }
});

/**
 *  GET /api/feedback
 */
router.get("/", async (req, res) => {
  try {
    const { name, category, priority } = req.query;

    // Dynamic filter object
    const filter: any = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" }; 
      // "i" makes it case-insensitive
    }

    if (category) {
      filter.category = category;
    }

    if (priority) {
      filter.priority = priority;
    }

    // if (sentiment) {
    //   filter.sentiment = sentiment;
    // }
    // if (team) {
    //   filter.team = team;
    // }

    const feedbacks = await Feedback.find(filter).sort({ createdAt: -1 });

    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching feedbacks" });
  }
});

export default router;