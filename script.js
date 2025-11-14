// data.json is loaded as a global variable `data` via <script src="data.json"></script>
document.addEventListener("DOMContentLoaded", () => {
  const chartContainer = document.getElementById("spending-chart");

  // Get today's index (adjusted because data starts on Monday)
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const todayIndex = today === 0 ? 6 : today - 1; // Convert to match data order

  const maxAmount = Math.max(...data.map(item => item.amount));

  data.forEach((item, index) => {
    const amount = item.amount;
    const heightPercent = (amount / maxAmount) * 100;

    // Create bar
    const bar = document.createElement("div");
    bar.className = "spending-chart__bar";
    if (index === todayIndex) bar.classList.add("active");

    bar.style.height = `${heightPercent}%`;
    bar.dataset.label = item.day;
    bar.dataset.amount = `$${amount.toFixed(2)}`;

    // Tooltip
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = `$${amount.toFixed(2)}`;
    bar.appendChild(tooltip);

    // Day label
    const dayLabel = document.createElement("div");
    dayLabel.className = "day-label";
    dayLabel.textContent = item.day;

    // Wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "chart-item";
    wrapper.appendChild(bar);
    wrapper.appendChild(dayLabel);

    chartContainer.appendChild(wrapper);
  });
});