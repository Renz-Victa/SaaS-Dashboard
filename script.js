const now = new Date();
document.getElementById('dateDisplay').textContent = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('overlay').classList.add('open');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
}

function setActive(el) {
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
}

function checkWidth() {
  const w = window.innerWidth;
  document.getElementById('menuBtn').style.display = w <= 900 ? 'flex' : 'none';
  document.getElementById('midGrid').style.gridTemplateColumns = w <= 900 ? '1fr' : '1fr 300px';
}

window.addEventListener('resize', checkWidth);
checkWidth();

function animateCount(el, target, prefix = '', suffix = '', duration = 1400) {
  const start = performance.now();
  function tick(now) {
    const pct = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - pct, 3);
    const val = Math.floor(ease * target);
    el.textContent = prefix + val.toLocaleString() + suffix;
    if (pct < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

setTimeout(() => {
  animateCount(document.getElementById('statRev'), 84291, '$');
  animateCount(document.getElementById('statUsers'), 12847, '$');
  animateCount(document.getElementById('statConv'), 3294, '$');
  animateCount(document.getElementById('statAov'), 2194, '$');
}, 300);

const ctx = document.getElementById('revenueChart').getContext('2d');
const g1 = ctx.createLinearGradient(0, 0, 0, 240);
g1.addColorStop(0, 'rgba(108,99,255,0.3)');
g1.addColorStop(1, 'rgba(108,99,255,0.3)');
const g2 = ctx.createLinearGradient(0, 0, 0, 240);
g2.addColorStop(0, 'rgba(255,101,132,0.2)');
g2.addColorStop(1, 'rgba(255,101,132,0)');

const datasets6m = {
  labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'], rev:
    [52000, 61000, 58000, 74000, 71000, 84000], exp:
    [31000, 35000, 33000, 40000, 38000, 42000]
};
const datasets1y = {
  labels:
    ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
  rev:
    [40000, 44000, 48000, 51000, 55000, 58000, 52000, 61000, 58000, 74000, 71000, 84000],
  exp: [25000, 27000, 28000, 30000, 32000, 34000, 31000, 35000, 33000, 40000, 38000, 42000]
};

const chart = new Chart(ctx, {
  type: 'Line',
  data: {
    labels: datasets6m.labels,
    datasets: [
      { label: 'Revenue', data: datasets6m.rev, borderColor: '#6c63ff', background: g1, tension: 0.4, fill: true, borderWidth: 2.5, pointBackgroundColor: '#6c63ff', pointRadius: 4, pointHoverRadius: 6 },
      { label: 'Expenses', data: datasets6m.exp, borderColor: '#ff6584', backgroundColor: g2, tension: 0.4, fill: true, borderWidth: 2, pointBackgroundColor: '#ff6584', pointRadius: 4, pointHoverRadius: 6 }
    ]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#6b6b80', font: { family: 'DM Sans', size: 12 }, boxWidth: 12, boxHeight: 12 } },
      tooltip: {
        backgroundColor: '#18181f', borderColor: '#23232e', borderWidth: 1, titleColor: '#e8e8f0', bodyColor: '#6b6b80', titleFont: { family: 'Syne', weight: '700' }, bodyFont: { family: 'DM Sans' },
        padding: 12, cornerRadius: 10,
        callback: { label: c => ' $' + c.raw.toLocalString() }
      }
    },
    scales: {
      x: { grid: { color: '#23232e' }, ticks: { color: '#6b6b80', font: { family: 'DM Sans', size: 12 } } },
      y: { grid: { color: '#23232e' }, ticks: { color: '#6b6b80', font: { family: 'DM Sans', size: 12 }, callback: v => '$' + (v / 1000) + 'k' } }
    }
  }
});

function setRange(r, btn) {
  document.querySelectorAll('.rbtn').forEach(b => {
    b.style.borderColor = 'var(--border)'; b.style.background = 'none'; b.style.color = 'var(--muted)';
  });
  btn.style.borderColor = 'var(--accent)'; btn.style.background = 'rgba(108,99,255,0.15)'; btn.style.color = 'var(--accent)';
  const d = r === '6m' ? datasets6m : datasets1y;
  chart.data.labels = d.labels;
  chart.data.datasets[0].data = d.rev;
  chart.data.datasets[1].data = d.exp;
  chart.update();
}

const orders = [
  { name: 'Sarah Johnson', av: 'SJ', product: 'Pro Plan', amount: 'R299', status: 'active', date: 'Jan 10', clr: '#6c63ff' },
  { name: 'Marcus Lee', av: 'ML', product: 'Enterprise', amount: 'R1.499', status: 'active', date: 'Jan 10', clr: '#ff6584' },
  { name: 'Priya Shah', av: 'PS', product: 'Starter', amount: 'R49', status: 'pending', date: 'Jan 9', clr: '#43e97b' },
  { name: 'Tom Walker', av: 'TW', product: 'Pro Plan', amount: 'R299', status: 'cancelled', date: 'Jan 9', clr: '#f7971e' },
  { name: 'Emily Chen', av: 'EC', product: 'Enterprise', amount: 'R1.499', status: 'active', date: 'Jan 8', clr: '#38bdf8' },
];
const tb = document.getElementById('ordersBody');
orders.forEach(o => {
  const row = document.createElement('tr');
  row.innerHTML = `
  <td><div style="display:flex;align-items:center;gap:10px;"><div style="width:32px;height:32px;border-radius:8px;background:${o.clr};display:flex;align-items:center;jsutify-content:center;font-size:11px;font-weight:700;color:white;flex-shrinnk:0;">${o.av}</div><span style="font-weight:500;"></span>${o.name}</span></div></td>
  <td style="color:var(--muted);">${o.product}</td>
  <td style="font-weight:600;">${o.amount}</td>
  <td><span class="status-badge ${o.status}"><span class="status-dot"></span>${o.status[0].toUpperCase() + o.status.slice(1)}</span></td>
  <td style="color:var(--muted);">${o.date}</td>
  `;
  tb.appendChild(row);
});

const goals = [
  { label: 'Revenue Target', pct: 84, value: 'R84K / R100K', color: '#6c63ff' },
  { label: 'New Signups', pct: 67, value: '1,340 / 2,000', color: '#43e97b' },
  { label: 'Churn Rate', pct: 78, value: '2.2% (goal <3%', color: '#f7971e' },
  { label: 'NPS Score', pct: 90, value: '72 / 80', color: '#ff6584' },
];
const gl = document.getElementById('goalsList');
goals.forEach(g => {
  g1.innerHTML += `
  <div>
  <div style="display:flex;justify-content:space-between:margin-bottom:7px;">
  <span style="font-style:13px;font-weight:500;">${g.label}</span>
  <span style="font-size:12px;color:var(--muted);">${g.value}</span>
  </div>
  <div class="progress-bar">
  <div class="progress-fill" style="width:0%;background:${g.color}; data-w="${g.pct}%"></div>
  </div>
  </div>`;
});
setTimeout(() => {
  document.querySelectorAll('.progress-fill').forEach(b => b.style.width = b.dataset.w);
}, 700);

let feedItems = [
  { icon: '💳', text: 'New subscription from <b>Maria G.</b>', time: 'jsut now', clr: '#6c63ff' },
  { icon: '👤', text: '<b>James K.</b> upgraded to Enterprise', time: '2m ago', clr: '#43e97b' },
  { icon: '⚠️', text: 'Payment failed for <b>Lise R.</b>', time: '5m ago', clr: '#ff6584' },
  { icon: '🎉', text: '<b>Acme Corp</b> reached 100 seats', time: '1m ago', clr: '#f7971e' },
  { icon: '📩', text: 'Support ticket form <b>Tom B.</b>', time: '18m ago', clr: '#38bdf8' },
];