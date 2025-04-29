document.addEventListener('DOMContentLoaded', function() {
    
    const navToggle = document.getElementById('navToggle');
    const navDropdown = document.getElementById('navDropdown');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navDropdown.classList.toggle('active');
        });
    }
    
    
    let cart = [];
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    const cartSummary = document.getElementById('cart-summary');
    const subtotalAmount = document.getElementById('subtotal-amount');
    const shippingAmount = document.getElementById('shipping-amount');
    const taxAmount = document.getElementById('tax-amount');
    const totalAmount = document.getElementById('total-amount');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartCount = document.getElementById('cart-count');
    
    
    if (localStorage.getItem('mofo-cart')) {
        try {
            cart = JSON.parse(localStorage.getItem('mofo-cart'));
            updateCartCount();
            renderCart();
        } catch (e) {
            console.error('Error loading cart from localStorage:', e);
            localStorage.removeItem('mofo-cart');
            showEmptyCart();
        }
    } else {
        showEmptyCart();
    }
    
    
    function updateCartCount() {
        if (cartCount) {
            cartCount.textContent = cart.length;
            
            if (cart.length === 0) {
                cartCount.style.display = 'none';
            } else {
                cartCount.style.display = 'flex';
            }
        }
    }
    
    
    function showEmptyCart() {
        if (cartEmptyMessage && cartItemsContainer && cartSummary) {
            cartEmptyMessage.style.display = 'block';
            cartItemsContainer.style.display = 'none';
            cartSummary.style.display = 'none';
        }
    }
    
    
    function renderCart() {
        if (!cartItemsContainer) return;
        
        if (cart.length === 0) {
            showEmptyCart();
            return;
        }
        
        
        cartEmptyMessage.style.display = 'none';
        cartItemsContainer.style.display = 'block';
        cartSummary.style.display = 'block';
        
        
        cartItemsContainer.innerHTML = '';
        
        
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h3 class="item-name">${item.name}</h3>
                    <div class="item-price">₹${item.price.toLocaleString()}</div>
                    <div class="item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn decrease" data-index="${index}">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="10" data-index="${index}">
                            <button class="quantity-btn increase" data-index="${index}">+</button>
                        </div>
                        <button class="remove-btn" data-index="${index}">
                            <i class="fa fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        
        document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    updateCart();
                }
            });
        });
        
        document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (cart[index].quantity < 10) {
                    cart[index].quantity++;
                    updateCart();
                }
            });
        });
        
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const quantity = parseInt(this.value);
                
                if (quantity >= 1 && quantity <= 10) {
                    cart[index].quantity = quantity;
                } else if (quantity < 1) {
                    cart[index].quantity = 1;
                    this.value = 1;
                } else if (quantity > 10) {
                    cart[index].quantity = 10;
                    this.value = 10;
                }
                
                updateCart();
            });
        });
        
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCart();
            });
        });
        
        
        updateSummary();
    }
    
    
    function updateCart() {
        localStorage.setItem('mofo-cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    }
    
    
    function updateSummary() {
        
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        
        const shipping = subtotal > 50000 ? 0 : 499;
        
        
        const tax = Math.round(subtotal * 0.18);
        
        
        const total = subtotal + shipping + tax;
        
        
        subtotalAmount.textContent = `₹${subtotal.toLocaleString()}`;
        shippingAmount.textContent = shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`;
        taxAmount.textContent = `₹${tax.toLocaleString()}`;
        totalAmount.textContent = `₹${total.toLocaleString()}`;
    }
    
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            alert('Proceeding to checkout...\nThis would normally redirect to a checkout page.');
            
        });
    }
});