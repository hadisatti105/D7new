const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API Route
app.post("/api/check-availability", async (req, res) => {
  try {
    const { phone, state, zip } = req.body;

    const baseUrl =
      "https://api.enrollhere.com/dialer/availability/byQueue/9ad3f3db-a59a-448d-9edc-72aa6bbb2c1e";

    const response = await axios.get(baseUrl, {
      params: {
        phone: phone || "",
        state: state || "",
        zip: zip || "",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("API Error:", error.message);

    res.status(500).json({
      error: "Failed to fetch availability",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});