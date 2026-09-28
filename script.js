document.addEventListener('DOMContentLoaded', () => {
    // Встановлюємо сьогоднішню дату в поле "Дата виїзду" за замовчуванням
    const today = new Date().toISOString().split('T')[0];
    const departInput = document.getElementById('depart-date');
    if (departInput) {
        departInput.value = today;
        departInput.min = today;
    }

    // Логіка кнопки поміняти місцями (Звідки <-> Куди)
    const swapBtn = document.getElementById('swap-btn');
    const fromInput = document.getElementById('from-input');
    const toInput = document.getElementById('to-input');

    if (swapBtn && fromInput && toInput) {
        swapBtn.addEventListener('click', () => {
            const temp = fromInput.value;
            fromInput.value = toInput.value;
            toInput.value = temp;
        });
    }

    // Обробка відправки форми
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert(`Шукаємо квитки: ${fromInput.value} ➔ ${toInput.value} на ${departInput.value}`);
        });
    }
});