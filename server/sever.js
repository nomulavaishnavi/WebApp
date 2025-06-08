const express = require("express");
const multer = require("multer");
const cors = require("cors");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const { analyzeResume } = require("./resumeAnalyzer");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static("client"));

const upload = multer({ dest: "uploads/" });

app.post("/analyze", upload.single("resume"), async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);
    const feedback = analyzeResume(pdfData.text);
    fs.unlinkSync(req.file.path); // Clean up
    res.json({ feedback });
  } catch (err) {
    console.error(err);
    res.status(500).json({ feedback: "Error analyzing resume." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
