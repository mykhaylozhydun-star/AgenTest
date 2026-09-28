document.addEventListener('DOMContentLoaded', () => {
    // Встановлюємо сьогоднішню дату за замовчуванням
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

    // Завантаження рейсів з localStorage або стандартних
    const defaultRoutes = [
        { id: 1, from: 'Київ', to: 'Одеса', time: '08:00', price: 450, desc: 'Комфортний рейс • Експрес', img: 'https://images.unsplash.com/photo-1588880331179-bc9b9338fa5a?auto=format&fit=crop&w=600&q=80' },
        { id: 2, from: 'Київ', to: 'Львів', time: '22:30', price: 550, desc: 'Нічний рейс • Wi-Fi & Розетки', img: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=600&q=80' },
        { id: 3, from: 'Львів', to: 'Краків', time: '06:00', price: 1200, desc: 'Міжнародний • Без пересадок', img: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80' }
    ];

    function getRoutes() {
        const saved = localStorage.getItem('bus_routes');
        return saved ? JSON.parse(saved) : defaultRoutes;
    }

    // Рендеринг карток рейсів на головній сторінці
    const routesGrid = document.getElementById('routes-grid');
    if (routesGrid) {
        const routes = getRoutes();
        routesGrid.innerHTML = '';

        routes.forEach(route => {
            const bgImg = route.img || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80';
            const card = document.createElement('div');
            card.className = 'route-card';
            card.innerHTML = `
                <div class="card-image" style="background-image: url('${bgImg}');">
                    <button class="fav-btn">♥</button>
                </div>
                <div class="card-content">
                    <div class="card-header">
                        <h3>${route.from} — ${route.to}</h3>
                        <span class="price">${route.price} грн</span>
                    </div>
                    <p class="card-subtitle">${route.desc}</p>
                    <div class="card-footer">
                        <span class="badge">Виїзд: ${route.time}</span>
                        <a href="search.html?from=${encodeURIComponent(route.from)}&to=${encodeURIComponent(route.to)}" class="arrow-link">→</a>
                    </div>
                </div>
            `;
            routesGrid.appendChild(card);
        });
    }

    // Обробка форми пошуку
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const from = fromInput.value;
            const to = toInput.value;
            const date = departInput.value;
            window.location.href = `search.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`;
        });
    }
});
