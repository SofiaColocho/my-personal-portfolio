const form = document.getElementById('transactionForm');
const list = document.getElementById('transactionList');
const incomeTotal = document.getElementById('incomeTotal');
const expenseTotal = document.getElementById('expenseTotal');
const profitTotal = document.getElementById('profitTotal');
const storageKey = 'contafacil_movimientos_v1';

let transactions = JSON.parse(localStorage.getItem(storageKey) || '[]');

function money(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function save() {
  localStorage.setItem(storageKey, JSON.stringify(transactions));
}

function render() {
  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  incomeTotal.textContent = money(income);
  expenseTotal.textContent = money(expense);
  profitTotal.textContent = money(income - expense);

  if (!transactions.length) {
    list.innerHTML = '<tr class="empty-row"><td colspan="4">Todavía no hay movimientos. Agrega tu primera venta o gasto.</td></tr>';
    return;
  }

  list.innerHTML = transactions.slice().reverse().map(t => `
    <tr>
      <td>${escapeHTML(t.description)}</td>
      <td>${t.type === 'income' ? 'Ingreso' : 'Gasto'}</td>
      <td>${t.date}</td>
      <td class="align-right ${t.type === 'income' ? 'positive' : 'negative-amount'}">${t.type === 'income' ? '+' : '−'}${money(t.amount)}</td>
    </tr>
  `).join('');
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[char]));
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const description = document.getElementById('description').value.trim();
  const amount = Number(document.getElementById('amount').value);
  const type = document.getElementById('type').value;

  if (!description || !Number.isFinite(amount) || amount <= 0) {
    alert('Ingresa una descripción y un monto válido.');
    return;
  }

  transactions.push({
    description,
    amount: Math.round(amount * 100) / 100,
    type,
    date: new Date().toLocaleDateString('es-SV')
  });
  save();
  render();
  form.reset();
  document.getElementById('description').focus();
});

document.getElementById('clearData').addEventListener('click', () => {
  if (transactions.length && confirm('¿Deseas borrar todos los movimientos de esta demostración?')) {
    transactions = [];
    save();
    render();
  }
});

document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('mainNav').classList.toggle('open');
});

document.querySelectorAll('#mainNav a').forEach(link => {
  link.addEventListener('click', () => document.getElementById('mainNav').classList.remove('open'));
});

render();
