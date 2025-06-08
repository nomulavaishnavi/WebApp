function analyzeResume(text) {
  const feedback = [];

  if (!text.toLowerCase().includes("education")) {
    feedback.push("🎓 Missing: Add an 'Education' section.");
  }

  if (!text.toLowerCase().includes("experience")) {
    feedback.push("💼 Missing: Include a 'Work Experience' section.");
  }

  if (!text.toLowerCase().includes("skills")) {
    feedback.push("🧠 Add a 'Skills' section to showcase expertise.");
  }

  if (!text.toLowerCase().includes("projects")) {
    feedback.push("🔨 Consider listing 'Projects' to show practical work.");
  }

  if (text.length < 500) {
    feedback.push("📄 Resume is too short. Add more content.");
  }

  if (feedback.length === 0) {
    return "✅ Great job! Your resume includes all key sections.";
  }

  return feedback.join("\n");
}

module.exports = { analyzeResume };
