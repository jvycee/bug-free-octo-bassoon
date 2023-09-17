require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files from public folder

app.post("/subscribe", async (req, res) => {
  const email = req.body.email;

  // Your HubSpot form data
  const formData = {
    fields: [
      {
        name: "email",
        value: email,
      },
    ],
  };

  try {
    const response = await axios.post(
      `https://api.hubapi.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_GUID}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
        },
      }
    );

    res.json({ status: "success", message: "Form submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
