const API_BASE = '/waitlist';
let allEntries = [];
let activeFilter = 'all';

const form = document.getElementById('addForm');
const submitBtn = document.getElementById('submitBtn');
const ticketList = document.getElementById('ticketList');
const emptyState = document.getElementById('emptyState');
const loadingIndicator = document.getElementById('loadingIndicator');
const tabs = document.querySelectorAll('.tab');
const statWaiting = document.getElementById('statWaiting');
const statNotified = document.getElementById('statNotified');
const statSeated = document.getElementById('statSeated');

function setLoading(isLoading) {
  loadingIndicator.hidden = !isLoading;
  ticketList.hidden = isLoading;
}

function clearFieldErrors() {
  document.getElementById('playerNameError').textContent = '';
  document.getElementById('gameNameError').textContent = '';
  document.getElementById('playerName').removeAttribute('aria-invalid');
  document.getElementById('gameName').removeAttribute('aria-invalid');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function updateStats() {
  statWaiting.textContent = allEntries.filter(e => (e.status || 'waiting') === 'waiting').length;
  statNotified.textContent = allEntries.filter(e => e.status === 'notified').length;
  statSeated.textContent = allEntries.filter(e => e.status === 'seated').length;
}

function applyFilter() {
  return activeFilter === 'all'
    ? allEntries
    : allEntries.filter(e => (e.status || 'waiting') === activeFilter);
}

function renderTickets() {
  const entries = applyFilter();
  ticketList.innerHTML = '';

  if (entries.length === 0) {
    emptyState.hidden = false;
    ticketList.hidden = true;
  } else {
    emptyState.hidden = true;
    ticketList.hidden = false;

    entries.forEach(entry => {
      const li = document.createElement('li');
      li.className = 'ticket';
      li.dataset.status = entry.status || 'waiting';
      li.innerHTML = `
        <span class="ticket-id">#${String(entry.id).padStart(3, '0')}</span>
        <div class="ticket-info">
          <div class="ticket-name">${escapeHtml(entry.playerName)}</div>
          <div class="ticket-game">${escapeHtml(entry.gameName)}</div>
        </div>
        <span class="ticket-status">${escapeHtml(entry.status || 'waiting')}</span>
        <button class="ticket-remove" data-id="${entry.id}" aria-label="Remove ${escapeHtml(entry.playerName)} from queue">Remove</button>
      `;
      ticketList.appendChild(li);
    });
  }

  updateStats();
}

async function fetchTickets() {
  setLoading(true);
  try {
    const res = await fetch(API_BASE);
    const json = await res.json();
    allEntries = json.data || [];
    renderTickets();
  } catch (err) {
    allEntries = [];
    emptyState.hidden = false;
    emptyState.querySelector('p').textContent = 'Could not load tickets';
  } finally {
    setLoading(false);
  }
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    activeFilter = tab.dataset.status;
    renderTickets();
  });
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearFieldErrors();

  const playerName = document.getElementById('playerName').value.trim();
  const gameName = document.getElementById('gameName').value.trim();

  let hasError = false;
  if (!playerName) {
    document.getElementById('playerNameError').textContent = 'Player name is required';
    document.getElementById('playerName').setAttribute('aria-invalid', 'true');
    hasError = true;
  }
  if (!gameName) {
    document.getElementById('gameNameError').textContent = 'Game name is required';
    document.getElementById('gameName').setAttribute('aria-invalid', 'true');
    hasError = true;
  }
  if (hasError) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Issuing…';

  try {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerName, gameName }),
    });

    if (!res.ok) throw new Error('Request failed');

    console.log('[Analytics] User interacted with Game Waitlist CRUD API with Route Parameters');
    form.reset();
    fetchTickets();
  } catch (err) {
    document.getElementById('gameNameError').textContent = 'Could not add ticket, try again';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Issue ticket';
  }
});

ticketList.addEventListener('click', async (e) => {
  if (!e.target.classList.contains('ticket-remove')) return;
  const id = e.target.dataset.id;

  try {
    await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    console.log('[Analytics] User interacted with Game Waitlist CRUD API with Route Parameters');
    fetchTickets();
  } catch (err) {
    console.error('Could not remove ticket');
  }
});

fetchTickets();