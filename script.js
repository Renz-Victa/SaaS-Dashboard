function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('overlay').classList.add('open');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
}

function setActive(clickedItem) {
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  clickedItem.classList.add('active');
}

/* ----------------------------------------------------------
   Current date in topbar
---------------------------------------------------------- */
document.getElementById('dateDisplay').textContent = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

/* ----------------------------------------------------------
   Animated stat counters
   Counts from 0 to targetValue on page load.
---------------------------------------------------------- */
function animateCounter(element, targetValue, prefix = '', duration = 1400) {
  const startTime = performance.now();

  function tick(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.floor(eased * targetValue);

    element.textContent = prefix + current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

// Delay so the card fade-in plays before counting starts
// Values are in South African Rand (ZAR)
setTimeout(() => {
  animateCounter(document.getElementById('statRev'), 1517238, 'R');
  animateCounter(document.getElementById('statUsers'), 12847);
  animateCounter(document.getElementById('statConv'), 3294);
  animateCounter(document.getElementById('statAov'), 39492, 'R');
}, 300);

/* ----------------------------------------------------------
   Revenue Chart
---------------------------------------------------------- */
const chartCanvas = document.getElementById('revenueChart').getContext('2d');

// Gradient fills under each line
const purpleGradient = chartCanvas.createLinearGradient(0, 0, 0, 240);
purpleGradient.addColorStop(0, 'rgba(108, 99, 255, 0.3)');
purpleGradient.addColorStop(1, 'rgba(108, 99, 255, 0)');

const pinkGradient = chartCanvas.createLinearGradient(0, 0, 0, 240);
pinkGradient.addColorStop(0, 'rgba(255, 101, 132, 0.2)');
pinkGradient.addColorStop(1, 'rgba(255, 101, 132, 0)');

// Data for each time range toggle (values in ZAR)
const chartData = {
  '6m': {
    labels: ["Sep '25", "Oct '25", "Nov '25", "Dec '25", "Jan '26", "Feb '26"],
    revenue: [936000, 1098000, 1044000, 1332000, 1278000, 1512000],
    expenses: [558000, 630000, 594000, 720000, 684000, 756000],
  },
  '1y': {
    labels: ["Mar '25", "Apr '25", "May '25", "Jun '25", "Jul '25", "Aug '25", "Sep '25", "Oct '25", "Nov '25", "Dec '25", "Jan '26", "Feb '26"],
    revenue: [720000, 792000, 864000, 918000, 990000, 1044000, 936000, 1098000, 1044000, 1332000, 1278000, 1512000],
    expenses: [450000, 486000, 504000, 540000, 576000, 612000, 558000, 630000, 594000, 720000, 684000, 756000],
  },
};

const revenueChart = new Chart(chartCanvas, {
  type: 'line',
  data: {
    labels: chartData['6m'].labels,
    datasets: [
      {
        label: 'Revenue',
        data: chartData['6m'].revenue,
        borderColor: '#6c63ff',
        backgroundColor: purpleGradient,
        tension: 0.4,
        fill: true,
        borderWidth: 2.5,
        pointBackgroundColor: '#6c63ff',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Expenses',
        data: chartData['6m'].expenses,
        borderColor: '#ff6584',
        backgroundColor: pinkGradient,
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointBackgroundColor: '#ff6584',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#6b6b80',
          boxWidth: 12,
          boxHeight: 12,
          font: { family: 'DM Sans', size: 12 },
        },
      },
      tooltip: {
        backgroundColor: '#18181f',
        borderColor: '#23232e',
        borderWidth: 1,
        titleColor: '#e8e8f0',
        bodyColor: '#6b6b80',
        padding: 12,
        cornerRadius: 10,
        titleFont: { family: 'Syne', weight: '700' },
        bodyFont: { family: 'DM Sans' },
        callbacks: {
          label: (context) => ' R' + context.raw.toLocaleString(),
        },
      },
    },
    scales: {
      x: {
        grid: { color: '#23232e' },
        ticks: { color: '#6b6b80', font: { family: 'DM Sans', size: 12 } },
      },
      y: {
        grid: { color: '#23232e' },
        ticks: {
          color: '#6b6b80',
          font: { family: 'DM Sans', size: 12 },
          callback: (value) => 'R' + (value / 1000000).toFixed(1) + 'M',
        },
      },
    },
  },
});

function setChartRange(range) {
  document.getElementById('btn6m').classList.toggle('active', range === '6m');
  document.getElementById('btn1y').classList.toggle('active', range === '1y');

  const selected = chartData[range];
  revenueChart.data.labels = selected.labels;
  revenueChart.data.datasets[0].data = selected.revenue;
  revenueChart.data.datasets[1].data = selected.expenses;
  revenueChart.update();
}

/* ----------------------------------------------------------
   Orders Table
---------------------------------------------------------- */
const orders = [
  { name: 'Sarah Johnson', initials: 'SJ', product: 'Pro Plan', amount: 'R5,382', status: 'active', date: 'Jan 10', color: '#6c63ff' },
  { name: 'Marcus Lee', initials: 'ML', product: 'Enterprise', amount: 'R26,982', status: 'active', date: 'Jan 10', color: '#ff6584' },
  { name: 'Priya Shah', initials: 'PS', product: 'Starter', amount: 'R882', status: 'pending', date: 'Jan 9', color: '#43e97b' },
  { name: 'Tom Walker', initials: 'TW', product: 'Pro Plan', amount: 'R5,382', status: 'cancelled', date: 'Jan 9', color: '#f7971e' },
  { name: 'Emily Chen', initials: 'EC', product: 'Enterprise', amount: 'R26,982', status: 'active', date: 'Jan 8', color: '#38bdf8' },
];

const tableBody = document.getElementById('ordersBody');

orders.forEach(order => {
  const capitalizedStatus = order.status[0].toUpperCase() + order.status.slice(1);
  const row = document.createElement('tr');

  row.innerHTML = `
        <td>
          <div class="customer-cell">
            <div class="customer-avatar" style="background: ${order.color};">${order.initials}</div>
            <span style="font-weight: 500;">${order.name}</span>
          </div>
        </td>
        <td style="color: var(--muted);">${order.product}</td>
        <td style="font-weight: 600;">${order.amount}</td>
        <td>
          <span class="status-badge ${order.status}">
            <span class="status-dot"></span>
            ${capitalizedStatus}
          </span>
        </td>
        <td style="color: var(--muted);">${order.date}</td>
      `;

  tableBody.appendChild(row);
});

/* ----------------------------------------------------------
   Goals / Progress Bars
---------------------------------------------------------- */
const goals = [
  { label: 'Revenue Target', percent: 84, display: 'R1.5M / R1.8M', color: '#6c63ff' },
  { label: 'New Signups', percent: 67, display: '1,340 / 2,000', color: '#43e97b' },
  { label: 'Churn Rate', percent: 78, display: '2.2% (goal <3%)', color: '#f7971e' },
  { label: 'NPS Score', percent: 90, display: '72 / 80', color: '#ff6584' },
];

const goalsList = document.getElementById('goalsList');

goals.forEach(goal => {
  goalsList.innerHTML += `
        <div class="goal-item">
          <div class="goal-header">
            <span class="goal-name">${goal.label}</span>
            <span class="goal-value">${goal.display}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="background: ${goal.color};" data-target="${goal.percent}%"></div>
          </div>
        </div>
      `;
});

// Small delay so CSS renders bars at 0% before animating to target
setTimeout(() => {
  document.querySelectorAll('.progress-fill').forEach(bar => {
    bar.style.width = bar.dataset.target;
  });
}, 700);

/* ----------------------------------------------------------
   Live Activity Feed
   Auto-adds a new event every 5 seconds, keeps max 5 items.
---------------------------------------------------------- */
let feedItems = [
  { icon: '💳', text: 'New subscription from <b>Maria G.</b>', time: 'just now', color: '#6c63ff' },
  { icon: '👤', text: '<b>James K.</b> upgraded to Enterprise', time: '2m ago', color: '#43e97b' },
  { icon: '⚠️', text: 'Payment failed for <b>Lisa R.</b>', time: '5m ago', color: '#ff6584' },
  { icon: '🎉', text: '<b>Acme Corp</b> reached 100 seats', time: '11m ago', color: '#f7971e' },
  { icon: '📩', text: 'Support ticket opened by <b>Tom B.</b>', time: '18m ago', color: '#38bdf8' },
];

const incomingItems = [
  { icon: '🚀', text: 'Beta feature enabled by <b>Dev Team</b>', color: '#6c63ff' },
  { icon: '💬', text: 'New 5-star review from <b>Anna T.</b>', color: '#43e97b' },
  { icon: '🔒', text: 'Password changed for <b>Raj P.</b>', color: '#38bdf8' },
  { icon: '💡', text: '<b>StartupXYZ</b> signed up for trial', color: '#f7971e' },
];

let incomingIndex = 0;

function renderFeed() {
  const feedContainer = document.getElementById('activityFeed');
  feedContainer.innerHTML = '';

  feedItems.forEach((item, index) => {
    const el = document.createElement('div');
    el.className = 'feed-item';

    // Animate the newest item sliding in
    if (index === 0) el.classList.add('slide-in');

    el.innerHTML = `
          <div class="feed-icon" style="background: ${item.color}20;">${item.icon}</div>
          <div>
            <div class="feed-text">${item.text}</div>
            <div class="feed-time">${item.time}</div>
          </div>
        `;

    feedContainer.appendChild(el);
  });
}

function addFeedItem() {
  const next = { ...incomingItems[incomingIndex % incomingItems.length], time: 'just now' };
  incomingIndex++;

  feedItems.unshift(next);
  feedItems = feedItems.slice(0, 5);
  feedItems.forEach((item, i) => {
    if (i > 0) item.time = (i * 3) + 'm ago';
  });

  renderFeed();
}

renderFeed();
setInterval(addFeedItem, 5000);