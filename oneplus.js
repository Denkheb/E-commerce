// DOM Elements
const productsContainer = document.getElementById('products-container');
const seriesLinks = document.querySelectorAll('.series-link');
const minPriceInput = document.getElementById('min-price-input');
const maxPriceInput = document.getElementById('max-price-input');
const featureCheckboxes = document.querySelectorAll('.feature-checkbox');
const sortSelect = document.getElementById('sort-by');

// State
let selectedSeries = 'all';
let minPrice = 5000;
let maxPrice = 200000;
let selectedFeatures = [];
let sortBy = 'popularity';

// OnePlus Phone Data
const oneplusPhones = [
    {
        id: 'oneplus-13',
        name: 'OnePlus 13',
        series: 'flagship',
        price: 74999,
        image: 'Brands/Oneplus/oneplus-13.jpg',
        features: ['5g', 'waterproof', 'fastcharge'],
        specs: {
            display: '6.82-inch AMOLED 2K',
            processor: 'Snapdragon 8 Gen 4',
            ram: '16GB',
            storage: '1TB',
            camera: '50MP + 50MP + 64MP',
            battery: '5500mAh'
        }
    },
    {
        id: 'oneplus-13r',
        name: 'OnePlus 13R',
        series: 'flagship',
        price: 44999,
        image: 'Brands/Oneplus/oneplus-13r.jpg',
        features: ['5g', 'waterproof', 'fastcharge'],
        specs: {
            display: '6.78-inch AMOLED',
            processor: 'Snapdragon 8 Gen 3',
            ram: '16GB',
            storage: '512GB',
            camera: '50MP + 50MP + 12MP',
            battery: '5600mAh'
        }
    },
    {
        id: 'oneplus-12',
        name: 'OnePlus 12',
        series: 'flagship',
        price: 64999,
        image: 'Brands/Oneplus/oneplus-12.jpg',
        features: ['5g', 'waterproof', 'fastcharge'],
        specs: {
            display: '6.82-inch AMOLED',
            processor: 'Snapdragon 8 Gen 3',
            ram: '16GB',
            storage: '512GB',
            camera: '50MP + 48MP + 64MP',
            battery: '5400mAh'
        }
    },
    {
        id: 'oneplus-nord-n40',
        name: 'OnePlus Nord N40',
        series: 'nord',
        price: 29999,
        image: 'Brands/Oneplus/oneplus-nord-n40.jpg',
        features: ['5g', 'fastcharge'],
        specs: {
            display: '6.72-inch AMOLED',
            processor: 'Snapdragon 7+ Gen 2',
            ram: '12GB',
            storage: '256GB',
            camera: '108MP + 8MP + 2MP',
            battery: '5000mAh'
        }
    },
    {
        id: 'oneplus-nord-n30',
        name: 'OnePlus Nord N30',
        series: 'nord',
        price: 24999,
        image: 'Brands/Oneplus/oneplus-nord-n30.jpg',
        features: ['5g', 'fastcharge'],
        specs: {
            display: '6.72-inch AMOLED',
            processor: 'Snapdragon 695',
            ram: '8GB',
            storage: '128GB',
            camera: '108MP + 2MP + 2MP',
            battery: '5000mAh'
        }
    }
];

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Check URL parameters for series
    const urlParams = new URLSearchParams(window.location.search);
    const seriesParam = urlParams.get('series');
    if (seriesParam) {
        selectedSeries = seriesParam;
        const seriesLink = document.querySelector(`[data-series="${seriesParam}"]`);
        if (seriesLink) {
            seriesLinks.forEach(link => link.classList.remove('active'));
            seriesLink.classList.add('active');
        }
    }

    // Initial render
    renderProducts();
    updateCartCount();
});

seriesLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        seriesLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        selectedSeries = link.dataset.series;
        renderProducts();
    });
});

minPriceInput.addEventListener('input', (e) => {
    minPrice = parseInt(e.target.value);
    renderProducts();
});

maxPriceInput.addEventListener('input', (e) => {
    maxPrice = parseInt(e.target.value);
    renderProducts();
});

featureCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        selectedFeatures = Array.from(featureCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        renderProducts();
    });
});

sortSelect.addEventListener('change', (e) => {
    sortBy = e.target.value;
    renderProducts();
});

// Functions
function filterProducts() {
    return oneplusPhones.filter(phone => {
        // Series filter
        if (selectedSeries !== 'all' && phone.series !== selectedSeries) {
            return false;
        }

        // Price filter
        if (phone.price < minPrice || phone.price > maxPrice) {
            return false;
        }

        // Features filter
        if (selectedFeatures.length > 0) {
            return selectedFeatures.every(feature => phone.features.includes(feature));
        }

        return true;
    });
}

function sortProducts(products) {
    switch (sortBy) {
        case 'price-low':
            return products.sort((a, b) => a.price - b.price);
        case 'price-high':
            return products.sort((a, b) => b.price - a.price);
        case 'newest':
            return products.sort((a, b) => b.id.localeCompare(a.id));
        default: // popularity
            return products;
    }
}

function renderProducts() {
    const filteredProducts = filterProducts();
    const sortedProducts = sortProducts(filteredProducts);

    productsContainer.innerHTML = sortedProducts.map(phone => `
        <div class="product-card">
            <div class="product-image">
                <img src="${phone.image}" alt="${phone.name}">
            </div>
            <div class="product-info">
                <div class="product-series">${phone.series.toUpperCase()} Series</div>
                <div class="product-name">${phone.name}</div>
                <div class="product-price">₹${phone.price.toLocaleString()}</div>
                <div class="product-features">
                    ${phone.features.map(feature => `
                        <span class="feature-tag">${feature === '5g' ? '5G' : 
                            feature === 'waterproof' ? 'Water Resistant' : 
                            'Fast Charging'}</span>
                    `).join('')}
                </div>
                <button class="buy-btn" onclick="addToCart('${phone.id}')">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('mofo-cart') || '[]');
    cart.push(productId);
    localStorage.setItem('mofo-cart', JSON.stringify(cart));
    updateCartCount();
    showCartConfirmation();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('mofo-cart') || '[]');
        cartCount.textContent = cart.length;
    }
}

function showCartConfirmation() {
    const confirmation = document.createElement('div');
    confirmation.className = 'cart-confirmation';
    confirmation.textContent = 'Product added to cart!';
    document.body.appendChild(confirmation);
    
    setTimeout(() => {
        confirmation.remove();
    }, 2000);
} 