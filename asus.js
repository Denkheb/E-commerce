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

// Asus Phone Data
const asusPhones = [
    {
        id: 'rog-phone-9-pro',
        name: 'ROG Phone 9 Pro',
        series: 'rog',
        price: 89999,
        image: 'Brands/Asus/rog-phone-9-pro.jpg',
        features: ['5g', 'waterproof', 'fastcharge'],
        specs: {
            display: '6.78-inch AMOLED',
            processor: 'Snapdragon 8 Gen 3',
            ram: '16GB',
            storage: '512GB',
            camera: '50MP + 13MP + 8MP',
            battery: '5500mAh'
        }
    },
    {
        id: 'rog-phone-9',
        name: 'ROG Phone 9',
        series: 'rog',
        price: 79999,
        image: 'Brands/Asus/rog-phone-9.jpg',
        features: ['5g', 'waterproof', 'fastcharge'],
        specs: {
            display: '6.78-inch AMOLED',
            processor: 'Snapdragon 8 Gen 3',
            ram: '16GB',
            storage: '256GB',
            camera: '50MP + 13MP + 8MP',
            battery: '5500mAh'
        }
    },
    {
        id: 'rog-phone-8-pro',
        name: 'ROG Phone 8 Pro',
        series: 'rog',
        price: 79999,
        image: 'Brands/Asus/rog-phone-8-pro.jpg',
        features: ['5g', 'waterproof', 'fastcharge'],
        specs: {
            display: '6.78-inch AMOLED',
            processor: 'Snapdragon 8 Gen 3',
            ram: '16GB',
            storage: '512GB',
            camera: '50MP + 13MP + 8MP',
            battery: '5500mAh'
        }
    },
    {
        id: 'rog-phone-8',
        name: 'ROG Phone 8',
        series: 'rog',
        price: 69999,
        image: 'Brands/Asus/rog-phone-8.jpg',
        features: ['5g', 'waterproof', 'fastcharge'],
        specs: {
            display: '6.78-inch AMOLED',
            processor: 'Snapdragon 8 Gen 3',
            ram: '16GB',
            storage: '512GB',
            camera: '50MP + 13MP + 8MP',
            battery: '5500mAh'
        }
    },
    {
        id: 'rog-phone-7',
        name: 'ROG Phone 7',
        series: 'rog',
        price: 49999,
        image: 'Brands/Asus/rog-phone-7.jpg',
        features: ['5g', 'waterproof', 'fastcharge'],
        specs: {
            display: '6.78-inch AMOLED',
            processor: 'Snapdragon 8 Gen 2',
            ram: '12GB',
            storage: '256GB',
            camera: '50MP + 13MP + 5MP',
            battery: '6000mAh'
        }
    },
    {
        id: 'zenfone-11-ultra',
        name: 'Zenfone 11 Ultra',
        series: 'zenfone',
        price: 59999,
        image: 'Brands/Asus/zenfone-11-ultra.jpg',
        features: ['5g', 'waterproof', 'fastcharge'],
        specs: {
            display: '6.78-inch AMOLED',
            processor: 'Snapdragon 8 Gen 3',
            ram: '16GB',
            storage: '512GB',
            camera: '50MP + 32MP + 13MP',
            battery: '5000mAh'
        }
    },
    {
        id: 'zenfone-10',
        name: 'Zenfone 10',
        series: 'zenfone',
        price: 39999,
        image: 'Brands/Asus/zenfone10.jpg',
        features: ['5g', 'waterproof', 'fastcharge'],
        specs: {
            display: '5.9-inch AMOLED',
            processor: 'Snapdragon 8 Gen 2',
            ram: '8GB',
            storage: '256GB',
            camera: '50MP + 13MP',
            battery: '4300mAh'
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
    return asusPhones.filter(phone => {
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
    const product = asusPhones.find(phone => phone.id === productId);
    if (product) {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
        localStorage.setItem('mofo-cart', JSON.stringify(cart));
        updateCartCount();
        showCartConfirmation();
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('mofo-cart') || '[]');
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

function showCartConfirmation() {
    const confirmation = document.createElement('div');
    confirmation.className = 'cart-confirmation';
    confirmation.textContent = 'Product added to cart!';
    document.body.appendChild(confirmation);

    setTimeout(() => {
        confirmation.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(confirmation);
        }, 300);
    }, 2000);
}