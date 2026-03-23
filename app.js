/* ============================================
   WAS IT WORTH IT? — APP LOGIC
   18 GIFs · 20 Quips
   ============================================ */

const RATES = {
  VTI: 0.1047,
  VGT: 0.1412,
  VOO: 0.1047
};

const GIFS = [
  // Original 8
  { url: 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif',       caption: 'Your wallet after seeing these results.',                                           emoji: '💸' },
  { url: 'https://media.giphy.com/media/3o7TKwmnDgQb5jemjK/giphy.gif',      caption: 'The market watching you spend instead of invest.',                                 emoji: '📉' },
  { url: 'https://media.giphy.com/media/26ufnwz3wDUli7GU0/giphy.gif',       caption: 'You, explaining to your future self why this was necessary.',                      emoji: '🤦' },
  { url: 'https://media.giphy.com/media/d2lcHJTG5Tscg/giphy.gif',           caption: 'Your retirement fund when you swipe instead of save.',                            emoji: '😭' },
  { url: 'https://media.giphy.com/media/xT9IgG50Lg7russbDa/giphy.gif',      caption: 'Me watching you throw away future gains in real time.',                           emoji: '👀' },
  { url: 'https://media.giphy.com/media/3oKIPf3C7HqqYBVcCk/giphy.gif',      caption: 'Your future self trying to reach back through time and stop you.',                emoji: '⏳' },
  { url: 'https://media.giphy.com/media/26BRzozg4TCBXv6QU/giphy.gif',       caption: 'Totally fine. This is fine. Everything is fine.',                                 emoji: '🔥' },
  { url: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',       caption: 'You rationalizing why you needed it anyway.',                                     emoji: '🙈' },
  // New 10
  { url: 'https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif',      caption: 'Your bank account filing a restraining order against you.',                       emoji: '🚨' },
  { url: 'https://media.giphy.com/media/l46CyJmS9KUbokzsI/giphy.gif',       caption: 'The index fund you could\'ve bought, watching you from afar.',                   emoji: '📊' },
  { url: 'https://media.giphy.com/media/xT9IgzmazNQmtJxfZS/giphy.gif',      caption: 'Compound interest crying because you ghosted it.',                                emoji: '😢' },
  { url: 'https://media.giphy.com/media/26tPoyDhjiJ2g7rEs/giphy.gif',       caption: 'Warren Buffett reading your transaction history.',                                emoji: '🧓' },
  { url: 'https://media.giphy.com/media/l0HlPystfeSvLwn3q/giphy.gif',       caption: 'Your financial advisor after seeing this.',                                       emoji: '😬' },
  { url: 'https://media.giphy.com/media/5xaOcLGvzHxDKjufnLW/giphy.gif',     caption: 'Retirement-age you, still working because of this moment.',                       emoji: '👴' },
  { url: 'https://media.giphy.com/media/3oEjI5VtIhHvK37WYo/giphy.gif',      caption: 'Your 401k when you swipe instead of invest.',                                    emoji: '📪' },
  { url: 'https://media.giphy.com/media/26uf2YTgF5upXUTm0/giphy.gif',       caption: 'The stock market every year you weren\'t in it.',                                emoji: '📈' },
  { url: 'https://media.giphy.com/media/l0MYEqEzwMWFCg8rm/giphy.gif',       caption: 'You trying to explain this purchase to your future self.',                       emoji: '🫠' },
  { url: 'https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif',      caption: 'Everyone who invested instead of spending. That\'s not you.',                   emoji: '🏆' },
];

const QUIPS = [
  // Original 8
  (item, val) => `Your <strong>${item}</strong> wasn't cheap — the market had <span class="highlight-val">${val}</span> reserved for you. Hope it sparked joy.`,
  (item, val) => `Turns out your <strong>${item}</strong> cost a lot more than the sticker price. That alternate universe where you invested? Worth <span class="highlight-val">${val}</span>.`,
  (item, val) => `Congratulations! Your <strong>${item}</strong> successfully prevented you from having <span class="highlight-val">${val}</span>. Bold financial strategy.`,
  (item, val) => `Your <strong>${item}</strong> is sitting there like "worth it." The market had <span class="highlight-val">${val}</span> ready and waiting. No pressure though.`,
  (item, val) => `In a parallel universe where you skipped that <strong>${item}</strong>, you have <span class="highlight-val">${val}</span>. Just a fun thought. Totally fine.`,
  (item, val) => `The real price of your <strong>${item}</strong>? <span class="highlight-val">${val}</span>. The receipt lied to you. The math doesn't.`,
  (item, val) => `Your <strong>${item}</strong> waved goodbye to <span class="highlight-val">${val}</span> on your behalf. Generous of it, honestly.`,
  (item, val) => `That <strong>${item}</strong> cost you <span class="highlight-val">${val}</span> in future gains. But hey — you YOLO'd and now you know.`,
  // New 12 — brasher and more aggressive
  (item, val) => `Congrats. Your <strong>${item}</strong> just cost you <span class="highlight-val">${val}</span>. Your future self has filed a formal complaint.`,
  (item, val) => `Bold of you to spend money on <strong>${item}</strong> when the S&P 500 was literally right there. That's <span class="highlight-val">${val}</span> you walked away from.`,
  (item, val) => `<span class="highlight-val">${val}</span>. Gone. Because of <strong>${item}</strong>. Let that sink in while you sleep tonight.`,
  (item, val) => `Your <strong>${item}</strong> didn't just cost you money. It cost you <span class="highlight-val">${val}</span> and approximately 14 years off your retirement. Worth it though, right?`,
  (item, val) => `The audacity. The nerve. The sheer financial chaos of buying <strong>${item}</strong> instead of investing. That's <span class="highlight-val">${val}</span> you'll never see. Respect, honestly.`,
  (item, val) => `<span class="highlight-val">${val}</span> sitting in the market, growing quietly, judging you. All because of <strong>${item}</strong>. It knows what you did.`,
  (item, val) => `You looked at your money, looked at the stock market, and chose <strong>${item}</strong>. This is not financial advice. This is a cry for help. That's <span class="highlight-val">${val}</span> gone.`,
  (item, val) => `<strong>${item}</strong> has left the chat. So has <span class="highlight-val">${val}</span>. Your future self has left the building.`,
  (item, val) => `In what economy did <strong>${item}</strong> make more sense than <span class="highlight-val">${val}</span> in index funds? This one apparently. Carry on, champ.`,
  (item, val) => `Science hasn't confirmed it yet, but your <strong>${item}</strong> may be the most expensive thing ever purchased. <span class="highlight-val">${val}</span> says hi from the alternate timeline.`,
  (item, val) => `Your <strong>${item}</strong> is out here living its best life. Your retirement account is not. The difference? <span class="highlight-val">${val}</span>. Enjoy the purchase.`,
  (item, val) => `You spent the money. The market kept growing. Now there's a <span class="highlight-val">${val}</span> gap between you and your future self because of <strong>${item}</strong>. Zero regrets? You should have some.`,
];

let chartInstance = null;
let currentItem   = '';
let currentWorth  = '';
let currentSpent  = '';
let currentYears  = 10;
let currentFund   = 'VTI';
let submissions   = [];

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n) {
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000)     return '$' + (n / 1_000).toFixed(1) + 'K';
  return '$' + n.toFixed(2);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function initials(f, l) {
  return (f[0] + (l[0] || '')).toUpperCase();
}

function shareText() {
  return `I just found out my "${currentItem}" could've been worth ${currentWorth} if I'd invested it in ${currentFund} over ${currentYears} years.\n\nWas it worth it? Find out → wasitworth.it\n\n#WasItWorthIt #PersonalFinance #OpportunityCost`;
}

// ── Slider ───────────────────────────────────────────────────────────────────

const sliderEl = document.getElementById('yearsRange');

function updateSliderFill(el) {
  const pct = ((el.value - el.min) / (el.max - el.min)) * 100;
  el.style.background = `linear-gradient(to right, #2d7a3a ${pct}%, #d4d0cb ${pct}%)`;
}

updateSliderFill(sliderEl);

sliderEl.addEventListener('input', function () {
  currentYears = parseInt(this.value);
  document.getElementById('yearsVal').textContent = currentYears;
  updateSliderFill(this);
});

// ── Calculate ─────────────────────────────────────────────────────────────────

function calculate() {
  currentItem  = document.getElementById('itemName').value.trim() || 'purchase';
  const cost   = parseFloat(document.getElementById('itemCost').value);
  currentFund  = document.getElementById('fundSelect').value;
  currentYears = parseInt(sliderEl.value);

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

  // GIF — show emoji fallback immediately, attempt to load real GIF
  const gif = pick(GIFS);
  document.getElementById('gifEmoji').textContent   = gif.emoji;
  document.getElementById('gifCaption').textContent = gif.caption;
  document.getElementById('gifFallback').style.display = 'flex';
  const img = document.getElementById('gifImg');
  img.style.display = 'none';
  img.src = '';
  setTimeout(() => { img.src = gif.url; }, 50);

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
          borderColor: '#2563a8',
          backgroundColor: 'rgba(37,99,168,0.06)',
          borderWidth: 1.5,
          pointRadius: 0,
          fill: false,
          tension: 0,
          borderDash: [4, 3],
        },
        {
          label: 'Growth value',
          data: grown,
          borderColor: '#2d7a3a',
          backgroundColor: 'rgba(45,122,58,0.08)',
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
          backgroundColor: '#fff',
          borderColor: 'rgba(0,0,0,0.1)',
          borderWidth: 1,
          titleColor: '#9a9690',
          bodyColor: '#1a1814',
          callbacks: { label: ctx => '  ' + fmt(ctx.parsed.y) }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(0,0,0,0.05)' },
          ticks: { autoSkip: true, maxTicksLimit: 8, color: '#9a9690', font: { size: 11 } }
        },
        y: {
          grid: { color: 'rgba(0,0,0,0.05)' },
          ticks: { color: '#9a9690', font: { size: 11 }, callback: v => fmt(v) }
        }
      }
    }
  });

  // Verdict
  document.getElementById('calloutText').innerHTML = pick(QUIPS)(currentItem, currentWorth);

  // Show results
  document.getElementById('results').classList.remove('hidden');
  document.getElementById('sendFeedback').innerHTML = '';
  document.getElementById('copyLabel').textContent  = 'Copy text';

  setTimeout(() => {
    document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);
}

// ── Lead capture ──────────────────────────────────────────────────────────────

function sendResults() {
  const first = document.getElementById('firstName').value.trim();
  const last  = document.getElementById('lastName').value.trim();
  const email = document.getElementById('emailAddr').value.trim();

  if (!first || !last || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById('sendFeedback').innerHTML =
      '<div class="feedback-error">Please fill in your name and a valid email.</div>';
    return;
  }

  if (submissions.find(s => s.email.toLowerCase() === email.toLowerCase())) {
    document.getElementById('sendFeedback').innerHTML =
      '<div class="feedback-error">We already have you! Go touch some grass instead of buying more stuff.</div>';
    return;
  }

  const sub = {
    firstName: first, lastName: last, email,
    item: currentItem, spent: currentSpent, worth: currentWorth,
    fund: currentFund, years: currentYears,
    timestamp: new Date().toLocaleString()
  };

  submissions.unshift(sub);
  addFeedItem(sub);

  // ── Swap this block for your email service API call ──
  // Example (Mailchimp, ConvertKit, etc.):
  // fetch('https://your-api-endpoint.com/subscribe', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email: sub.email, first_name: sub.firstName, last_name: sub.lastName })
  // });
  console.log('Lead captured:', JSON.stringify(sub));

  document.getElementById('sendFeedback').innerHTML =
    `<div class="feedback-success">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      Sent, ${first}! Your financial regret is now on the record.
    </div>`;

  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value  = '';
  document.getElementById('emailAddr').value = '';
}

// ── Feed ──────────────────────────────────────────────────────────────────────

function addFeedItem(sub) {
  document.getElementById('feedEmpty').classList.add('hidden');
  const scroll = document.getElementById('feedScroll');
  const div = document.createElement('div');
  div.className = 'feed-item';
  div.innerHTML = `
    <div class="feed-avatar">${initials(sub.firstName, sub.lastName)}</div>
    <div class="feed-body">
      <div class="feed-name">${sub.firstName} ${sub.lastName[0]}.</div>
      <div class="feed-detail">spent ${sub.spent} on ${sub.item}</div>
    </div>
    <div class="feed-worth">${sub.worth}</div>`;
  scroll.insertBefore(div, scroll.firstChild);
  scroll.scrollTop = 0;
}

// ── Social sharing ────────────────────────────────────────────────────────────

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
  const label    = document.getElementById('copyLabel');
  const text     = shareText();
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
    navigator.clipboard.writeText(text)
      .then(() => {
        label.textContent = 'Copied!';
        setTimeout(() => { label.textContent = 'Copy text'; }, 2500);
      })
      .catch(fallback);
  } else {
    fallback();
  }
}
