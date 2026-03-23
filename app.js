/* ============================================
   WAS IT WORTH IT? — APP LOGIC
   ============================================ */

const RATES = {
  VTI: 0.1047,
  VGT: 0.1412,
  VOO: 0.1047
};

const GIFS = [
  { url: 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif',       caption: 'Your wallet after seeing these results.' },
  { url: 'https://media.giphy.com/media/3o7TKwmnDgQb5jemjK/giphy.gif',      caption: 'The market watching you spend instead of invest.' },
  { url: 'https://media.giphy.com/media/26ufnwz3wDUli7GU0/giphy.gif',       caption: 'You, explaining to your future self why this was necessary.' },
  { url: 'https://media.giphy.com/media/d2lcHJTG5Tscg/giphy.gif',           caption: 'Your retirement fund when you swipe instead of save.' },
  { url: 'https://media.giphy.com/media/xT9IgG50Lg7russbDa/giphy.gif',      caption: 'Me watching you throw away future gains in real time.' },
  { url: 'https://media.giphy.com/media/l4FGGafcOHmrlQxG0/giphy.gif',       caption: 'The face of someone who just saw the opportunity cost.' },
  { url: 'https://media.giphy.com/media/xT9IgsjgByHRFSD0MM/giphy.gif',      caption: 'Vanguard waiting patiently for you to make smarter choices.' },
  { url: 'https://media.giphy.com/media/3oKIPf3C7HqqYBVcCk/giphy.gif',      caption: 'Your future self trying to reach back through time and stop you.' },
  { url: 'https://media.giphy.com/media/26BRzozg4TCBXv6QU/giphy.gif',       caption: 'Totally fine. This is fine. Everything is fine.' },
  { url: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',       caption: 'You rationalizing why you needed it anyway.' },
];

const QUIPS = [
  (item, val) => `Your <strong>${item}</strong> wasn't cheap — the market had <span class="highlight-val">${val}</span> reserved for you. Hope it sparked joy.`,
  (item, val) => `Turns out your <strong>${item}</strong> cost a lot more than the sticker price. That alternate universe where you invested? Worth <span class="highlight-val">${val}</span>.`,
  (item, val) => `Congratulations! Your <strong>${item}</strong> successfully prevented you from having <span class="highlight-val">${val}</span>. Bold financial strategy.`,
  (item, val) => `Your <strong>${item}</strong> is sitting there like "worth it." The market had <span class="highlight-val">${val}</span> ready and waiting. No pressure though.`,
  (item, val) => `In a parallel universe where you skipped that <strong>${item}</strong>, you have <span class="highlight-val">${val}</span>. Just a fun thought. Totally fine.`,
  (item, val) => `The real price of your <strong>${item}</strong>? <span class="highlight-val">${val}</span>. The receipt lied to you. The math doesn't.`,
  (item, val) => `Your <strong>${item}</strong> waved goodbye to <span class="highlight-val">${val}</span> on your behalf. Generous of it, honestly.`,
  (item, val) => `That <strong>${item}</strong> cost you <span class="highlight-val">${val}</span> in future gains. But hey — you YOLO'd and now you know.`,
];

let chartInstance = null;
let currentItem  = '';
let currentWorth = '';
let currentSpent = '';
let currentYears = 10;
let currentFund  = 'VTI';
let leads = [];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n) {
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000)     return '$' + (n / 1_000).toFixed(1) + 'K';
  return '$' + n.toFixed(2);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shareText() {
  return `I just found out my "${currentItem}" could've been worth ${currentWorth} if I'd invested it in ${currentFund} over ${currentYears} years.\n\nWas it worth it? Find out → wasitworth.it\n\n#WasItWorthIt #PersonalFinance #OpportunityCost`;
}

// ─── Range slider live update ─────────────────────────────────────────────────

document.getElementById('yearsRange').addEventListener('input', function () {
  currentYears = parseInt(this.value);
  document.getElementById('yearsVal').textContent = currentYears;
});

// ─── Calculate ────────────────────────────────────────────────────────────────

function calculate() {
  currentItem = document.getElementById('itemName').value.trim() || 'purchase';
  const cost  = parseFloat(document.getElementById('itemCost').value);
  currentFund = document.getElementById('fundSelect').value;
  currentYears = parseInt(document.getElementById('yearsRange').value);

  if (isNaN(cost) || cost <= 0) {
    alert('Please enter how much you spent.');
    return;
  }

  const rate       = RATES[currentFund];
  const finalValue = cost * Math.pow(1 + rate, currentYears);
  const gain       = finalValue - cost;

  currentSpent = fmt(cost);
  currentWorth = fmt(finalValue);

  // Metrics
  document.getElementById('metricSpent').textContent = currentSpent;
  document.getElementById('metricWorth').textContent = currentWorth;
  document.getElementById('metricOppty').textContent = '+' + fmt(gain);
  document.getElementById('metricRate').textContent  = (rate * 100).toFixed(2) + '%/yr';

  // GIF
  const gif = pick(GIFS);
  document.getElementById('gifImg').src       = gif.url;
  document.getElementById('gifCaption').textContent = gif.caption;

  // Chart
  const labels = [], invested = [], grown = [];
  for (let y = 0; y <= currentYears; y++) {
    labels.push(y === 0 ? 'Now' : 'Yr ' + y);
    invested.push(parseFloat(cost.toFixed(2)));
    grown.push(parseFloat((cost * Math.pow(1 + rate, y)).toFixed(2)));
  }

  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(document.getElementById('growthChart'), {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Amount invested',
          data: invested,
          borderColor: '#4a90e2',
          backgroundColor: 'rgba(74,144,226,0.05)',
          borderWidth: 1.5,
          pointRadius: 0,
          fill: false,
          tension: 0,
          borderDash: [4, 3],
        },
        {
          label: 'Growth value',
          data: grown,
          borderColor: '#c8f060',
          backgroundColor: 'rgba(200,240,96,0.08)',
          borderWidth: 2.5,
          pointRadius: 0,
          fill: true,
          tension: 0.35,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1a1a1d',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          titleColor: '#8a8680',
          bodyColor: '#f0ede8',
          callbacks: { label: ctx => '  ' + fmt(ctx.parsed.y) }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { autoSkip: true, maxTicksLimit: 8, color: '#555250', font: { size: 11 } }
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#555250', font: { size: 11 }, callback: v => fmt(v) }
        }
      }
    }
  });

  // Verdict
  const quip = pick(QUIPS);
  document.getElementById('calloutText').innerHTML = quip(currentItem, currentWorth);

  // Show results
  const resultsEl = document.getElementById('results');
  resultsEl.classList.remove('hidden');
  document.getElementById('leadsSection').classList.remove('hidden');
  document.getElementById('sendFeedback').innerHTML = '';
  document.getElementById('copyLabel').textContent = 'Copy text';

  setTimeout(() => {
    resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);
}

// ─── Lead capture ─────────────────────────────────────────────────────────────

function sendResults() {
  const first = document.getElementById('firstName').value.trim();
  const last  = document.getElementById('lastName').value.trim();
  const email = document.getElementById('emailAddr').value.trim();

  if (!first || !last || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById('sendFeedback').innerHTML =
      '<div class="feedback-error">Please fill in your name and a valid email.</div>';
    return;
  }

  if (leads.find(l => l.email.toLowerCase() === email.toLowerCase())) {
    document.getElementById('sendFeedback').innerHTML =
      '<div class="feedback-error">We already have you! Go touch some grass instead of buying more stuff.</div>';
    return;
  }

  const lead = {
    firstName: first, lastName: last, email,
    item: currentItem, spent: currentSpent, worth: currentWorth,
    fund: currentFund, years: currentYears,
    timestamp: new Date().toLocaleString()
  };

  leads.push(lead);
  renderLeadsTable();

  document.getElementById('sendFeedback').innerHTML =
    `<div class="feedback-success"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Saved, ${first}! Your financial regret is now on record.</div>`;

  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value  = '';
  document.getElementById('emailAddr').value = '';
}

// ─── Leads table ─────────────────────────────────────────────────────────────

function renderLeadsTable() {
  document.getElementById('leadCount').textContent = leads.length;
  if (leads.length === 0) {
    document.getElementById('noLeadsMsg').classList.remove('hidden');
    document.getElementById('leadsTable').classList.add('hidden');
    return;
  }
  document.getElementById('noLeadsMsg').classList.add('hidden');
  document.getElementById('leadsTable').classList.remove('hidden');

  const tbody = document.getElementById('leadsBody');
  tbody.innerHTML = '';
  leads.slice().reverse().forEach(l => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${l.firstName}</td>
      <td>${l.lastName}</td>
      <td>${l.email}</td>
      <td>${l.item}</td>
      <td class="worth-cell">${l.worth}</td>
      <td>${l.timestamp}</td>`;
    tbody.appendChild(tr);
  });
}

// ─── Export CSV ───────────────────────────────────────────────────────────────

function exportCSV() {
  if (leads.length === 0) {
    alert('No leads yet — go share the calculator!');
    return;
  }
  const headers = ['First Name','Last Name','Email','Item','Spent','Worth','Fund','Years','Timestamp'];
  const rows = leads.map(l =>
    [l.firstName, l.lastName, l.email, l.item, l.spent, l.worth, l.fund, l.years, l.timestamp]
    .map(v => `"${String(v).replace(/"/g, '""')}"`)
    .join(',')
  );
  const csv  = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = 'was-it-worth-it-leads.csv';
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Social sharing ───────────────────────────────────────────────────────────

function shareTwitter() {
  const url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText());
  window.open(url, '_blank');
}

function shareFacebook() {
  const url = 'https://www.facebook.com/sharer/sharer.php?u='
    + encodeURIComponent('https://wasitworth.it')
    + '&quote=' + encodeURIComponent(shareText());
  window.open(url, '_blank');
}

function copyText() {
  const text = shareText();
  const label = document.getElementById('copyLabel');
  const fallback = () => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    label.textContent = 'Copied!';
    setTimeout(() => { label.textContent = 'Copy text'; }, 2500);
  };
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      label.textContent = 'Copied!';
      setTimeout(() => { label.textContent = 'Copy text'; }, 2500);
    }).catch(fallback);
  } else {
    fallback();
  }
}
