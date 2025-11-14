document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("data.json");
    const data = await res.json();

    const chart = document.getElementById("spending-chart");
    const today = new Date().getDay();
    const todayIndex = today === 0 ? 6 : today - 1;
    const max = Math.max(...data.map(d => d.amount));

    chart.innerHTML = ""; // clear

    data.forEach((item, i) => {
      const percent = (item.amount / max) * 100;

      const wrapper = document.createElement("div");
      wrapper.className = "chart-item";

      const bar = document.createElement("div");
      bar.className = "spending-chart__bar";
      if (i === todayIndex) bar.classList.add("active");

      bar.style.height = percent + "%";
      bar.dataset.label = item.day;
      bar.dataset.amount = "$" + item.amount.toFixed(2);

      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = "$" + item.amount.toFixed(2);
      bar.appendChild(tooltip);

      const label = document.createElement("div");
      label.className = "day-label";
      label.textContent = item.day;

      wrapper.appendChild(bar);
      wrapper.appendChild(label);
      chart.appendChild(wrapper);
    });

  } catch (err) {
    console.error("Failed to load data.json", err);
  }
});