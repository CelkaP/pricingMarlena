// Funkcja otwierająca modal
function openModal() {
    document.getElementById('modal-overlay').style.display = 'flex';
}

// Funkcja zamykająca modal
function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
}

// Pokazanie modalu przy starcie strony (tylko raz)
window.onload = function () {
    if (!localStorage.getItem('modalShown')) {
        openModal();
        localStorage.setItem('modalShown', 'true'); // Ustaw flagę, że modal został pokazany
    }
};

// Funkcja do obliczenia procentowej oszczędności
function calculateDiscount(oldPrice, newPrice) {
    const oldPriceNumber = parseFloat(oldPrice.replace(' PLN', '').replace(/\s+/g, ''));
    const newPriceNumber = parseFloat(newPrice.replace(' PLN', '').replace(/\s+/g, ''));
    if (!isNaN(oldPriceNumber) && !isNaN(newPriceNumber)) {
        const discount = ((oldPriceNumber - newPriceNumber) / oldPriceNumber) * 100;
        return Math.round(discount); // Zwraca zaokrąglony wynik
    }
    return null;
}

// Funkcja wyświetlająca kategorię
function loadCategory(category) {
    const categoriesContainer = document.getElementById('categories-container');
    const pricingContainer = document.getElementById('pricing-container');
    const backButton = document.getElementById('back-button');
    const mainTitle = document.getElementById('main-title');

    categoriesContainer.classList.add('hidden');
    backButton.style.display = 'block';
    pricingContainer.innerHTML = ''; // Reset zawartości

    let packages = [];

    // Dane dla poszczególnych kategorii
    if (category === 'dieta') {
        mainTitle.innerText = 'Dieta';
        packages = [
            { name: 'Plan Dietetyczny 1 msc', oldPrice: '237 PLN', price: '225 PLN', desc: 'Wsparcie dietetyczne na 1 miesiąc' },
            { name: 'Plan Dietetyczny 3 msc', oldPrice: '667 PLN', price: '600 PLN', desc: 'Wsparcie dietetyczne na 3 miesiące' },
            { name: 'Plan Dietetyczny 6 msc', oldPrice: '1375 PLN', price: '1100 PLN', desc: 'Wsparcie dietetyczne na 6 miesięcy' }
        ];
    } else if (category === 'dieta-trening') {
        mainTitle.innerText = 'Dieta + Plan Treningowy';
        packages = [
            { name: 'Plan Dietetyczny + Plan Treningowy 1 msc', oldPrice: '368 PLN', price: '350 PLN', desc: 'Dieta i trening na 1 miesiąc' },
            { name: 'Plan Dietetyczny + Plan Treningowy 3 msc', oldPrice: '1000 PLN', price: '900 PLN', desc: 'Dieta i trening na 3 miesiące' },
            { name: 'Plan Dietetyczny + Plan Treningowy 6 msc', oldPrice: '2063 PLN', price: '1650 PLN', desc: 'Dieta i trening na 6 miesięcy' }
        ];
    } else if (category === 'jednorazowe') {
        mainTitle.innerText = 'Jednorazowe';
        packages = [
            { name: 'Jednorazowy Jadłospis na tydzień', price: '150 PLN', desc: 'Jednorazowy jadłospis na 7 dni dopasowany do twoich potrzeb<br><br> Gotowa lista zakupów' },
        ];
    }

    // Generowanie kafelków z pakietami
    packages.forEach(pkg => {
        const box = document.createElement('div');
        box.className = 'pricing-box';

        let discountHTML = '';
        if (pkg.oldPrice) {
            const discount = calculateDiscount(pkg.oldPrice, pkg.price);
            if (discount) {
                discountHTML = `<div class="discount-badge">${discount}% taniej</div>`;
            }
        }

        box.innerHTML = `
            ${discountHTML}
            <h2 class="pricing-box-header">${pkg.name}</h2>
            <div class="price-container">
                ${pkg.oldPrice ? `<span class="old-price">${pkg.oldPrice}</span>` : ''}
                <span class="new-price">${pkg.price}</span>
            </div>
            <p class="packageDesc">${pkg.desc}</p>
            <a href="payPage.html?name=${encodeURIComponent(pkg.name)}&price=${encodeURIComponent(pkg.price)}" class="button">Zamów teraz</a>
        `;
        pricingContainer.appendChild(box);
    });

    pricingContainer.classList.remove('hidden');
}


// Funkcja do obsługi powrotu
function goBack() {
    const categoriesContainer = document.getElementById('categories-container');
    const pricingContainer = document.getElementById('pricing-container');
    const backButton = document.getElementById('back-button');
    const mainTitle = document.getElementById('main-title');

    categoriesContainer.classList.remove('hidden');
    pricingContainer.classList.add('hidden');
    backButton.style.display = 'none';
    mainTitle.innerText = 'Wybierz Kategorię';
}

// Funkcja do ładowania strony wyników
function loadResults() {
    window.location.href = 'results.html';
}


// Funkcja do otwierania modala po kliknięciu w gif powiadomienia
function handleGifClick() {
    openModal();  // Otwórz modal po kliknięciu na GIF
}

// Funkcja do zamknięcia modala
function closeGifModal() {
    closeModal();  // Zamyka modal po kliknięciu na X lub tło
}

// Funkcja sprawdzająca, czy modal był już pokazany
function checkModal() {
    const modalShown = localStorage.getItem('modalShown');
    
    // Jeśli modal nie był jeszcze pokazany
    if (!modalShown) {
        openModal();  // Otwórz modal
        localStorage.setItem('modalShown', 'true'); // Zapisz, że modal został pokazany
    }
}

// Sprawdzenie i otwarcie modala tylko raz na początku
document.addEventListener('DOMContentLoaded', () => {
    checkModal();
    
    // Dodanie eventu kliknięcia na gif w prawym górnym rogu
    const notificationGif = document.querySelector('.notification-icon');
    if (notificationGif) {
        notificationGif.addEventListener('click', handleGifClick);
    }

    // Dodanie eventu zamknięcia modala
    const closeModalButton = document.querySelector('.close-btn');
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeGifModal);
    }
});
