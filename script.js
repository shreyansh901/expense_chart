// script.js – must be loaded as type="module"
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("data.json");
    const data = await response.json();

    const chartContainer = document.getElementById("spending-chart");

    // Adjust today's index (data[0] = monday)
    const today = new Date().getDay(); // 0=Sun ... 6=Sat
    const todayIndex = today === 0 ? 6 : today - 1;

    const maxAmount = Math.max(...data.map(d => d.amount));

    data.forEach((item, i) => {
      const heightPercent = (item.amount / maxAmount) * 100;

      // Bar
      const bar = document.createElement("div");
      bar.className = "spending-chart__bar";
      if (i === todayIndex) bar.classList.add("active");
      bar.style.height = `${heightPercent}%`;
      bar.dataset.label = item.day;
      bar.dataset.amount = `$${item.amount.toFixed(2)}`;

      // Tooltip
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = `$${item.amount.toFixed(2)}`;
      bar.appendChild(tooltip);

      // Day label
      const dayLabel = document.createElement("div");
      dayLabel.className = "day-label";
      dayLabel.textContent = item.day;

      // Wrapper for bar + label
      const wrapper = document.createElement("div");
      wrapper.className = "chart-item";
      wrapper.appendChild(bar);
      wrapper.appendChild(dayLabel);

      chartContainer.appendChild(wrapper);
    });
  } catch (err) {
    console.error("Failed to load data.json", err);
  }
});