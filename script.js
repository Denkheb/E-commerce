document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navDropdown = document.getElementById('navDropdown');
    const navLinks = document.querySelectorAll('.nav-links a');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const cartCount = document.getElementById('cart-count');
    
    const searchItems = {
        'Samsung': ['Samsung S series', 'Samsung Z series', 'Samsung A series', 'Samsung M series'],
        'I-Phone': ['iPhone 13 series', 'iPhone 14 series', 'iPhone 15 series', 'iPhone 16 series'],
        'Asus': ['Zenfone', 'Asus ROG'],
        'Xiaomi': ['Redmi', 'Mi', 'Poco X series', 'Poco M series', 'Poco F series'],
        'Oneplus': ['Flagship series', 'Nord N series'],
        'Motorola': ['Moto G series', 'Edge series', 'Razr series']
    };
    const brands = Object.keys(searchItems);

    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navDropdown.classList.toggle('active');
            this.classList.toggle('active');
            
            
            if (navDropdown.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    
    document.addEventListener('click', function(e) {
        if (navDropdown && navDropdown.classList.contains('active') && 
            !navDropdown.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navDropdown.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            
            if (window.innerWidth <= 768) {
                navDropdown.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }

            section.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });

            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    function levenshteinDistance(a, b) {
        const matrix = Array(b.length + 1).fill(null).map(() => 
            Array(a.length + 1).fill(null)
        );
        
        for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
        for (let j = 0; j <= b.length; j++) matrix[j][0] = j;
        
        for (let j = 1; j <= b.length; j++) {
            for (let i = 1; i <= a.length; i++) {
                const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
                matrix[j][i] = Math.min(
                    matrix[j][i - 1] + 1,
                    matrix[j - 1][i] + 1,
                    matrix[j - 1][i - 1] + indicator
                );
            }
        }
        return matrix[b.length][a.length];
    }

    function findCloseMatches(query, items, threshold = 2) {
        return items.filter(item => {
            const distance = levenshteinDistance(
                query.toLowerCase(), 
                item.toLowerCase()
            );
            return distance <= threshold;
        });
    }

    function showSearchResults(query) {
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
        
        if (!query.trim()) return;
        
        const trimmedQuery = query.trim().toLowerCase();
        let results = [];

        brands.forEach(brand => {
            const brandLower = brand.toLowerCase();
            if (brandLower.includes(trimmedQuery)) {
                results = results.concat(searchItems[brand]);
            } else {
                searchItems[brand].forEach(series => {
                    if (series.toLowerCase().includes(trimmedQuery)) {
                        results.push(series);
                    }
                });
            }
        });

        if (results.length === 0) {
            const allItems = brands.concat(...Object.values(searchItems));
            results = findCloseMatches(trimmedQuery, allItems);
            if (results.length > 0) {
                const suggestionText = results.length === 1 
                    ? 'Did you mean:'
                    : 'Did you mean one of these:';
                const suggestionDiv = document.createElement('div');
                suggestionDiv.className = 'search-result-item';
                suggestionDiv.textContent = suggestionText;
                suggestionDiv.style.fontStyle = 'italic';
                suggestionDiv.style.cursor = 'default';
                searchResults.appendChild(suggestionDiv);
            }
        }
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
            searchResults.style.display = 'block';
            return;
        }
        
        results.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.textContent = item;
            
            resultItem.addEventListener('click', function() {
                searchInput.value = item;
                searchResults.style.display = 'none';
                
                
                const brand = brands.find(b => searchItems[b].includes(item)) || item.split(' ')[0];
                const seriesMatch = item.match(/([A-Za-z]+)\s+([A-Za-z0-9]+)\s+series/i);
                let url = '';
                
                if (brand === 'Samsung') {
                    url = 'samsung.html';
                    if (seriesMatch && seriesMatch[2]) {
                        url += `?series=${seriesMatch[2].toLowerCase()}`;
                    }
                } else if (brand === 'I-Phone') {
                    url = 'iphone.html';
                    if (seriesMatch && seriesMatch[2]) {
                        url += `?series=${seriesMatch[2]}`;
                    }
                } else if (brand === 'Asus') {
                    url = 'asus.html';
                    if (item.toLowerCase().includes('rog')) {
                        url += '?series=rog';
                    } else if (item.toLowerCase().includes('zenfone')) {
                        url += '?series=zenfone';
                    }
                } else if (brand === 'Xiaomi') {
                    url = 'xiaomi.html';
                    if (item.toLowerCase().includes('redmi')) {
                        url += '?series=redmi';
                    } else if (item.toLowerCase().includes('mi')) {
                        url += '?series=mi';
                    } else if (item.toLowerCase().includes('poco x')) {
                        url += '?series=pocox';
                    } else if (item.toLowerCase().includes('poco m')) {
                        url += '?series=pocom';
                    } else if (item.toLowerCase().includes('poco f')) {
                        url += '?series=pocof';
                    }
                } else if (brand === 'Oneplus') {
                    url = 'oneplus.html';
                    if (item.toLowerCase().includes('flagship')) {
                        url += '?series=flagship';
                    } else if (item.toLowerCase().includes('nord')) {
                        url += '?series=nord';
                    }
                } else if (brand === 'Motorola') {
                    url = 'motorola.html';
                    if (item.toLowerCase().includes('moto g')) {
                        url += '?series=motog';
                    } else if (item.toLowerCase().includes('edge')) {
                        url += '?series=edge';
                    } else if (item.toLowerCase().includes('razr')) {
                        url += '?series=razr';
                    }
                } else {
                    
                    const sectionId = getSectionId(brand);
                    const element = document.getElementById(sectionId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        return;
                    }
                }
                
                if (url) {
                    window.location.href = url;
                }
            });
            
            searchResults.appendChild(resultItem);
        });
        
        searchResults.style.display = 'block';
    }
    
    function getSectionId(brandName) {
        if (brandName === 'Samsung') {
            return 'samsung-section';
        } else if (brandName === 'I-Phone') {
            return 'i-phone-section';
        } else {
            return brandName.toLowerCase().replace(' ', '-') + '-section';
        }
    }
    
    searchInput.addEventListener('input', function() {
        showSearchResults(this.value);
    });
    
    searchButton.addEventListener('click', function() {
        showSearchResults(searchInput.value);
    });
    
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && 
            !searchResults.contains(e.target) && 
            !searchButton.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            showSearchResults(this.value);
        }
    });
    
    
    if (cartCount) {
        
        if (localStorage.getItem('mofo-cart')) {
            try {
                const cart = JSON.parse(localStorage.getItem('mofo-cart'));
                cartCount.textContent = cart.length;
                
                
                if (cart.length > 0) {
                    cartCount.style.display = 'flex';
                } else {
                    cartCount.style.display = 'none';
                }
            } catch (e) {
                console.error('Error loading cart from localStorage:', e);
                localStorage.removeItem('mofo-cart');
                cartCount.style.display = 'none';
            }
        } else {
            cartCount.style.display = 'none';
        }
    }
    
    
    function setVhProperty() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVhProperty();
    window.addEventListener('resize', setVhProperty);
});