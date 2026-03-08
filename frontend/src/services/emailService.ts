import emailjs from "@emailjs/browser";

export const sendTeamEmail = async (feedback: any, config: any) => {
  let toEmail = "";

  console.log("sendTeamEmail called with team", feedback.team, "config", config);

  if (feedback.team === "Support") {
    toEmail = config.supportEmail;
  }

  if (feedback.team === "Sales") {
    toEmail = config.salesEmail;
  }

  if (feedback.team === "Engineering") {
    toEmail = config.engineeringEmail;
  }

  if (!toEmail) {
    console.error("No email configured for team:", feedback.team, "- config object", config);
    return;
  }

  const templateParams = {
    name: feedback.name,
    message: feedback.message,
    category: feedback.category,
    priority: feedback.priority,
    sentiment: feedback.sentiment,
    team: feedback.team,
    to_email: toEmail
  };

  const serviceId = "service_h3kvst5";
  const templateId = "template_dm5ox6k";
  const publicKey = "i99JPHMpocOkUl7t7";

  if (!serviceId || !templateId || !publicKey) {
    console.error("Missing EmailJS environment variables");
    console.error("VITE_SERVICE_ID:", serviceId);
    console.error("VITE_TEMPLATE_ID:", templateId);
    console.error("VITE_PUBLIC_KEY:", publicKey);
    return;
  }

  // try {
  //   const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
  //   console.log("Email sent successfully to", toEmail);
  // }
  //  catch (error) {
  //   console.error("Email sending failed:", error);
  //   throw error;
  // }
};