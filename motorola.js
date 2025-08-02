document.addEventListener('DOMContentLoaded', function() {
    let currentSeries = 'all';
    // Handle URL parameters for series filtering
    const urlParams = new URLSearchParams(window.location.search);
    const seriesParam = urlParams.get('series');
    if (seriesParam) {
        currentSeries = seriesParam;
    }

    const navToggle = document.getElementById('navToggle');
    const navDropdown = document.getElementById('navDropdown');
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navDropdown.classList.toggle('active');
        });
    }

    const minPriceSlider = document.getElementById('min-price');
    const maxPriceSlider = document.getElementById('max-price');
    const minPriceInput = document.getElementById('min-price-input');
    const maxPriceInput = document.getElementById('max-price-input');

    minPriceSlider.addEventListener('input', function() {
        minPriceInput.value = this.value;
        if (parseInt(minPriceSlider.value) > parseInt(maxPriceSlider.value)) {
            maxPriceSlider.value = minPriceSlider.value;
            maxPriceInput.value = minPriceSlider.value;
        }
        filterProducts();
    });
    maxPriceSlider.addEventListener('input', function() {
        maxPriceInput.value = this.value;
        if (parseInt(maxPriceSlider.value) < parseInt(minPriceSlider.value)) {
            minPriceSlider.value = maxPriceSlider.value;
            minPriceInput.value = maxPriceSlider.value;
        }
        filterProducts();
    });
    minPriceInput.addEventListener('change', function() {
        minPriceSlider.value = this.value;
        if (parseInt(minPriceInput.value) > parseInt(maxPriceInput.value)) {
            maxPriceInput.value = minPriceInput.value;
            maxPriceSlider.value = minPriceInput.value;
        }
        filterProducts();
    });
    maxPriceInput.addEventListener('change', function() {
        maxPriceSlider.value = this.value;
        if (parseInt(maxPriceInput.value) < parseInt(minPriceInput.value)) {
            minPriceInput.value = maxPriceInput.value;
            minPriceSlider.value = maxPriceInput.value;
        }
        filterProducts();
    });

    const seriesLinks = document.querySelectorAll('.series-link');
    seriesLinks.forEach(link => {
        if (link.getAttribute('data-series') === currentSeries) {
            link.classList.add('active');
        }
        link.addEventListener('click', function(e) {
            e.preventDefault();
            seriesLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            currentSeries = this.getAttribute('data-series');
            filterProducts();
        });
    });

    const sortSelect = document.getElementById('sort-by');
    sortSelect.addEventListener('change', filterProducts);

    const featureCheckboxes = document.querySelectorAll('.feature-checkbox');
    featureCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    let cart = [];
    if (localStorage.getItem('mofo-cart')) {
        try {
            cart = JSON.parse(localStorage.getItem('mofo-cart'));
            updateCartCount();
        } catch (e) {
            localStorage.removeItem('mofo-cart');
        }
    }
    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }
    function addToCart(product) {
        cart.push(product);
        localStorage.setItem('mofo-cart', JSON.stringify(cart));
        updateCartCount();
    }

    const motorolaPhones = [
        {
            id: 'edge-50-pro',
            name: 'Motorola Edge 50 Pro',
            series: 'edge',
            price: 31999,
            image: 'Brands/Motorola/motorola-edge50-pro.jpg',
            features: ['5g', 'waterproof', 'fastcharge'],
            specs: {
                display: '6.7-inch pOLED',
                processor: 'Snapdragon 7 Gen 3',
                ram: '8GB',
                storage: '256GB',
                camera: '50MP + 13MP + 10MP',
                battery: '4500mAh'
            }
        },
        {
            id: 'edge-50-fusion',
            name: 'Motorola Edge 50 Fusion',
            series: 'edge',
            price: 22999,
            image: 'Brands/Motorola/motorola-edge-50-fusion.jpg',
            features: ['5g', 'fastcharge'],
            specs: {
                display: '6.7-inch pOLED',
                processor: 'Snapdragon 7s Gen 2',
                ram: '8GB',
                storage: '128GB',
                camera: '50MP + 13MP',
                battery: '5000mAh'
            }
        },
        {
            id: 'g85',
            name: 'Motorola G85',
            series: 'g',
            price: 17999,
            image: 'Brands/Motorola/motorola-moto-g85.jpg',
            features: ['5g', 'fastcharge'],
            specs: {
                display: '6.67-inch pOLED',
                processor: 'Snapdragon 6 Gen 1',
                ram: '8GB',
                storage: '128GB',
                camera: '50MP + 8MP',
                battery: '5000mAh'
            }
        },
        {
            id: 'g55',
            name: 'Motorola G55',
            series: 'g',
            price: 14999,
            image: 'Brands/Motorola/motorola-moto-g55-5g.jpg',
            features: ['5g', 'fastcharge'],
            specs: {
                display: '6.6-inch IPS LCD',
                processor: 'MediaTek Dimensity 7020',
                ram: '6GB',
                storage: '128GB',
                camera: '50MP + 8MP',
                battery: '5000mAh'
            }
        },
        {
            id: 'razr-50-ultra',
            name: 'Motorola Razr 50 Ultra',
            series: 'razr',
            price: 99999,
            image: 'Brands/Motorola/motorola-razr-50-ultra.jpg',
            features: ['5g', 'fastcharge'],
            specs: {
                display: '6.9-inch pOLED',
                processor: 'Snapdragon 8 Gen 3',
                ram: '12GB',
                storage: '512GB',
                camera: '50MP + 13MP',
                battery: '3800mAh'
            }
        }
    ];

    function filterProducts() {
        let filtered = motorolaPhones.filter(phone => {
            // Series filter
            if (currentSeries !== 'all' && phone.series !== currentSeries) return false;
            // Price filter
            if (phone.price < parseInt(minPriceSlider.value) || phone.price > parseInt(maxPriceSlider.value)) return false;
            // Feature filter
            let checked = Array.from(featureCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
            if (checked.length > 0 && !checked.every(f => phone.features.includes(f))) return false;
            return true;
        });
        // Sorting
        const sortValue = sortSelect.value;
        if (sortValue === 'price-low') filtered.sort((a, b) => a.price - b.price);
        else if (sortValue === 'price-high') filtered.sort((a, b) => b.price - a.price);
        else if (sortValue === 'newest') filtered.sort((a, b) => b.id.localeCompare(a.id));
        renderProducts(filtered);
    }

    function renderProducts(products) {
        const productsContainer = document.getElementById('products-container');
        if (!products.length) {
            productsContainer.innerHTML = '<div style="padding:2rem;text-align:center;">No products found matching your criteria.</div>';
            return;
        }
        productsContainer.innerHTML = products.map(phone => `
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
                            <span class="feature-tag">${feature === '5g' ? '5G' : feature === 'waterproof' ? 'Water Resistant' : 'Fast Charging'}</span>
                        `).join('')}
                    </div>
                    <button class="buy-btn" onclick="addToCart('${phone.id}')">Add to Cart</button>
                </div>
            </div>
        `).join('');
    }

    window.addToCart = function(productId) {
        const product = motorolaPhones.find(p => p.id === productId);
        if (product) {
            addToCart(product);
        }
    };

    // Initial render
    filterProducts();
    updateCartCount();
}); 