document.addEventListener('DOMContentLoaded', () => {
    // Встановлюємо мінімальну дату — сьогодні
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

    // Дефолтні рейси
    const defaultRoutes = [
        { id: 1, from: 'Київ', to: 'Барселона', time: '07:00', duration: 36, price: 5200, days: 'Вт, Пт', dir: 'UA_ES' },
        { id: 2, from: 'Львів', to: 'Барселона', time: '13:00', duration: 30, price: 4600, days: 'Вт, Пт', dir: 'UA_ES' },
        { id: 3, from: 'Львів', to: 'Мадрид', time: '13:00', duration: 38, price: 5000, days: 'Ср, Сб', dir: 'UA_ES' },
        { id: 4, from: 'Барселона', to: 'Львів', time: '10:00', duration: 30, price: 4600, days: 'Чт, Нд', dir: 'ES_UA' }
    ];

    function getRoutes() {
        const saved = localStorage.getItem('bus_routes_es');
        return saved ? JSON.parse(saved) : defaultRoutes;
    }

    // Показуємо картки рейсів на головній
    const routesGrid = document.getElementById('routes-grid');
    if (routesGrid) {
        const routes = getRoutes();
        routesGrid.innerHTML = '';

        routes.slice(0, 6).forEach(route => {
            const card = document.createElement('div');
            card.className = 'route-card';
            card.innerHTML = `
                <div class="card-image" style="background-image: url('https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=600&q=80');">
                    <button class="fav-btn">♥</button>
                </div>
                <div class="card-content">
                    <div class="card-header">
                        <h3>${route.from} ➔ ${route.to}</h3>
                        <span class="price">${route.price} грн</span>
                    </div>
                    <p class="card-subtitle">⏱ В дорозі: ${route.duration} год • Дні: ${route.days}</p>
                    <div class="card-footer">
                        <span class="badge">Виїзд: ${route.time}</span>
                        <a href="search.html?from=${encodeURIComponent(route.from)}&to=${encodeURIComponent(route.to)}" class="arrow-link">→</a>
                    </div>
                </div>
            `;
            routesGrid.appendChild(card);
        });
    }

    // Обробка форми пошуку при натисканні «Знайти»
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const from = fromInput ? fromInput.value : '';
            const to = toInput ? toInput.value : '';
            const date = departInput ? departInput.value : '';
            
            // Перенаправлення на сторінку пошуку із параметрами
            window.location.href = `search.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`;
        });
    }
});
