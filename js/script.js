let currentMenu = "restaurant";
let cart = [];

const menuGrid = document.getElementById("menuGrid");
const searchInput = document.getElementById("searchInput");

const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const whatsappOrder = document.getElementById("whatsappOrder");

const tabs = document.querySelectorAll(".tab");

/* -------------------------
   TABLE DETECTION
------------------------- */

const params = new URLSearchParams(window.location.search);
const urlTable = params.get("table");

function normalizeTable(raw) {
    if (!raw) return "";
    return String(raw).trim().replace(/^#/, "");
}

if (urlTable) {
    sessionStorage.setItem("biteTable", normalizeTable(urlTable));
}

function getTableNumber() {
    const stored = sessionStorage.getItem("biteTable") || urlTable || "";
    return normalizeTable(stored);
}

function formatTableHash(num) {
    const n = normalizeTable(num);
    return n ? `#${n}` : "";
}

function hasTableFromScan() {
    return Boolean(getTableNumber());
}

function updateTableUI() {
    const num = getTableNumber();
    const hash = formatTableHash(num);
    const hasTable = Boolean(num);

    const navBadge = document.getElementById("navTableBadge");
    const heroPill = document.getElementById("heroTablePill");
    const cartLine = document.getElementById("cartTableLine");

    [navBadge, heroPill, cartLine].forEach(el => {
        if (el) el.classList.toggle("is-hidden", !hasTable);
    });

    if (!hasTable) return;

    const label = `Table ${hash}`;
    const cartLabel = `Ordering from Table ${hash}`;

    const tableLabel = document.getElementById("tableLabel");
    const heroTableText = document.getElementById("heroTableText");

    if (tableLabel) tableLabel.textContent = label;
    if (heroTableText) heroTableText.textContent = label;
    if (cartLine) cartLine.textContent = cartLabel;
}

updateTableUI();

/* -------------------------
   ANIMATION HELPER FUNCTIONS
------------------------- */

// Add to cart animation (bounce + ripple effect)
function animateAddToCart(buttonElement) {
    // Ripple effect
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.top = '50%';
    ripple.style.left = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.pointerEvents = 'none';
    ripple.style.transition = 'all 0.5s ease';
    buttonElement.style.position = 'relative';
    buttonElement.style.overflow = 'hidden';
    buttonElement.appendChild(ripple);
    
    setTimeout(() => {
        ripple.style.width = '200px';
        ripple.style.height = '200px';
        ripple.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
        ripple.remove();
    }, 500);
    
    // Bounce animation on button
    buttonElement.style.animation = 'bounceIn 0.4s ease';
    setTimeout(() => {
        buttonElement.style.animation = '';
    }, 400);
    
    // Cart counter bounce
    const cartCountElement = document.getElementById('cartCount');
    cartCountElement.style.animation = 'pulse 0.4s ease';
    setTimeout(() => {
        cartCountElement.style.animation = '';
    }, 400);
    
    // Floating number effect
    const floatingNumber = document.createElement('div');
    floatingNumber.textContent = '+1';
    floatingNumber.style.position = 'fixed';
    floatingNumber.style.color = '#ff7b00';
    floatingNumber.style.fontWeight = 'bold';
    floatingNumber.style.fontSize = '20px';
    floatingNumber.style.pointerEvents = 'none';
    floatingNumber.style.zIndex = '10001';
    floatingNumber.style.textShadow = '0 0 5px rgba(0,0,0,0.5)';
    
    const rect = buttonElement.getBoundingClientRect();
    floatingNumber.style.left = rect.left + rect.width / 2 + 'px';
    floatingNumber.style.top = rect.top + 'px';
    
    document.body.appendChild(floatingNumber);
    
    floatingNumber.style.animation = 'floatUpFade 0.8s ease forwards';
    
    setTimeout(() => {
        floatingNumber.remove();
    }, 800);
}

// Animate cart item removal/addition
function animateCartItem(element, isAdding = true) {
    if (isAdding) {
        element.style.animation = 'slideInRight 0.4s ease';
        setTimeout(() => {
            element.style.animation = '';
        }, 400);
    } else {
        element.style.animation = 'fadeOutRight 0.3s ease forwards';
    }
}

// Animate cart total update
function animateTotalUpdate() {
    const totalElement = document.getElementById('cartTotal');
    totalElement.style.animation = 'pulse 0.3s ease';
    setTimeout(() => {
        totalElement.style.animation = '';
    }, 300);
}

// Shake animation for empty cart
function shakeCart() {
    const cartDrawer = document.getElementById('cartDrawer');
    cartDrawer.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        cartDrawer.style.animation = '';
    }, 500);
}

// Add CSS animations to document
function addAnimationStyles() {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
        @keyframes bounceIn {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
        }
        
        @keyframes floatUpFade {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-80px) scale(1.5);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(50px);
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        
        @keyframes glowFlash {
            0% { box-shadow: 0 0 0 0 rgba(255, 123, 0, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(255, 123, 0, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 123, 0, 0); }
        }
        
        @keyframes highlightItem {
            0% {
                background: rgba(255, 123, 0, 0);
                border-color: transparent;
            }
            50% {
                background: rgba(255, 123, 0, 0.2);
                border-color: #ff7b00;
            }
            100% {
                background: rgba(255, 123, 0, 0);
                border-color: transparent;
            }
        }
        
        @keyframes rotateIn {
            from {
                opacity: 0;
                transform: rotate(-180deg) scale(0.5);
            }
            to {
                opacity: 1;
                transform: rotate(0) scale(1);
            }
        }
        
        .menu-card {
            animation: fadeInUp 0.5s ease backwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

// Call this once when page loads
addAnimationStyles();

/* -------------------------
   RENDER MENU
------------------------- */

function renderMenu(searchTerm = "") {
    menuGrid.innerHTML = "";
    
    // Add loading animation
    menuGrid.classList.add('loading');
    
    setTimeout(() => {
        let items = menuData[currentMenu];
        
        if (searchTerm) {
            items = items.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        items.forEach((item, index) => {
            const card = document.createElement("div");
            card.className = "menu-card";
            card.style.animationDelay = `${index * 0.03}s`;
            
            card.innerHTML = `
                <img
                    src="${item.image}"
                    class="menu-image"
                    alt="${item.name}"
                >
                <div class="menu-content">
                    <div class="menu-title">
                        ${item.name}
                    </div>
                    <div class="menu-price">
                        ₹${item.price}
                    </div>
                    <button class="add-btn">Add</button>
                </div>
            `;
            
            const addBtn = card.querySelector(".add-btn");
            syncAddButton(addBtn, item.name);
            addBtn.addEventListener("click", () => {
                const inCart = cart.some(c => c.name === item.name);
                if (inCart) {
                    openCart();
                    return;
                }
                animateAddToCart(addBtn);
                addToCart(item);
                syncAddButton(addBtn, item.name);
                card.style.animation = "highlightItem 0.5s ease";
                setTimeout(() => { card.style.animation = ""; }, 500);
            });
            
            menuGrid.appendChild(card);
        });
        
        menuGrid.classList.remove('loading');
    }, 50);
}

/* -------------------------
   TABS
------------------------- */

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        // Animate tab click
        tab.style.animation = 'bounceIn 0.3s ease';
        setTimeout(() => {
            tab.style.animation = '';
        }, 300);
        
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        
        // Animate menu grid fade out/in
        menuGrid.style.opacity = '0';
        menuGrid.style.transform = 'scale(0.95)';
        menuGrid.style.transition = 'all 0.2s ease';
        
        setTimeout(() => {
            currentMenu = tab.dataset.menu;
            renderMenu(searchInput.value);
            
            setTimeout(() => {
                menuGrid.style.opacity = '1';
                menuGrid.style.transform = 'scale(1)';
            }, 50);
        }, 150);
    });
});

/* -------------------------
   SEARCH
------------------------- */

let searchTimeout;
searchInput.addEventListener("input", e => {
    clearTimeout(searchTimeout);
    
    searchTimeout = setTimeout(() => {
        menuGrid.style.opacity = '0.5';
        menuGrid.style.transition = 'opacity 0.2s ease';
        
        renderMenu(e.target.value);
        
        setTimeout(() => {
            menuGrid.style.opacity = '1';
        }, 100);
    }, 300);
});

/* -------------------------
   CART
------------------------- */

function syncAddButton(btn, itemName) {
    const existing = cart.find(c => c.name === itemName);
    if (existing) {
        btn.textContent = `In Cart (${existing.qty}) · View`;
        btn.classList.add("in-cart");
    } else {
        btn.textContent = "Add";
        btn.classList.remove("in-cart");
    }
}

function syncAllAddButtons() {
    document.querySelectorAll(".menu-card").forEach(card => {
        const title = card.querySelector(".menu-title")?.textContent;
        const btn = card.querySelector(".add-btn");
        if (title && btn) syncAddButton(btn, title);
    });
}

function addToCart(item) {
    const existing = cart.find(c => c.name === item.name);

    if (existing) {
        existing.qty++;
        highlightCartItem(item.name);
    } else {
        cart.push({ ...item, qty: 1 });
        const cartIcon = document.getElementById("cartCount");
        if (cartIcon) {
            cartIcon.style.animation = "rotateIn 0.4s ease";
            setTimeout(() => { cartIcon.style.animation = ""; }, 400);
        }
    }

    updateCart();
    syncAllAddButtons();
}

function highlightCartItem(itemName) {
    const cartItemElements = document.querySelectorAll('.cart-item');
    cartItemElements.forEach(element => {
        if (element.querySelector('h4')?.textContent === itemName) {
            element.style.animation = 'highlightItem 0.5s ease';
            setTimeout(() => {
                element.style.animation = '';
            }, 500);
        }
    });
}

function increaseQty(name) {
    const item = cart.find(c => c.name === name);
    if (item) {
        item.qty++;
        updateCart();
        
        // Animate the increase button
        const buttons = document.querySelectorAll('.cart-item button');
        buttons.forEach(btn => {
            if (btn.textContent === '+') {
                btn.style.animation = 'bounceIn 0.2s ease';
                setTimeout(() => {
                    btn.style.animation = '';
                }, 200);
            }
        });
    }
}

function decreaseQty(name) {
    const item = cart.find(c => c.name === name);
    if (!item) return;
    
    item.qty--;
    
    if (item.qty <= 0) {
        const cartItemElements = document.querySelectorAll(".cart-item");
        for (let element of cartItemElements) {
            if (element.querySelector("h4")?.textContent === name) {
                animateCartItem(element, false);
                setTimeout(() => {
                    cart = cart.filter(c => c.name !== name);
                    updateCart();
                    syncAllAddButtons();
                }, 300);
                return;
            }
        }
    }

    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    let count = 0;
    
    cart.forEach((item, index) => {
        total += item.price * item.qty;
        count += item.qty;
        
        const div = document.createElement("div");
        div.className = "cart-item";
        div.style.animationDelay = `${index * 0.05}s`;
        
        div.innerHTML = `
            <h4>${item.name}</h4>
            <p>₹${item.price}</p>
            <div style="display:flex; gap:10px; margin-top:10px; align-items:center;">
                <button onclick="decreaseQty('${item.name.replace(/'/g, "\\'")}')">-</button>
                <span>${item.qty}</span>
                <button onclick="increaseQty('${item.name.replace(/'/g, "\\'")}')">+</button>
            </div>
        `;
        
        cartItems.appendChild(div);
    });
    
    // Animate total update
    if (cartTotal.textContent != total) {
        animateTotalUpdate();
    }
    
    cartTotal.textContent = total;
    cartCount.textContent = count;
    cartCount.dataset.count = count;

    const cartButton = document.getElementById("cartBtn");
    if (cartButton) {
        cartButton.classList.toggle("has-items", count > 0);
        cartButton.style.animation = "pulse 0.3s ease";
        setTimeout(() => { cartButton.style.animation = ""; }, 300);
    }

    syncAllAddButtons();
}

/* -------------------------
   CART OPEN/CLOSE
------------------------- */

const cartOverlay = document.getElementById("cartOverlay");

function openCart() {
    if (!cartDrawer) return;
    cartDrawer.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    if (cartOverlay) {
        cartOverlay.classList.add("open");
        cartOverlay.setAttribute("aria-hidden", "false");
    }
    document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
    if (!cartDrawer) return;
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    if (cartOverlay) {
        cartOverlay.classList.remove("open");
        cartOverlay.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
}

if (cartBtn) {
    cartBtn.addEventListener("click", () => openCart());
}

if (closeCart) {
    closeCart.addEventListener("click", () => closeCartDrawer());
}

if (cartOverlay) {
    cartOverlay.addEventListener("click", () => closeCartDrawer());
}

/* -------------------------
   WHATSAPP ORDER
------------------------- */

whatsappOrder.addEventListener("click", () => {
    if (cart.length === 0) {
        // Animate empty cart warning
        const cartFooter = document.querySelector('.cart-footer');
        cartFooter.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            cartFooter.style.animation = '';
        }, 500);
        
        // Visual feedback
        const tempMsg = document.createElement('div');
        tempMsg.textContent = 'Cart is empty! 🛒';
        tempMsg.style.position = 'fixed';
        tempMsg.style.bottom = '100px';
        tempMsg.style.left = '50%';
        tempMsg.style.transform = 'translateX(-50%)';
        tempMsg.style.background = '#ff7b00';
        tempMsg.style.color = 'white';
        tempMsg.style.padding = '10px 20px';
        tempMsg.style.borderRadius = '50px';
        tempMsg.style.zIndex = '10001';
        tempMsg.style.fontWeight = 'bold';
        tempMsg.style.animation = 'floatUpFade 2s ease forwards';
        tempMsg.style.pointerEvents = 'none';
        
        document.body.appendChild(tempMsg);
        
        setTimeout(() => {
            tempMsg.remove();
        }, 2000);
        
        return;
    }
    
    // Animate order button
    whatsappOrder.style.animation = 'pulse 0.5s ease';
    setTimeout(() => {
        whatsappOrder.style.animation = '';
    }, 500);
    
    const notes = document.getElementById("customerNotes").value;
    let total = 0;
    let orderLines = "";
    
    cart.forEach(item => {
        total += item.price * item.qty;
        orderLines += `${item.qty} x ${item.name} - ₹${item.price * item.qty}\n`;
    });
    
    const now = new Date();
    const timestamp = now.toLocaleString();
    
    const tableHash = formatTableHash(getTableNumber());
    if (!tableHash) {
        const warn = "Please scan the QR code on your table to order";
        if (typeof showToast === "function") {
            showToast(warn, true);
        } else {
            alert(warn);
        }
        return;
    }

    const message = `🍽️ *NEW ORDER — Bite & Bounce*

🪑 *ORDER FROM TABLE ${tableHash}*

🕒 ${timestamp}

━━━━━━━━━━━━━━━━
${orderLines}━━━━━━━━━━━━━━━━

💰 *Total: ₹${total}*

📝 Notes: ${notes || "None"}

— Sent via table QR menu`;

    const phone = "9912366665";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    
    // Success animation before redirect
    const successFlash = document.createElement('div');
    successFlash.style.position = 'fixed';
    successFlash.style.top = '0';
    successFlash.style.left = '0';
    successFlash.style.width = '100%';
    successFlash.style.height = '100%';
    successFlash.style.backgroundColor = 'rgba(37, 211, 102, 0.3)';
    successFlash.style.zIndex = '99999';
    successFlash.style.pointerEvents = 'none';
    successFlash.style.animation = 'fadeOutUp 0.6s ease forwards';
    
    document.body.appendChild(successFlash);
    
    setTimeout(() => {
        successFlash.remove();
        window.open(url, "_blank");
    }, 300);
});

// Add fadeOutUp animation
const extraStyle = document.createElement('style');
extraStyle.textContent = `
    @keyframes fadeOutUp {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(extraStyle);

/* -------------------------
   CART DRAWER BACKDROP CLICK
------------------------- */

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cartDrawer?.classList.contains("open")) {
        closeCartDrawer();
    }
});

/* -------------------------
   HERO SECTION ENHANCEMENTS
------------------------- */

function enhanceHeroCards() {
    /* hero pick clicks handled in index.html initHeroEnhancements */
}

function animatePrices() {
    const priceElements = document.querySelectorAll('.hero-price');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const priceElement = entry.target;
                const finalPrice = parseInt(priceElement.textContent.replace('₹', ''));
                let currentPrice = 0;
                const duration = 1000;
                const stepTime = 20;
                const steps = duration / stepTime;
                const increment = finalPrice / steps;
                
                const timer = setInterval(() => {
                    currentPrice += increment;
                    if (currentPrice >= finalPrice) {
                        priceElement.textContent = `₹${finalPrice}`;
                        clearInterval(timer);
                    } else {
                        priceElement.textContent = `₹${Math.floor(currentPrice)}`;
                    }
                }, stepTime);
                
                observer.unobserve(priceElement);
            }
        });
    }, { threshold: 0.5 });
    
    priceElements.forEach(price => observer.observe(price));
}

function initHeroAnimations() {
    enhanceHeroCards();
    animatePrices();
    
    // Add scroll reveal animation
    const hero = document.querySelector('.hero');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }
}

/* -------------------------
   INITIAL LOAD ANIMATION
------------------------- */

// Animate hero cards on load
window.addEventListener('load', () => {
    const heroCard = document.getElementById('heroCard');
    if (heroCard) {
        heroCard.style.animation = 'cardEnter 0.65s cubic-bezier(0.22, 1, 0.36, 1) backwards';
    }
    
    // Animate tabs
    const tabButtons = document.querySelectorAll('.tab');
    tabButtons.forEach((tab, index) => {
        tab.style.animation = 'fadeInDown 0.4s ease backwards';
        tab.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add fadeInDown keyframes if not exists
    if (!document.querySelector('#fadeInDownStyle')) {
        const fadeStyle = document.createElement('style');
        fadeStyle.id = 'fadeInDownStyle';
        fadeStyle.textContent = `
            @keyframes fadeInDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(fadeStyle);
    }
    
    // Initialize hero animations
    initHeroAnimations();
});

/* -------------------------
   INITIAL RENDER
------------------------- */
renderMenu();