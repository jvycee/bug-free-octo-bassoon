const fetch = require("node-fetch");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email } = req.body;

  const formData = {
    fields: [
      {
        objectTypeId: "0-1",
        name: "email",
        value: email,
      },
    ],
    context: {
      hutk: "YOUR_HUTK_VALUE", // adjust accordingly
    },
  };

  // Define the correct HubSpot endpoint URL
  const url = `https://api.hsforms.com/submissions/v3/integration/secure/submit/${process.env.PORTAL_ID}/${process.env.FORM_ID}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json(data);
    } else {
      return res.status(response.status).json(data);
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to submit form to HubSpot" });
  }
};
