document.addEventListener('DOMContentLoaded', function() {
    let currentSeries = 'all';
    
    // Handle URL parameters for series filtering
    const urlParams = new URLSearchParams(window.location.search);
    const seriesParam = urlParams.get('series');
    if (seriesParam) {
        currentSeries = `${seriesParam}-series`;
        const seriesLink = document.querySelector(`[data-series="${seriesParam}-series"]`);
        if (seriesLink) {
            document.querySelectorAll('.series-link').forEach(link => link.classList.remove('active'));
            seriesLink.classList.add('active');
        }
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
        const linkSeries = link.getAttribute('data-series');
        if (linkSeries === currentSeries) {
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
            console.error('Error loading cart from localStorage:', e);
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
    
    const iphonePhones = [
        {
            id: 'iphone-16-pro-max',
            name: 'iPhone 16 Pro Max',
            series: '16-series',
            price: 169900,
            image: 'Brands/I-Phone/iphone16promax.webp',
            features: ['5g', 'waterproof', 'fastcharge'],
            specs: {
                camera: '48MP + 12MP + 12MP',
                ram: '8GB',
                storage: '256GB',
                battery: '4500mAh'
            }
        },
        {
            id: 'iphone-16-pro',
            name: 'iPhone 16 Pro',
            series: '16-series',
            price: 159900,
            image: 'Brands/I-Phone/iphone16pro.webp',
            features: ['5g', 'waterproof', 'fastcharge'],
            specs: {
                camera: '48MP + 12MP + 12MP',
                ram: '8GB',
                storage: '128GB',
                battery: '3400mAh'
            }
        },
        {
            id: 'iphone-16-plus',
            name: 'iPhone 16 Plus',
            series: '16-series',
            price: 99900,
            image: 'Brands/I-Phone/iphone16plus.jpg',
            features: ['5g', 'waterproof', 'fastcharge'],
            specs: {
                camera: '48MP + 12MP',
                ram: '6GB',
                storage: '128GB',
                battery: '4400mAh'
            }
        },
        {
            id: 'iphone-16',
            name: 'iPhone 16',
            series: '16-series',
            price: 89900,
            image: 'Brands/I-Phone/iphone16.webp',
            features: ['5g', 'waterproof', 'fastcharge'],
            specs: {
                camera: '48MP + 12MP',
                ram: '6GB',
                storage: '128GB',
                battery: '3400mAh'
            }
        },
        {
            id: 'iphone-15-pro-max',
            name: 'iPhone 15 Pro Max',
            series: '15-series',
            price: 159900,
            image: 'Brands/I-Phone/iphone 15pro max.jpg',
            features: ['5g', 'waterproof', 'fastcharge'],
            specs: {
                camera: '48MP + 12MP + 12MP',
                ram: '8GB',
                storage: '256GB',
                battery: '4422mAh'
            }
        },
        {
            id: 'iphone-15-pro',
            name: 'iPhone 15 Pro',
            series: '15-series',
            price: 149900,
            image: 'Brands/I-Phone/iphone15pro.jpg',
            features: ['5g', 'waterproof', 'fastcharge'],
            specs: {
                camera: '48MP + 12MP + 12MP',
                ram: '8GB',
                storage: '128GB',
                battery: '3274mAh'
            }
        },
        {
            id: 'iphone-15-plus',
            name: 'iPhone 15 Plus',
            series: '15-series',
            price: 89900,
            image: 'Brands/I-Phone/iphone15plus.jpg',
            features: ['5g', 'waterproof', 'fastcharge'],
            specs: {
                camera: '48MP + 12MP',
                ram: '6GB',
                storage: '128GB',
                battery: '4383mAh'
            }
        },
        {
            id: 'iphone-15',
            name: 'iPhone 15',
            series: '15-series',
            price: 79900,
            image: 'Brands/I-Phone/iphone15.webp',
            features: ['5g', 'waterproof', 'fastcharge'],
            specs: {
                camera: '48MP + 12MP',
                ram: '6GB',
                storage: '128GB',
                battery: '3349mAh'
            }
        },
        {
            id: 'iphone-14-pro-max',
            name: 'iPhone 14 Pro Max',
            series: '14-series',
            price: 139900,
            image: 'Brands/I-Phone/iphone14promax.jpeg',
            features: ['5g', 'waterproof', 'fastcharge'],
            specs: {
                camera: '48MP + 12MP + 12MP',
                ram: '6GB',
                storage: '256GB',
                battery: '4323mAh'
            }
        },
        {
            id: 'iphone-14-pro',
            name: 'iPhone 14 Pro',
            series: '14-series',
            price: 129900,
            image: 'Brands/I-Phone/iphone14pro.jpeg',
            features: ['5g', 'waterproof', 'fastcharge'],
            specs: {
                camera: '48MP + 12MP + 12MP',
                ram: '6GB',
                storage: '128GB',
                battery: '3200mAh'
            }
        },
        {
            id: 'iphone-14-plus',
            name: 'iPhone 14 Plus',
            series: '14-series',
            price: 79900,
            image: 'Brands/I-Phone/iphone14pus.jpeg',
            features: ['5g', 'waterproof', 'fastcharge'],
            specs: {
                camera: '12MP + 12MP',
                ram: '6GB',
                storage: '128GB',
                battery: '4325mAh'
            }
        },
        {
            id: 'iphone-14',
            name: 'iPhone 14',
            series: '14-series',
            price: 69900,
            image: 'Brands/I-Phone/iphone14.jpeg',
            features: ['5g', 'waterproof', 'fastcharge'],
            specs: {
                camera: '12MP + 12MP',
                ram: '6GB',
                storage: '128GB',
                battery: '3279mAh'
            }
        },
        {
            id: 'iphone-13-pro-max',
            name: 'iPhone 13 Pro Max',
            series: '13-series',
            price: 119900,
            image: 'Brands/I-Phone/iphone13promax.jpeg',
            features: ['5g', 'waterproof', 'fastcharge'],
            specs: {
                camera: '12MP + 12MP + 12MP',
                ram: '6GB',
                storage: '256GB',
                battery: '4352mAh'
            }
        },
        {
            id: 'iphone-13-pro',
            name: 'iPhone 13 Pro',
            series: '13-series',
            price: 109900,
            image: 'Brands/I-Phone/iphone13pro.jpeg',
            features: ['5g', 'waterproof', 'fastcharge'],
            specs: {
                camera: '12MP + 12MP + 12MP',
                ram: '6GB',
                storage: '128GB',
                battery: '3095mAh'
            }
        },
        {
            id: 'iphone-13',
            name: 'iPhone 13',
            series: '13-series',
            price: 69900,
            image: 'Brands/I-Phone/iphone13.jpg',
            features: ['5g', 'waterproof', 'fastcharge'],
            specs: {
                camera: '12MP + 12MP',
                ram: '4GB',
                storage: '128GB',
                battery: '3240mAh'
            }
        },
        {
            id: 'iphone-13-mini',
            name: 'iPhone 13 mini',
            series: '13-series',
            price: 59900,
            image: 'Brands/I-Phone/iphone13 mini.jpeg',
            features: ['5g', 'waterproof', 'fastcharge'],
            specs: {
                camera: '12MP + 12MP',
                ram: '4GB',
                storage: '128GB',
                battery: '2406mAh'
            }
        }
    ];
    
    function renderProducts(products) {
        const productsContainer = document.getElementById('products-container');
        productsContainer.innerHTML = '';
        
        if (products.length === 0) {
            productsContainer.innerHTML = '<div class="no-products">No products match your filters. Please try different criteria.</div>';
            return;
        }
        
        products.forEach(product => {
            const featureHTML = product.features.map(feature => {
                let featureText = '';
                if (feature === '5g') featureText = '5G Support';
                if (feature === 'waterproof') featureText = 'Water Resistant';
                if (feature === 'fastcharge') featureText = 'Fast Charging';
                return `<span class="feature-tag">${featureText}</span>`;
            }).join('');
            
            const productCard = `
                <div class="product-card" data-id="${product.id}">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <div class="product-series">${formatSeries(product.series)}</div>
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-price">₹${product.price.toLocaleString()}</div>
                        <div class="product-features">${featureHTML}</div>
                        <p class="product-specs">${JSON.stringify(product.specs)}</p>
                        <button class="buy-btn">Buy Now</button>
                    </div>
                </div>
            `;
            
            productsContainer.innerHTML += productCard;
        });
        
        document.querySelectorAll('.buy-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.closest('.product-card').getAttribute('data-id');
                const product = iphonePhones.find(p => p.id === productId);
                
                if (product) {
                    addToCart(product);
                    
                    const confirmMessage = document.createElement('div');
                    confirmMessage.className = 'cart-confirmation';
                    confirmMessage.textContent = `${product.name} added to cart!`;
                    document.body.appendChild(confirmMessage);
                    
                    setTimeout(() => {
                        confirmMessage.classList.add('fade-out');
                        setTimeout(() => {
                            document.body.removeChild(confirmMessage);
                        }, 500);
                    }, 2500);
                }
            });
        });
    }
    
    function formatSeries(series) {
        switch(series) {
            case '16-series': return 'iPhone 16 Series';
            case '15-series': return 'iPhone 15 Series';
            case '14-series': return 'iPhone 14 Series';
            case '13-series': return 'iPhone 13 Series';
            default: return 'iPhone';
        }
    }
    
    function filterProducts() {
        let filteredProducts = [...iphonePhones];
        
        // Filter by series
        if (currentSeries !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.series === currentSeries);
        }
        
        // Filter by price
        const minPrice = parseInt(minPriceInput.value);
        const maxPrice = parseInt(maxPriceInput.value);
        filteredProducts = filteredProducts.filter(product => 
            product.price >= minPrice && product.price <= maxPrice
        );
        
        // Filter by features
        const selectedFeatures = [];
        featureCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedFeatures.push(checkbox.value);
            }
        });
        
        if (selectedFeatures.length > 0) {
            filteredProducts = filteredProducts.filter(product => 
                selectedFeatures.every(feature => product.features.includes(feature))
            );
        }
        
        // Sort products
        const sortValue = sortSelect.value;
        switch(sortValue) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filteredProducts.reverse();
                break;
            default:
                break;
        }
        
        renderProducts(filteredProducts);
    }
    
    // Initialize the page
    filterProducts();
    updateCartCount();
}); 