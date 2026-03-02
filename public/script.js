const form = document.getElementById("availabilityForm");
const resultDiv = document.getElementById("result");
const loading = document.getElementById("loading");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const phone = document.getElementById("phone").value;
  const state = document.getElementById("state").value;
  const zip = document.getElementById("zip").value;

  resultDiv.textContent = "";
  loading.classList.remove("hidden");

  try {
    const response = await fetch("/api/check-availability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, state, zip }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unknown error");
    }

    resultDiv.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    resultDiv.textContent = "Error: " + error.message;
  } finally {
    loading.classList.add("hidden");
  }
});