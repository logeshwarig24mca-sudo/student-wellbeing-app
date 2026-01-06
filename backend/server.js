const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Assessment = require("./models/Assessment");

const app = express();
app.use(cors());
app.use(express.json());

/* ===== MongoDB Connection ===== */

mongoose.connect("mongodb://127.0.0.1:27017/mental_health")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(err));



/* ===== Receive Assessment ===== */
app.post("/api/assessment", async (req, res) => {
    const { distress, coping, motivation } = req.body;

    let riskIndicators = 0;
    if (distress >= 2) riskIndicators++;
    if (coping >= 2) riskIndicators++;
    if (motivation >= 2) riskIndicators++;

    let riskLevel = "NO_RISK";
    if (riskIndicators === 1) riskLevel = "MODERATE";
    if (riskIndicators >= 2) riskLevel = "HIGH_RISK";

    const assessment = new Assessment({
        distress,
        coping,
        motivation,
        riskLevel
    });

    await assessment.save();

    res.json({
        message: "Assessment stored",
        riskLevel
    });
});

/* ===== Counsellor View (ONLY HIGH RISK) ===== */
app.get("/api/counsellor/high-risk", async (req, res) => {
    const cases = await Assessment.find({ riskLevel: "HIGH_RISK" })
                                  .sort({ createdAt: -1 });
    res.json(cases);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
