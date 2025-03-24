document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    
    const searchItems = {
        'Samsung': ['Samsung S series', 'Samsung Z series', 'Samsung A series', 'Samsung M series'],
        'I-Phone': ['iPhone 13 series', 'iPhone 14 series', 'iPhone 15 series', 'iPhone 16 series'],
        'Asus': ['Zenfone', 'Asus ROG'],
        'Xiaomi': ['Redmi', 'Mi', 'Poco X series', 'Poco M series', 'Poco F series'],
        'Oneplus': ['Flagship series', 'Nord N series'],
        'Motorola': ['Moto G series', 'Edge series', 'Razr series']
    };
    const brands = Object.keys(searchItems);

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
                highlightNavItem(brand);
                const sectionId = getSectionId(brand);
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
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
            return brandName.toLowerCase().replace(' ', '-');
        }
    }
    
    function highlightNavItem(brandName) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            if (link.textContent === brandName) {
                link.classList.add('active');
            }
        });
    }
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            const brandName = this.textContent;
            searchInput.value = brandName;
            highlightNavItem(brandName);
            const sectionId = getSectionId(brandName);
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
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
});