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

// Xiaomi Phone Data
const xiaomiPhones = [
    {
        id: 'xiaomi-15',
        name: 'Xiaomi 15',
        series: 'xiaomi',
        price: 69999,
        image: 'Brands/MI/xiaomi-15.jpg',
        features: ['5g', 'waterproof', 'fastcharge'],
        specs: {
            display: '6.36-inch AMOLED',
            processor: 'Snapdragon 8 Gen 4',
            ram: '16GB',
            storage: '1TB',
            camera: '50MP + 50MP + 50MP',
            battery: '4880mAh'
        }
    },
    {
        id: 'xiaomi-15-pro',
        name: 'Xiaomi 15 Pro',
        series: 'xiaomi',
        price: 79999,
        image: 'Brands/MI/xiaomi-15-pro.jpg',
        features: ['5g', 'waterproof', 'fastcharge'],
        specs: {
            display: '6.73-inch AMOLED',
            processor: 'Snapdragon 8 Gen 4',
            ram: '16GB',
            storage: '1TB',
            camera: '50MP + 50MP + 50MP',
            battery: '4880mAh'
        }
    },
    {
        id: 'redmi-note-14-pro',
        name: 'Redmi Note 14 Pro',
        series: 'redmi',
        price: 24999,
        image: 'Brands/MI/xiaomi-redmi-note-14-pro.jpg',
        features: ['5g', 'fastcharge'],
        specs: {
            display: '6.67-inch AMOLED',
            processor: 'Snapdragon 7s Gen 2',
            ram: '12GB',
            storage: '256GB',
            camera: '200MP + 8MP + 2MP',
            battery: '5000mAh'
        }
    },
    {
        id: 'redmi-note-14',
        name: 'Redmi Note 14',
        series: 'redmi',
        price: 19999,
        image: 'Brands/MI/xiaomi-redmi-note-14.jpg',
        features: ['5g', 'fastcharge'],
        specs: {
            display: '6.67-inch AMOLED',
            processor: 'Snapdragon 6 Gen 1',
            ram: '8GB',
            storage: '256GB',
            camera: '108MP + 8MP + 2MP',
            battery: '5000mAh'
        }
    },
    {
        id: 'poco-x7-pro',
        name: 'POCO X7 Pro',
        series: 'poco-x',
        price: 29999,
        image: 'Brands/MI/xiaomi-poco-x7-pro.jpg',
        features: ['5g', 'fastcharge'],
        specs: {
            display: '6.67-inch AMOLED',
            processor: 'Snapdragon 7s Gen 2',
            ram: '12GB',
            storage: '512GB',
            camera: '64MP + 8MP + 2MP',
            battery: '5000mAh'
        }
    },
    {
        id: 'poco-x7',
        name: 'POCO X7',
        series: 'poco-x',
        price: 24999,
        image: 'Brands/MI/xiaomi-poco-x7.jpg',
        features: ['5g', 'fastcharge'],
        specs: {
            display: '6.67-inch AMOLED',
            processor: 'Snapdragon 6 Gen 1',
            ram: '8GB',
            storage: '256GB',
            camera: '64MP + 8MP + 2MP',
            battery: '5100mAh'
        }
    },
    {
        id: 'poco-m7-pro',
        name: 'POCO M7 Pro',
        series: 'poco-m',
        price: 19999,
        image: 'Brands/MI/xiaomi-poco-m7-pro.jpg',
        features: ['5g', 'fastcharge'],
        specs: {
            display: '6.67-inch AMOLED',
            processor: 'Snapdragon 6 Gen 1',
            ram: '8GB',
            storage: '256GB',
            camera: '64MP + 8MP + 2MP',
            battery: '5000mAh'
        }
    },
    {
        id: 'poco-m7',
        name: 'POCO M7',
        series: 'poco-m',
        price: 15999,
        image: 'Brands/MI/xiaomi-poco-m7-5g.jpg',
        features: ['5g', 'fastcharge'],
        specs: {
            display: '6.67-inch IPS LCD',
            processor: 'Snapdragon 4 Gen 2',
            ram: '8GB',
            storage: '128GB',
            camera: '50MP + 2MP',
            battery: '5000mAh'
        }
    },
    {
        id: 'poco-f7',
        name: 'POCO F7',
        series: 'poco-f',
        price: 34999,
        image: 'Brands/MI/xiaomi-poco-f7-new.jpg',
        features: ['5g', 'fastcharge'],
        specs: {
            display: '6.67-inch AMOLED',
            processor: 'Snapdragon 8s Gen 3',
            ram: '12GB',
            storage: '512GB',
            camera: '50MP + 8MP + 2MP',
            battery: '5000mAh'
        }
    },
    {
        id: 'poco-f7-pro',
        name: 'POCO F7 Pro',
        series: 'poco-f',
        price: 39999,
        image: 'Brands/MI/xiaomi-poco-f7-pro.jpg',
        features: ['5g', 'fastcharge'],
        specs: {
            display: '6.67-inch AMOLED',
            processor: 'Snapdragon 8 Gen 3',
            ram: '16GB',
            storage: '1TB',
            camera: '50MP + 50MP + 12MP',
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
        const series = link.getAttribute('data-series');
        selectedSeries = series;
        
        // Update active state
        seriesLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Update URL without reloading
        const url = new URL(window.location);
        if (series === 'all') {
            url.searchParams.delete('series');
        } else {
            url.searchParams.set('series', series);
        }
        window.history.pushState({}, '', url);
        
        renderProducts();
    });
});

// Price range event listeners
const minPriceSlider = document.getElementById('min-price');
const maxPriceSlider = document.getElementById('max-price');

minPriceSlider.addEventListener('input', (e) => {
    minPrice = parseInt(e.target.value);
    minPriceInput.value = minPrice;
    renderProducts();
});

maxPriceSlider.addEventListener('input', (e) => {
    maxPrice = parseInt(e.target.value);
    maxPriceInput.value = maxPrice;
    renderProducts();
});

minPriceInput.addEventListener('change', (e) => {
    minPrice = parseInt(e.target.value);
    minPriceSlider.value = minPrice;
    renderProducts();
});

maxPriceInput.addEventListener('change', (e) => {
    maxPrice = parseInt(e.target.value);
    maxPriceSlider.value = maxPrice;
    renderProducts();
});

// Feature checkboxes event listeners
featureCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        selectedFeatures = Array.from(featureCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        renderProducts();
    });
});

// Sort select event listener
sortSelect.addEventListener('change', (e) => {
    sortBy = e.target.value;
    renderProducts();
});

// Functions
function filterProducts() {
    return xiaomiPhones.filter(phone => {
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
    return [...products].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'newest':
                return b.id.localeCompare(a.id);
            default:
                return 0;
        }
    });
}

function renderProducts() {
    const filteredProducts = filterProducts();
    const sortedProducts = sortProducts(filteredProducts);
    
    productsContainer.innerHTML = '';
    
    if (sortedProducts.length === 0) {
        productsContainer.innerHTML = '<p class="no-products">No products found matching your criteria.</p>';
        return;
    }
    
    sortedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-series">${product.series.toUpperCase()} Series</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">₹${product.price.toLocaleString()}</div>
                <div class="product-features">
                    ${product.features.map(feature => `
                        <span class="feature-tag">${feature === '5g' ? '5G' : 
                            feature === 'waterproof' ? 'Water Resistant' : 
                            'Fast Charging'}</span>
                    `).join('')}
                </div>
                <div class="product-specs">
                    <p><strong>Display:</strong> ${product.specs.display}</p>
                    <p><strong>Processor:</strong> ${product.specs.processor}</p>
                    <p><strong>RAM:</strong> ${product.specs.ram}</p>
                    <p><strong>Storage:</strong> ${product.specs.storage}</p>
                    <p><strong>Camera:</strong> ${product.specs.camera}</p>
                    <p><strong>Battery:</strong> ${product.specs.battery}</p>
                </div>
                <button class="buy-btn" onclick="addToCart('${product.id}')">Add to Cart</button>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('mofo-cart') || '[]');
    const product = xiaomiPhones.find(phone => phone.id === productId);
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