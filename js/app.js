/**
 * Cafe Coffee Delight — Premium Digital Menu (Frontend Only)
 */

const CONFIG = {
  restaurantName: "Cafe Coffee Delight",
  tagline: "Sip, Savour, Smile",
  whatsappPhone: "9390952712",
  gstRate: 0.05,
  popularItems: [
    "Cappuccino",
    "Cold Coffee",
    "Paneer Sandwich",
    "Penne Pasta Veg (Arrabiata)",
    "Blueberry Cheesecake (Slice)"
  ],
  heroBg: "", // custom URL
  heroLayout: {
    blocks: []
  },
  offers: [
    { icon: "🎉", title: "15% off", desc: "Orders above ₹400" },
    { icon: "☕", title: "Free Cookie", desc: "With any Large Cappuccino" }
  ]
};

const CATEGORIES = [
    { id: "all",               label: "All",                 icon: "☕", match: null },
    { id: "hot-coffee",        label: "Hot Coffee",          icon: "☕", match: ["Hot Coffee"] },
    { id: "cold-coffee",       label: "Cold Coffee",         icon: "🧊", match: ["Cold Coffee"] },
    { id: "blend-brews",       label: "Blend Brews",         icon: "🥤", match: ["Blend Brews"] },
    { id: "special-drinks",    label: "Special Drinks",      icon: "🥛", match: ["Special Drinks"] },
    { id: "tea-infusions",     label: "Tea & Infusions",     icon: "🍵", match: ["Tea & Infusions"] },
    { id: "milk-shakes",       label: "Milk Shakes",         icon: "🍦", match: ["Milk Shakes"] },
    { id: "smoothies",         label: "Smoothies",           icon: "🫐", match: ["Smoothies"] },
    { id: "lassi",             label: "Lassi",               icon: "🥛", match: ["Lassi"] },
    { id: "mocktails-drinks",  label: "Mocktails & Drinks",  icon: "🍹", match: ["Mocktails & Drinks"] },
    { id: "omelette",          label: "Omelette",            icon: "🍳", match: ["Omelette"] },
    { id: "maggi",             label: "Maggi",               icon: "🍜", match: ["Maggi"] },
    { id: "sandwiches",        label: "Sandwiches & Paninis",icon: "🥪", match: ["Sandwiches & Paninis"] },
    { id: "rolls",             label: "Rolls",               icon: "🌯", match: ["Rolls"] },
    { id: "waffles-pancakes",  label: "Waffles & Pancakes",  icon: "🧇", match: ["Waffles & Pancakes"] },
    { id: "fried-food",        label: "Fried Food",          icon: "🍟", match: ["Fried Food"] },
    { id: "sides-snacks",      label: "Sides & Snacks",      icon: "🍿", match: ["Sides & Snacks"] },
    { id: "fried-chicken",     label: "Fried Chicken",       icon: "🍗", match: ["Fried Chicken"] },
    { id: "momos-samosa",      label: "Momo's & Samosa",     icon: "🥟", match: ["Momo's & Samosa"] },
    { id: "pasta-pizza",       label: "Pasta & Pizza",       icon: "🍕", match: ["Pasta & Pizza"] },
    { id: "burgers",           label: "Burgers",             icon: "🍔", match: ["Burgers"] },
    { id: "desserts",          label: "Desserts",            icon: "🍰", match: ["Desserts"] },
    { id: "ice-creams",        label: "Ice Creams",          icon: "🍨", match: ["Ice Creams"] },
    { id: "combo-offers",      label: "Combo Offers",        icon: "🎁", match: ["Combo Offers"] },
];

// Dynamic Custom Theme Color Application
function applyCustomThemeColor(hex) {
    if (!hex || !/^#[0-9A-F]{6}$/i.test(hex)) return;
    let styleEl = document.getElementById("customThemeStyle");
    if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = "customThemeStyle";
        document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = `
        :root {
            --primary: ${hex} !important;
            --primary-dark: ${hex}cc !important;
            --primary-light: ${hex}dd !important;
            --primary-dim: ${hex}14 !important;
            --primary-glow: ${hex}38 !important;
            --gradient-gold: linear-gradient(135deg, ${hex} 0%, ${hex} 45%, ${hex}cc 100%) !important;
            --border: ${hex}20 !important;
        }
        [data-theme="light"] {
            --primary-dim: ${hex}0a !important;
            --primary-glow: ${hex}22 !important;
            --border: ${hex}26 !important;
        }
        [data-theme="dark"] {
            --primary-dim: ${hex}26 !important;
            --primary-glow: ${hex}66 !important;
            --border: ${hex}2e !important;
        }
    `;
}

// Apply theme colour from localStorage (runs sync on load)
function loadThemeColor() {
    const savedColor = localStorage.getItem("cafeCustomThemeColor");
    if (savedColor) applyCustomThemeColor(savedColor);
}
loadThemeColor();

/* ===== SUPABASE CACHE ===== */
let menuItemsCache = null; // populated by loadDataFromSupabase()

function mergeMenuItems(remoteItems = [], localItems = []) {
    const merged = new Map();
    remoteItems.forEach(item => merged.set(item.name, item));
    localItems.forEach((item, index) => {
        if (!merged.has(item.name)) {
            merged.set(item.name, {
                ...item,
                sort_order: remoteItems.length + index
            });
        }
    });
    return Array.from(merged.values());
}

async function loadDataFromSupabase() {
    try {
        // 1. Load config from Supabase
        const remoteConfig = await sbGetConfig();
        if (remoteConfig) {
            Object.assign(CONFIG, remoteConfig);
        }

        // 2. Load category overrides from Supabase
        const catOverrides = await sbGetCategoryOverrides();
        CATEGORIES.forEach(cat => {
            if (catOverrides[cat.id]) cat.label = catOverrides[cat.id];
        });

        // 3. Load menu items from Supabase
        let items = await sbGetMenuItems();
        if (!items || items.length === 0) {
            // First-time setup: seed from local data
            await sbSeedMenuIfEmpty(menuData.restaurant);
            items = await sbGetMenuItems();
        }
        menuItemsCache = mergeMenuItems(items || [], menuData.restaurant || []);
    } catch (e) {
        console.error('Supabase load failed, using local data:', e);
        menuItemsCache = menuData.restaurant;
    }
}

/* ===== STATE ===== */
let currentMenu = "restaurant";
let activeCategory = "all";
let cart = [];
let searchTerm = "";
let modalItem = null;
let modalQty = 1;

/* ===== TABLE (QR scan only) ===== */
const urlParams = new URLSearchParams(window.location.search);
const urlTable = urlParams.get("table");

function normalizeTable(raw) {
    if (!raw) return "";
    return String(raw).trim().replace(/^#/, "");
}

if (urlTable) sessionStorage.setItem("biteTable", normalizeTable(urlTable));

function getTableNumber() {
    return normalizeTable(sessionStorage.getItem("biteTable") || urlTable || "");
}

function formatTableHash(n) {
    const t = normalizeTable(n);
    return t ? `#${t}` : "";
}

function updateTableUI() {
    const hash = formatTableHash(getTableNumber());
    const has = Boolean(hash);
    document.body.classList.toggle("has-table", has);
    ["navTableBadge", "cartTableLine"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle("is-hidden", !has);
    });
    const label = document.getElementById("tableLabel");
    const cartLine = document.getElementById("cartTableLine");
    if (label && has) label.textContent = `Table ${hash}`;
    if (cartLine && has) cartLine.textContent = `Ordering from Table ${hash}`;
}

/* ===== HELPERS ===== */
function $(id) { return document.getElementById(id); }

function clamp(value, min, max) {
    const num = Number(value);
    if (Number.isNaN(num)) return min;
    return Math.min(max, Math.max(min, num));
}

function showToast(msg, isError = false) {
    const c = $("toastContainer");
    if (!c) return;
    const t = document.createElement("div");
    t.className = "toast" + (isError ? " error" : "");
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => t.remove(), 2800);
}

function isVegItem(item) {
    const n = item.name.toLowerCase();
    if (n.includes("chicken") || n.includes("pepperoni")) return false;
    return true;
}

const INGREDIENT_MAP = {
    "Hot Coffee": "Freshly brewed espresso, steamed milk, froth",
    "Cold Coffee": "Chilled coffee brew, milk, ice, sweetener",
    "Tea & Infusions": "Premium tea leaves, hot water, milk or herbs",
    "Sandwiches & Paninis": "Grilled bread, fresh veggies or chicken, cheese, house spreads",
    "Pasta & Pizza": "Durum wheat pasta, hand-tossed crust, rich sauces, mozzarella",
    "Sides & Snacks": "Crispy golden sides, house seasoning, dipping sauces",
    "Desserts": "Baked fresh daily, premium chocolates, creams",
    "Mocktails & Shakes": "Chilled juices, soda, milk blends, premium syrups",
    "Combo Offers": "Curated value combo with popular food and drink pairings"
};

function enrichItem(item) {
    const veg = isVegItem(item);
    const hash = item.name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return {
        ...item,
        isVeg: veg,
        description: `Fresh ${item.category.toLowerCase()} · made to order`,
        ingredients: INGREDIENT_MAP[item.category] || "Fresh ingredients · house recipe",
        rating: (4.2 + (hash % 8) / 10).toFixed(1),
        reviews: 40 + (hash % 180),
        prepTime: "15–20 min",
        popular: CONFIG.popularItems.some(p => item.name.includes(p) || p.includes(item.name))
    };
}

function getItems() {
    // Use Supabase cache if loaded, else fall back to local data
    const source = (menuItemsCache && menuItemsCache.length)
        ? menuItemsCache
        : (menuData.restaurant || []);
    return source.map(enrichItem);
}

function getCategories() {
    return CATEGORIES;
}

function filterItems(items) {
    let list = items;
    const cat = getCategories().find(c => c.id === activeCategory);
    if (cat && cat.id !== "all" && cat.match) {
        list = list.filter(i => cat.match.includes(i.category));
    }
    if (searchTerm) {
        const q = searchTerm.toLowerCase();
        list = list.filter(i =>
            i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
        );
    }
    return list;
}

/* ===== WELCOME ===== */
function initWelcome() {
    const splash = $("welcomeSplash");
    const shell = $("appShell");
    const particles = $("welcomeParticles");
    const sparks = $("welcomeSparks");
    
    if (particles) {
        for (let i = 0; i < 10; i++) {
            const p = document.createElement("span");
            p.className = "welcome-particle";
            p.style.top = 15 + Math.random() * 70 + "%";
            p.style.left = i % 2 === 0 ? "-5%" : "105%";
            p.style.setProperty("--from-x", i % 2 === 0 ? "70vw" : "-70vw");
            p.style.animationDelay = i * 0.1 + "s";
            if (i % 3 === 0) {
                p.style.width = "3px";
                p.style.height = "3px";
                p.style.opacity = "0.7";
            }
            particles.appendChild(p);
        }
    }

    if (sparks) {
        for (let i = 0; i < 12; i++) {
            const s = document.createElement("span");
            s.className = "welcome-spark";
            s.style.left = Math.random() * 100 + "%";
            s.style.top = Math.random() * 100 + "%";
            s.style.animationDelay = 0.3 + Math.random() * 1.2 + "s";
            sparks.appendChild(s);
        }
    }

    setTimeout(() => {
        splash?.classList.add("is-done");
        shell?.classList.remove("is-welcome");
        shell?.classList.add("is-ready");
        splash?.setAttribute("aria-hidden", "true");
    }, 2600);
}

/* ===== HEADER ===== */
function initHeader() {
    const header = $("mainHeader");
    window.addEventListener("scroll", () => {
        header?.classList.toggle("is-scrolled", window.scrollY > 20);
    }, { passive: true });

    document.querySelectorAll(".venue-pill").forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.dataset.menu === currentMenu) return;
            document.querySelectorAll(".venue-pill").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentMenu = btn.dataset.menu;
            activeCategory = "all";
            renderCategories();
            renderMenu();
            renderAlsoBuy();
            window.scrollTo({ top: $("venueNav")?.offsetTop || 0, behavior: "smooth" });
        });
    });

    $("themeToggle")?.addEventListener("click", () => {
        const html = document.documentElement;
        const next = html.dataset.theme === "dark" ? "light" : "dark";
        html.dataset.theme = next;
        $("themeToggle").textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("biteTheme", next);
        updateThemeMeta(next);
    });

    const saved = localStorage.getItem("biteTheme");
    if (saved) {
        document.documentElement.dataset.theme = saved;
        if ($("themeToggle")) $("themeToggle").textContent = saved === "dark" ? "🌙" : "☀️";
        updateThemeMeta(saved);
    }

    $("searchInput")?.addEventListener("input", e => {
        searchTerm = e.target.value;
        renderMenu();
        
        // Auto-scroll to menu results when searching
        if (searchTerm.trim()) {
            setTimeout(() => {
                const menuGrid = $("menuGrid");
                const header = $("mainHeader");
                if (menuGrid) {
                    const headerHeight = header?.offsetHeight || 0;
                    const offset = headerHeight + 12;
                    const top = menuGrid.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
                }
            }, 150);
        }
    });

    $("headerCartBtn")?.addEventListener("click", openCart);
    $("floatCartBtn")?.addEventListener("click", openCart);

    const heroBg = document.querySelector(".hero-clean-bg img");
    window.addEventListener("scroll", () => {
        if (!heroBg) return;
        const y = Math.min(window.scrollY * 0.2, 40);
        heroBg.style.transform = `scale(1.08) translateY(${y * 0.3}px)`;
    }, { passive: true });
}

/* ===== CATEGORIES ===== */
function renderCategories() {
    const nav = $("categoryNav");
    if (!nav) return;
    nav.innerHTML = getCategories().map(c =>
        `<button type="button" class="cat-pill${c.id === activeCategory ? " active" : ""}" data-cat="${c.id}">${c.icon || ""} ${c.label}</button>`
    ).join("");
    nav.querySelectorAll(".cat-pill").forEach(p => {
        p.addEventListener("click", () => {
            activeCategory = p.dataset.cat;
            renderCategories();
            renderMenu();
            p.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
            setTimeout(() => {
                const menuTop = $("menuGrid");
                const navBar = document.querySelector(".category-nav");
                if (!menuTop) return;
                const offset = (navBar?.offsetHeight || 0) + 8;
                const top = menuTop.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
            }, 150);
        });
    });
}

/* ===== MENU RENDER ===== */
function showSkeleton(show) {
    $("menuSkeleton")?.classList.toggle("is-hidden", !show);
    $("menuGrid")?.classList.toggle("is-hidden", show);
    if (show && $("menuSkeleton")) {
        $("menuSkeleton").innerHTML = Array(6).fill('<div class="skeleton-card"></div>').join("");
    }
}

function renderMenu() {
    showSkeleton(true);
    setTimeout(() => {
        const items = filterItems(getItems());
        const grid = $("menuGrid");
        const empty = $("menuEmpty");
        if (!grid) return;

        if (!items.length) {
            grid.innerHTML = "";
            empty?.classList.remove("is-hidden");
            showSkeleton(false);
            return;
        }
        empty?.classList.add("is-hidden");

        const showSections = activeCategory === "all" && !searchTerm;
        let html = "";
        let idx = 0;

        if (showSections) {
            const byCat = {};
            items.forEach(i => {
                if (!byCat[i.category]) byCat[i.category] = [];
                byCat[i.category].push(i);
            });
            Object.keys(byCat).forEach(cat => {
                html += `<h2 class="menu-section-title">${esc(cat)}</h2>`;
                byCat[cat].forEach(item => { html += buildCard(item, idx++); });
            });
        } else {
            items.forEach(item => { html += buildCard(item, idx++); });
        }

        grid.innerHTML = html;
        bindCardEvents(grid);
        showSkeleton(false);
        syncAddButtons();
        renderAlsoBuy();
    }, 120);
}

function getPopularItems() {
    const items = getItems();
    const picked = [];
    CONFIG.popularItems.forEach(name => {
        const item = items.find(i => i.name === name);
        if (item && !picked.some(p => p.name === item.name)) picked.push(item);
    });
    return picked;
}

function renderAlsoBuy() {
    const section = $("alsoBuySection");
    const track = $("alsoBuyTrack");
    if (!section || !track) return;

    if (searchTerm) {
        section.classList.add("is-hidden");
        return;
    }

    const popular = getPopularItems();
    if (!popular.length) {
        section.classList.add("is-hidden");
        return;
    }

    section.classList.remove("is-hidden");
    track.innerHTML = popular.map(item => {
        const inCart = cart.find(c => c.name === item.name);
        return `
        <article class="also-buy-chip" data-name="${esc(item.name)}">
            <img src="${item.image}" alt="${esc(item.name)}" loading="lazy">
            <div class="also-buy-chip-body">
                <h3>${esc(item.name)}</h3>
                <p>₹${item.price} · ⭐ ${item.rating}</p>
            </div>
            <button type="button" class="also-buy-add${inCart ? " in-cart" : ""}" data-add="${esc(item.name)}" aria-label="Add ${esc(item.name)}">${inCart ? "✓" : "+"}</button>
        </article>`;
    }).join("");

    track.querySelectorAll(".also-buy-chip").forEach(chip => {
        chip.addEventListener("click", e => {
            if (e.target.closest(".also-buy-add")) return;
            const item = getItems().find(i => i.name === chip.dataset.name);
            if (item) openFoodModal(item);
        });
    });
    track.querySelectorAll(".also-buy-add").forEach(btn => {
        btn.addEventListener("click", e => {
            e.stopPropagation();
            const item = getItems().find(i => i.name === btn.dataset.add);
            if (item) addToCart(item, 1, btn);
        });
    });
}

function getHeroBlocks() {
    return Array.isArray(CONFIG.heroLayout?.blocks) ? CONFIG.heroLayout.blocks : [];
}

function ensureCustomFontLoaded(fontUrl) {
    if (!fontUrl) return;
    const existing = document.querySelector(`link[data-hero-font="${encodeURIComponent(fontUrl)}"]`);
    if (existing) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = fontUrl;
    link.dataset.heroFont = encodeURIComponent(fontUrl);
    document.head.appendChild(link);
}

function getHeroShadow(shadow) {
    if (shadow === "strong") return "0 14px 28px rgba(0, 0, 0, 0.4)";
    if (shadow === "soft") return "0 8px 18px rgba(0, 0, 0, 0.24)";
    return "none";
}

function normalizeHeroBlock(block, index) {
    const width = clamp(block?.width ?? 28, 5, 100);
    const height = clamp(block?.height ?? 18, 5, 100);
    return {
        id: block?.id || `hero-block-${index + 1}`,
        type: block?.type === "image" ? "image" : "text",
        text: block?.text || "",
        image: block?.image || "",
        x: clamp(block?.x ?? 8, 0, 100 - width),
        y: clamp(block?.y ?? 8, 0, 100 - height),
        width,
        height,
        padding: clamp(block?.padding ?? 12, 0, 40),
        opacity: clamp(block?.opacity ?? 1, 0.1, 1),
        backgroundColor: block?.backgroundColor || "rgba(255,255,255,0.08)",
        borderColor: block?.borderColor || "rgba(255,255,255,0.2)",
        borderWidth: clamp(block?.borderWidth ?? 1, 0, 20),
        borderRadius: clamp(block?.borderRadius ?? 16, 0, 80),
        color: block?.color || "#ffffff",
        fontSize: clamp(block?.fontSize ?? 20, 10, 120),
        fontWeight: String(block?.fontWeight || "700"),
        textAlign: block?.textAlign || "left",
        fontFamily: block?.fontFamily || "Outfit, sans-serif",
        fontUrl: block?.fontUrl || "",
        imageFit: block?.imageFit || "cover",
        shadow: block?.shadow || "soft"
    };
}

function renderHeroBlocksInto(container, blocks = []) {
    if (!container) return;
    let layer = container.querySelector(".hero-custom-layer");
    if (!layer) {
        layer = document.createElement("div");
        layer.className = "hero-custom-layer";
        container.appendChild(layer);
    }

    layer.innerHTML = "";
    blocks.map(normalizeHeroBlock).forEach(block => {
        if (block.fontUrl) ensureCustomFontLoaded(block.fontUrl);
        const node = document.createElement("div");
        node.className = `hero-custom-block hero-custom-block--${block.type}`;
        node.dataset.blockId = block.id;
        node.style.left = `${block.x}%`;
        node.style.top = `${block.y}%`;
        node.style.width = `${block.width}%`;
        node.style.height = `${block.height}%`;
        node.style.padding = `${block.padding}px`;
        node.style.opacity = block.opacity;
        node.style.background = block.backgroundColor;
        node.style.border = `${block.borderWidth}px solid ${block.borderColor}`;
        node.style.borderRadius = `${block.borderRadius}px`;
        node.style.boxShadow = getHeroShadow(block.shadow);

        if (block.type === "image") {
            const img = document.createElement("img");
            img.src = block.image || "";
            img.alt = "Hero custom image";
            img.style.objectFit = block.imageFit;
            node.appendChild(img);
        } else {
            node.innerHTML = esc(block.text || "Text").replace(/\n/g, "<br>");
            node.style.color = block.color;
            node.style.fontSize = `${block.fontSize}px`;
            node.style.fontWeight = block.fontWeight;
            node.style.textAlign = block.textAlign;
            node.style.fontFamily = block.fontFamily;
            node.style.lineHeight = "1.2";
        }

        layer.appendChild(node);
    });
}

window.renderHeroBlocksInto = renderHeroBlocksInto;
window.getHeroBlocks = getHeroBlocks;
window.ensureCustomFontLoaded = ensureCustomFontLoaded;

function applyBrand() {
    if ($("welcomeTagline")) $("welcomeTagline").textContent = CONFIG.tagline;
    if ($("heroTagline")) $("heroTagline").textContent = CONFIG.tagline;
    
    // Custom Hero Background Image
    if (CONFIG.heroBg) {
        const heroImg = document.querySelector(".hero-clean-bg img");
        if (heroImg) heroImg.src = CONFIG.heroBg;
    }
    
    // Custom Hero Offers
    const offersWrap = document.querySelector(".hero-offers");
    const offersLabel = document.querySelector(".hero-offers-label");
    const offerContainers = document.querySelectorAll(".hero-offers .hero-offer");
    const isAdminPage = document.body.classList.contains("admin-page-body");
    const offers = Array.isArray(CONFIG.offers)
        ? CONFIG.offers.filter(off => off && (off.title || off.desc || off.icon))
        : [];

    if (offersWrap) offersWrap.classList.toggle("is-hidden", !isAdminPage && offers.length === 0);
    if (offersLabel) offersLabel.classList.toggle("is-hidden", !isAdminPage && offers.length === 0);

    offerContainers.forEach((container, idx) => {
        const off = offers[idx];
        const iconEl = container.querySelector(".hero-offer-icon");
        const strongEl = container.querySelector(".hero-offer-text strong");
        const spanEl = container.querySelector(".hero-offer-text span");

        if (off) {
            container.classList.remove("is-hidden", "is-placeholder");
            if (iconEl) iconEl.textContent = off.icon || "🎉";
            if (strongEl) strongEl.textContent = off.title || "";
            if (spanEl) spanEl.textContent = off.desc || "";
            return;
        }

        if (isAdminPage) {
            container.classList.remove("is-hidden");
            container.classList.add("is-placeholder");
            if (iconEl) iconEl.textContent = "＋";
            if (strongEl) strongEl.textContent = "Add Offer";
            if (spanEl) spanEl.textContent = "Click to create a hero offer";
        } else {
            container.classList.add("is-hidden");
            container.classList.remove("is-placeholder");
            if (iconEl) iconEl.textContent = "";
            if (strongEl) strongEl.textContent = "";
            if (spanEl) spanEl.textContent = "";
        }
    });

    renderHeroBlocksInto($("heroSection"), getHeroBlocks());
}

function updateThemeMeta(theme) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "light" ? "#d32f2f" : "#0c0c0c";
}

function buildCard(item, i) {
    const inCart = cart.find(c => c.name === item.name);
    const available = item.available !== false;
    const btnLabel = !available ? "Not Available" : inCart ? `In Cart (${inCart.qty})` : "Add";
    const btnClass = !available ? "add-btn unavailable-btn" : inCart ? "add-btn in-cart" : "add-btn";
    return `
    <article class="food-card${!available ? ' food-card--unavailable' : ''}" data-name="${esc(item.name)}" style="--i:${i}">
        <div class="food-card-img">
            <img src="${item.image}" alt="${esc(item.name)}" loading="lazy">
            ${item.popular && available ? '<span class="food-card-badge">Popular</span>' : ''}
            ${!available ? '<span class="food-card-badge unavailable-badge">Unavailable</span>' : ''}
            <span class="veg-indicator ${item.isVeg ? 'veg' : 'nonveg'}"></span>
        </div>
        <div class="food-card-body">
            <div>
                <h3 class="food-card-name">${esc(item.name)}</h3>
                <p class="food-card-desc">${esc(item.description)}</p>
                <div class="food-card-meta"><span>⭐ ${item.rating}</span><span>· ${item.prepTime}</span></div>
            </div>
            <div class="food-card-foot">
                <span class="food-card-price">₹${item.price}</span>
                <button type="button" class="${btnClass}" data-add="${esc(item.name)}">${btnLabel}</button>
            </div>
        </div>
    </article>`;
}

function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function bindCardEvents(grid) {
    grid.querySelectorAll(".food-card").forEach(card => {
        card.addEventListener("click", e => {
            if (e.target.closest(".add-btn")) return;
            if (e.target.closest(".admin-card-controls")) return;
            const name = card.dataset.name;
            const item = getItems().find(i => i.name === name);
            if (!item) return;
            if (item.available === false) {
                showToast("⛔ This item is currently unavailable", true);
                return;
            }
            openFoodModal(item);
        });
    });
    grid.querySelectorAll(".add-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            e.stopPropagation();
            if (btn.classList.contains("unavailable-btn")) {
                showToast("⛔ This item is currently unavailable", true);
                return;
            }
            const name = btn.dataset.add;
            const item = getItems().find(i => i.name === name);
            if (!item || item.available === false) {
                showToast("⛔ This item is currently unavailable", true);
                return;
            }
            if (cart.find(c => c.name === name)) {
                openCart();
            } else {
                addToCart(item, 1, btn);
            }
        });
    });
}

function syncAddButtons() {
    document.querySelectorAll(".add-btn[data-add]").forEach(btn => {
        const ex = cart.find(c => c.name === btn.dataset.add);
        btn.textContent = ex ? `In Cart (${ex.qty})` : "Add";
        btn.classList.toggle("in-cart", Boolean(ex));
    });
}

/* ===== FLY TO CART ===== */
function flyToCart(imgSrc, fromEl) {
    const target = $("headerCartBtn") || $("floatCartBtn");
    if (!fromEl || !target) return;
    const fly = document.createElement("img");
    fly.className = "fly-img";
    fly.src = imgSrc;
    const r1 = fromEl.getBoundingClientRect();
    const r2 = target.getBoundingClientRect();
    fly.style.left = r1.left + r1.width / 2 - 24 + "px";
    fly.style.top = r1.top + "px";
    $("flyLayer")?.appendChild(fly);
    requestAnimationFrame(() => {
        fly.style.left = r2.left + r2.width / 2 - 24 + "px";
        fly.style.top = r2.top + "px";
        fly.style.transform = "scale(0.3)";
        fly.style.opacity = "0.5";
    });
    setTimeout(() => fly.remove(), 700);
}

/* ===== CART ===== */
function addToCart(item, qty = 1, btnEl = null) {
    const ex = cart.find(c => c.name === item.name);
    if (ex) ex.qty += qty;
    else cart.push({ ...item, qty, notes: "" });
    updateCartUI();
    if (btnEl) flyToCart(item.image, btnEl);
    const fc = $("floatCart");
    fc?.classList.remove("pulse-once");
    void fc?.offsetWidth;
    fc?.classList.add("pulse-once");
    const hc = $("headerCartBtn");
    hc?.classList.remove("bump");
    void hc?.offsetWidth;
    hc?.classList.add("bump");
    setTimeout(() => hc?.classList.remove("bump"), 500);
    showToast(`Added ${item.name}`);
}

function updateCartUI() {
    let count = 0, subtotal = 0;
    cart.forEach(i => { count += i.qty; subtotal += i.price * i.qty; });
    const gst = Math.round(subtotal * CONFIG.gstRate);
    const total = subtotal + gst;

    ["headerCartCount", "floatCartCount"].forEach(id => {
        const el = $(id);
        if (el) { el.textContent = count; el.dataset.count = count; }
    });
    if ($("floatCartTotal")) $("floatCartTotal").textContent = total;
    $("floatCart")?.classList.toggle("is-hidden", count === 0);
    $("headerCartBtn")?.classList.toggle("has-items", count > 0);

    if ($("cartSubtotal")) $("cartSubtotal").textContent = subtotal;
    if ($("cartGst")) $("cartGst").textContent = gst;
    if ($("cartTotal")) $("cartTotal").textContent = total;

    const body = $("cartItems");
    if (!body) return;
    if (!cart.length) {
        body.innerHTML = '<p style="text-align:center;color:var(--muted);padding:40px 0">Your cart is empty</p>';
        return;
    }
    body.innerHTML = cart.map(item => `
        <div class="cart-line-item">
            <img src="${item.image}" alt="">
            <div class="cart-line-info">
                <h4>${esc(item.name)}</h4>
                <p>₹${item.price * item.qty}</p>
                <div class="cart-qty-row">
                    <button type="button" data-dec="${esc(item.name)}">−</button>
                    <span>${item.qty}</span>
                    <button type="button" data-inc="${esc(item.name)}">+</button>
                    <button type="button" class="cart-remove" data-rem="${esc(item.name)}">Remove</button>
                </div>
            </div>
        </div>
    `).join("");

    body.querySelectorAll("[data-inc]").forEach(b => b.addEventListener("click", () => changeQty(b.dataset.inc, 1)));
    body.querySelectorAll("[data-dec]").forEach(b => b.addEventListener("click", () => changeQty(b.dataset.dec, -1)));
    body.querySelectorAll("[data-rem]").forEach(b => b.addEventListener("click", () => removeFromCart(b.dataset.rem)));
    syncAddButtons();
    renderAlsoBuy();
}

function changeQty(name, delta) {
    const item = cart.find(c => c.name === name);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(c => c.name !== name);
    updateCartUI();
}

function removeFromCart(name) {
    cart = cart.filter(c => c.name !== name);
    updateCartUI();
}

function openCart() {
    updateCartUI();
    $("cartDrawer")?.classList.add("open");
    $("cartOverlay")?.classList.add("open");
    $("cartDrawer")?.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeCart() {
    $("cartDrawer")?.classList.remove("open");
    $("cartOverlay")?.classList.remove("open");
    $("cartDrawer")?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

/* ===== FOOD MODAL ===== */
function openFoodModal(item) {
    modalItem = item;
    modalQty = cart.find(c => c.name === item.name)?.qty || 1;
    $("modalImg").src = item.image;
    $("modalTitle").textContent = item.name;
    $("modalDesc").textContent = item.description;
    if ($("modalIngredients")) $("modalIngredients").textContent = `Ingredients: ${item.ingredients}`;
    $("modalRating").textContent = `⭐ ${item.rating}`;
    $("modalPrep").textContent = `⏱ ${item.prepTime}`;
    $("modalReviews").textContent = `(${item.reviews} reviews)`;
    $("modalVeg").className = "veg-indicator " + (item.isVeg ? "veg" : "nonveg");
    $("modalQty").textContent = modalQty;
    $("modalPrice").textContent = item.price * modalQty;
    $("modalNotes").value = "";
    $("foodModal")?.classList.add("open");
    $("foodModal")?.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeFoodModal() {
    $("foodModal")?.classList.remove("open");
    $("foodModal")?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    modalItem = null;
}

/* ===== CHECKOUT & ORDER ===== */
function openCheckout() {
    if (!cart.length) { showToast("Cart is empty", true); return; }
    closeCart();
    const sum = $("checkoutSummary");
    if (sum) {
        let sub = 0;
        sum.innerHTML = cart.map(i => {
            sub += i.price * i.qty;
            return `<p><span>${i.qty}× ${esc(i.name)}</span><span>₹${i.price * i.qty}</span></p>`;
        }).join("") + `<p style="font-weight:800;margin-top:8px;padding-top:8px;border-top:1px solid var(--border)"><span>Total</span><span>₹${sub + Math.round(sub * CONFIG.gstRate)}</span></p>`;
    }
    $("screenCheckout")?.classList.add("open");
    $("screenCheckout")?.setAttribute("aria-hidden", "false");
}

function closeScreens() {
    document.querySelectorAll(".full-screen.open").forEach(s => {
        s.classList.remove("open");
        s.setAttribute("aria-hidden", "true");
    });
}

async function placeOrder() {
    const tableHash = formatTableHash(getTableNumber());
    if (!tableHash) {
        showToast("Scan the QR code on your table to order", true);
        return;
    }
    const name = $("checkoutName")?.value.trim() || "Guest";
    const phone = $("checkoutPhone")?.value.trim();
    const notes = $("checkoutNotes")?.value.trim();
    let sub = 0;
    let lines = "";
    const orderItems = [];
    cart.forEach(i => {
        sub += i.price * i.qty;
        lines += `${i.qty} × ${i.name} — ₹${i.price * i.qty}\n`;
        orderItems.push({ name: i.name, qty: i.qty, price: i.price, total: i.price * i.qty });
    });
    const gst = Math.round(sub * CONFIG.gstRate);
    const total = sub + gst;

    // Save order to Supabase (non-blocking)
    sbSaveOrder({
        tableNumber: getTableNumber(),
        customerName: name,
        customerPhone: phone || null,
        items: orderItems,
        subtotal: sub,
        gst,
        total,
        notes: notes || null
    }).catch(e => console.error('Order save failed:', e));

    const msg = `🍽️ *NEW ORDER — ${CONFIG.restaurantName}*

🪑 *ORDER FROM TABLE ${tableHash}*

👤 ${name}${phone ? `\n📞 ${phone}` : ""}

━━━━━━━━━━━━━━━━
${lines}━━━━━━━━━━━━━━━━
Subtotal: ₹${sub}
GST: ₹${gst}
*Total: ₹${total}*

📝 ${notes || "No special notes"}

— Digital Menu Order`;

    const url = `https://wa.me/${CONFIG.whatsappPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");

    closeScreens();
    $("screenSuccess")?.classList.add("open");
    $("screenSuccess")?.setAttribute("aria-hidden", "false");
    launchConfetti();
    startTrackingSimulation();
}

function launchConfetti() {
    const layer = $("confettiLayer");
    if (!layer) return;
    layer.innerHTML = "";
    const colors = ["#d4af37", "#e8c547", "#a67c00", "#22c55e", "#e8d5a3", "#f5f0e6"];
    for (let i = 0; i < 48; i++) {
        const p = document.createElement("span");
        p.className = "confetti-piece";
        p.style.left = Math.random() * 100 + "%";
        p.style.background = colors[i % colors.length];
        p.style.animationDelay = Math.random() * 0.4 + "s";
        p.style.animationDuration = 1.8 + Math.random() * 1.2 + "s";
        layer.appendChild(p);
    }
}

function startTrackingSimulation() {
    const steps = document.querySelectorAll("#trackTimeline li");
    let step = 1;
    const advance = () => {
        if (step >= steps.length) return;
        steps.forEach((li, i) => {
            li.classList.remove("active");
            if (i < step) li.classList.add("done");
            if (i === step) li.classList.add("active");
        });
        step++;
        if (step < steps.length) setTimeout(advance, 4000);
    };
    setTimeout(advance, 2000);
}

/* ===== WAITER ===== */
function initWaiter() {
    $("waiterFab")?.addEventListener("click", () => {
        $("waiterModal")?.classList.add("open");
    });
    document.querySelectorAll(".waiter-card").forEach(btn => {
        btn.addEventListener("click", () => {
            const type = btn.dataset.waiter;
            const tableHash = formatTableHash(getTableNumber()) || "Unknown";
            const labels = { water: "Need Water", bill: "Need Bill", help: "Need Assistance", call: "Call Waiter" };
            const msg = `🛎️ *${labels[type] || "Request"}*\n🪑 Table ${tableHash}\n— ${CONFIG.restaurantName}`;
            window.open(`https://wa.me/${CONFIG.whatsappPhone}?text=${encodeURIComponent(msg)}`, "_blank");
            $("waiterModal")?.classList.remove("open");
            showToast("Request sent to staff");
        });
    });
}

/* ===== MODAL CLOSE ===== */
function initModals() {
    document.querySelectorAll("[data-close]").forEach(el => {
        el.addEventListener("click", () => {
            el.closest(".modal-sheet")?.classList.remove("open");
            if ($("foodModal")?.classList.contains("open") === false) {
                document.body.style.overflow = "";
            }
        });
    });
    $("closeCart")?.addEventListener("click", closeCart);
    $("cartOverlay")?.addEventListener("click", closeCart);
    $("continueOrder")?.addEventListener("click", closeCart);
    $("proceedCheckout")?.addEventListener("click", openCheckout);
    $("placeOrderBtn")?.addEventListener("click", placeOrder);
    $("trackOrderBtn")?.addEventListener("click", () => {
        $("screenSuccess")?.classList.remove("open");
        $("screenTracking")?.classList.add("open");
    });
    $("successContinue")?.addEventListener("click", () => {
        $("screenSuccess")?.classList.remove("open");
        cart = [];
        updateCartUI();
    });
    document.querySelectorAll("[data-screen-close]").forEach(b => b.addEventListener("click", closeScreens));

    $("modalQtyMinus")?.addEventListener("click", () => {
        if (modalQty > 1) { modalQty--; $("modalQty").textContent = modalQty; $("modalPrice").textContent = modalItem.price * modalQty; }
    });
    $("modalQtyPlus")?.addEventListener("click", () => {
        modalQty++; $("modalQty").textContent = modalQty; $("modalPrice").textContent = modalItem.price * modalQty;
    });
    $("modalAddBtn")?.addEventListener("click", () => {
        if (!modalItem) return;
        const ex = cart.find(c => c.name === modalItem.name);
        if (ex) ex.qty = modalQty;
        else cart.push({ ...modalItem, qty: modalQty, notes: $("modalNotes")?.value || "" });
        updateCartUI();
        flyToCart(modalItem.image, $("modalAddBtn"));
        closeFoodModal();
        showToast("Added to cart");
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            closeCart();
            closeFoodModal();
            document.querySelectorAll(".modal-sheet.open").forEach(m => m.classList.remove("open"));
            closeScreens();
        }
    });
}

/* ===== INIT ===== */
async function init() {
    // Show skeleton while loading from Supabase
    showSkeleton(true);

    // Load all remote data first
    await loadDataFromSupabase();

    // Apply brand after config is loaded
    applyBrand();
    updateTableUI();
    initWelcome();
    initHeader();
    renderCategories();
    renderMenu();
    initModals();
    initWaiter();
    updateCartUI();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
