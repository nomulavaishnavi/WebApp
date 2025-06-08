const form = document.getElementById("resumeForm");
const input = document.getElementById("resumeInput");
const spinner = document.getElementById("spinner");
const feedbackDiv = document.getElementById("feedback");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!input.files[0]) return alert("Please upload a resume.");

  const formData = new FormData();
  formData.append("resume", input.files[0]);

  spinner.classList.remove("hidden");
  feedbackDiv.innerHTML = "";

  const response = await fetch("http://localhost:3000/analyze", {
    method: "POST",
    body: formData,
  });

  const { feedback } = await response.json();
  spinner.classList.add("hidden");

  feedback.split("\n").forEach((item) => {
    const color = item.includes("✅") ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100";
    feedbackDiv.innerHTML += `<div class="p-2 rounded ${color}">${item}</div>`;
  });
});
