document.addEventListener('DOMContentLoaded', function() {
    
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
    let currentSeries = 'all';
    
    seriesLinks.forEach(link => {
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
    
    
    const samsungPhones = [
        {
            id: 1,
            name: "Samsung Galaxy S23 Ultra",
            series: "s-series",
            price: 124999,
            image: "brands/samsung/s23ultra.png",
            features: ["5g", "waterproof", "fastcharge"],
            specs: "200MP Camera, 12GB RAM, Snapdragon 8 Gen 2"
        },
        {
            id: 2,
            name: "Samsung Galaxy S23",
            series: "s-series",
            price: 74999,
            image: "brands/samsung/s23.png",
            features: ["5g", "waterproof", "fastcharge"],
            specs: "50MP Camera, 8GB RAM, Snapdragon 8 Gen 2"
        },
        {
            id: 3,
            name: "Samsung Galaxy Z Fold 5",
            series: "z-series",
            price: 154999,
            image: "brands/samsung/zfold5.png",
            features: ["5g", "fastcharge"],
            specs: "Foldable Display, 12GB RAM, Snapdragon 8 Gen 2"
        },
        {
            id: 4,
            name: "Samsung Galaxy Z Flip 5",
            series: "z-series",
            price: 99999,
            image: "brands/samsung/zflip5.png",
            features: ["5g", "fastcharge"],
            specs: "Flip Display, 8GB RAM, Snapdragon 8 Gen 2"
        },
        {
            id: 5,
            name: "Samsung Galaxy A54",
            series: "a-series",
            price: 38999,
            image: "brands/samsung/a54.jpg",
            features: ["5g", "waterproof"],
            specs: "50MP Camera, 8GB RAM, Exynos 1380"
        },
        {
            id: 6,
            name: "Samsung Galaxy A34",
            series: "a-series",
            price: 28999,
            image: "brands/samsung/a34.jpg",
            features: ["5g"],
            specs: "48MP Camera, 8GB RAM, Dimensity 1080"
        },
        {
            id: 7,
            name: "Samsung Galaxy A14",
            series: "a-series",
            price: 14999,
            image: "brands/samsung/a14.png",
            features: ["5g"],
            specs: "50MP Camera, 4GB RAM, Dimensity 700"
        },
        {
            id: 8,
            name: "Samsung Galaxy M34",
            series: "m-series",
            price: 18999,
            image: "brands/samsung/m34.jpg",
            features: ["5g", "fastcharge"],
            specs: "50MP Camera, 6GB RAM, Exynos 1280"
        },
        {
            id: 9,
            name: "Samsung Galaxy M14",
            series: "m-series",
            price: 13999,
            image: "brands/samsung/m14.png",
            features: ["5g"],
            specs: "50MP Camera, 4GB RAM, Exynos 1330"
        },
        {
            id: 10,
            name: "Samsung Galaxy Z Flip 6",
            series: "z-series",
            price: 154999,
            image: "brands/samsung/zflip6.jpg",
            features: ["5g", "fastcharge"],
            specs: "Flip Display, 8GB RAM, Snapdragon 8 Gen 2"
        },
        {
            id: 11,
            name: "Samsung Galaxy S24 Ultra",
            series: "f-series",
            price: 199999,
            image: "brands/samsung/s24ultra.jpg",
            features: ["5g", "waterproof", "fastcharge"],
            specs: "200MP Camera, 16GB RAM, Snapdragon 8 Gen 3"
        },
        {
            id: 12,
            name: "Samsung Galaxy S22 Ultra",
            series: "s-series",
            price: 99999,
            image: "brands/samsung/s22ultra.jpg",
            features: ["5g", "waterproof", "fastcharge"],
            specs: "108MP Camera, 12GB RAM, Snapdragon 8 Gen 1"
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
                        <p class="product-specs">${product.specs}</p>
                        <button class="buy-btn">Buy Now</button>
                    </div>
                </div>
            `;
            
            productsContainer.innerHTML += productCard;
        });
        
        
        document.querySelectorAll('.buy-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.closest('.product-card').getAttribute('data-id'));
                const product = samsungPhones.find(p => p.id === productId);
                
                if (product) {
                    addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1
                    });
                    
                    
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
            case 's-series': return 'Galaxy S Series';
            case 'z-series': return 'Galaxy Z Series';
            case 'a-series': return 'Galaxy A Series';
            case 'm-series': return 'Galaxy M Series';
            case 'f-series': return 'Galaxy F Series';
            default: return 'Samsung Galaxy';
        }
    }
    
    
    function filterProducts() {
        let filteredProducts = [...samsungPhones];
        
        
        if (currentSeries !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.series === currentSeries);
        }
        
        
        const minPrice = parseInt(minPriceInput.value);
        const maxPrice = parseInt(maxPriceInput.value);
        filteredProducts = filteredProducts.filter(product => 
            product.price >= minPrice && product.price <= maxPrice
        );
        
        
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
    
    
    filterProducts();
    
    
    updateCartCount();
});