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
      x: { grid: { color: '#23232e' } }
    }
  }
})
}



