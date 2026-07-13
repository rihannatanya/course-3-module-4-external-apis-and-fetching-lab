// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

const input = document.querySelector("#state-input");
const button = document.querySelector("#fetch-alerts");
const display = document.querySelector("#alerts-display");
const errorDiv = document.querySelector("#error-message");

button.addEventListener("click", async () => {
  const state = input.value.trim();

  try {
    // Clear previous error
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");

    const response = await fetch(`${weatherApi}${state}`);
    const data = await response.json();

    display.innerHTML = "";

    const alerts = data.features || [];

    display.innerHTML = `<h2>Weather Alerts: ${alerts.length}</h2>`;

    alerts.forEach(alert => {
      const p = document.createElement("p");
      p.textContent = alert.properties.headline;
      display.appendChild(p);
    });

    // Clear input
    input.value = "";

  } catch (error) {
    errorDiv.textContent = error.message;
    errorDiv.classList.remove("hidden");
  }
});