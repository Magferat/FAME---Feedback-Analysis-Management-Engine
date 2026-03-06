
import express from "express";
import Config from "../model/Config";

const router = express.Router();

router.post("/", async (req, res) => {
  const { supportEmail, salesEmail, engineeringEmail } = req.body;
  // console.log("Received config data:", { supportEmail, salesEmail, engineeringEmail });

  let config = await Config.findOne();

  if (!config) {
    config = new Config({
      supportEmail,
      salesEmail,
      engineeringEmail,
    });
  } else {
    config.supportEmail = supportEmail;
    config.salesEmail = salesEmail;
    config.engineeringEmail = engineeringEmail;
  }

  await config.save();

  res.json({ message: "Saved successfully" });
});

router.get("/", async (req, res) => {
  const config = await Config.findOne();
  res.json(config);
});

export default router;