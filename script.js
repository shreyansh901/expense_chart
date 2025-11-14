// script.js
document.addEventListener("DOMContentLoaded", async () => {
  const chartContainer = document.getElementById("spending-chart");

  try {
    const response = await fetch("data.json");
    const data = await response.json();

    const today = new Date().getDay();
    const todayIndex = today === 0 ? 6 : today - 1;

    const maxAmount = Math.max(...data.map(d => d.amount));

    // Clear any loading state
    chartContainer.innerHTML = "";

    data.forEach((item, i) => {
      const heightPercent = (item.amount / maxAmount) * 100 || 5; // minimum 5% to avoid 0px

      const wrapper = document.createElement("div");
      wrapper.className = "chart-item";

      const bar = document.createElement("div");
      bar.className = "spending-chart__bar";
      if (i === todayIndex) bar.classList.add("active");

      // Force minimum height so Cypress can hover
      bar.style.height = `${Math.max(heightPercent, 8)}%`;
      bar.dataset.label = item.day;
      bar.dataset.amount = `$${item.amount.toFixed(2)}`;

      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = `$${item.amount.toFixed(2)}`;
      bar.appendChild(tooltip);

      const label = document.createElement("div");
      label.className = "day-label";
      label.textContent = item.day;

      wrapper.appendChild(bar);
      wrapper.appendChild(label);
      chartContainer.appendChild(wrapper);
    });

    // Add this line to help Cypress wait
    chartContainer.classList.add("loaded");

  } catch (err) {
    console.error("Failed to load data:", err);
  }
});