// KnottyPurls (@knottypurlsofficial) E-Commerce App
// Tip: Set DEFAULT_STORE_WHATSAPP to your 10-digit Indian number (with 91 prefix, e.g. '919876543210')

const DEFAULT_STORE_WHATSAPP = '';

const PRODUCTS = [
  {
    id: 'spiderman-amigurumi',
    name: 'Spider-Man Amigurumi Doll',
    category: 'Amigurumi',
    image: 'images/spiderman-amigurumi.jpg',
    badge: 'Fan Favorite',
    desc: 'Adorable red and blue handmade crochet Spider-Man plushie with stitched web details. Great for desks, shelves, and superhero gifts!',
  },
  {
    id: 'sunflower-bouquet',
    name: 'Crochet Sunflower Bouquet',
    category: 'Bouquets',
    image: 'images/sunflower-bouquet.jpg',
    badge: 'Everlasting Bloom',
    desc: 'Bright golden crochet sunflowers paired with leafy greens and cute pink accents, wrapped neatly for birthdays and anniversaries.',
  },
  {
    id: 'daisy-bouquet',
    name: 'Crochet Daisy & Flower Bouquet',
    category: 'Bouquets',
    image: 'images/daisy-multicolor-bouquet.jpg',
    badge: 'Sweet & Dainty',
    desc: 'White and yellow handmade crochet daisies that stay fresh forever. Soft, cheerful, and customizable in your favorite wrap.',
  },
  {
    id: 'multicolor-bouquet',
    name: 'Multicolor Crochet Flower Bouquet',
    category: 'Bouquets',
    image: 'images/daisy-multicolor-bouquet.jpg',
    badge: 'Reel Featured',
    desc: 'Vibrant multicolored crochet blooms handcrafted stem by stem — featured on our Instagram Reels!',
  },
  {
    id: 'pink-hair-bow',
    name: 'Pink Crochet Hair Bow',
    category: 'Hair Accessories',
    image: 'images/pink-hair-bow.jpg',
    badge: 'Coquette Cute',
    desc: 'Soft pastel pink handmade crochet bow clip — lightweight, cozy, and effortless for everyday cute hairstyles.',
  },
  {
    id: 'crochet-gajra',
    name: 'Handmade Crochet Gajra',
    category: 'Gajra',
    image: 'images/gajra-rakhi.jpg',
    badge: 'Reusable Floral',
    desc: 'Delicate crochet jasmine gajra hair garland from our Gajra highlight — never wilts and can be worn for every festive occasion.',
  },
  {
    id: 'crochet-rakhi',
    name: 'Artisan Crochet Rakhi',
    category: 'Rakhi Season',
    image: 'images/gajra-rakhi.jpg',
    badge: 'Festive Special',
    desc: 'Colorful handmade crochet rakhis with cute yarn flower motifs from our Rakhi Season collection.',
  },
  {
    id: 'custom-crochet-order',
    name: 'Custom Crochet Creation',
    category: 'Custom Orders',
    image: 'images/hero-crochet.jpg',
    badge: 'Made For You',
    desc: 'Have a dream bouquet, custom plushie, or color palette in mind? Tell us your idea and we will crochet it from scratch!',
  },
];

const HIGHLIGHTS = [
  { id: 'Aesthetics', emoji: '🎀', category: 'All', image: 'images/hero-crochet.jpg', desc: 'Behind-the-scenes yarn palettes, cozy stitches, and aesthetic packaging from @knottypurlsofficial.' },
  { id: 'Bouquets', emoji: '💐', category: 'Bouquets', image: 'images/sunflower-bouquet.jpg', desc: 'Sunflowers, daisies, and multicolor crochet bouquets that never wilt — perfect for gifting.' },
  { id: 'Gajra', emoji: '🌼', category: 'Gajra', image: 'images/gajra-rakhi.jpg', desc: 'Reusable handmade crochet gajras crafted for weddings, pujas, and festive hairdos.' },
  { id: 'Happy Customers', emoji: '🥰', category: 'All', image: 'images/daisy-multicolor-bouquet.jpg', desc: 'Unboxing smiles and love from customers across India!' },
  { id: 'Hair Accessories', emoji: '🌸', category: 'Hair Accessories', image: 'images/pink-hair-bow.jpg', desc: 'Cute pastel crochet hair bows and clips stitched to match your outfits.' },
  { id: 'Rakhi Season', emoji: '🧵', category: 'Rakhi Season', image: 'images/gajra-rakhi.jpg', desc: 'Handcrafted colorful crochet rakhis made with love for sibling celebrations.' },
  { id: 'New Collection', emoji: '✨', category: 'Amigurumi', image: 'images/spiderman-amigurumi.jpg', desc: 'Fresh drops including our Spider-Man Amigurumi Doll and custom gift bundles!' },
];

const CATEGORIES = ['All', 'Bouquets', 'Amigurumi', 'Hair Accessories', 'Gajra', 'Rakhi Season', 'Custom Orders'];

const STORAGE_KEY = 'knottypurls_state_v1';
let state = {
  activeCategory: 'All',
  searchQuery: '',
  wishlistOnly: false,
  favorites: [],
  cart: [],
  storeWhatsapp: DEFAULT_STORE_WHATSAPP,
  selectedProductId: null,
  modalQty: 1,
  directOrderItem: null,
  activeStoryCategory: 'All',
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (Array.isArray(saved.favorites)) state.favorites = saved.favorites;
    if (Array.isArray(saved.cart)) state.cart = saved.cart;
    if (typeof saved.storeWhatsapp === 'string' && saved.storeWhatsapp) {
      state.storeWhatsapp = saved.storeWhatsapp;
    }
  } catch (e) {}
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      favorites: state.favorites,
      cart: state.cart,
      storeWhatsapp: state.storeWhatsapp,
    }));
  } catch (e) {}
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.add('hidden'), 2600);
}

function renderHighlights() {
  const bar = document.getElementById('highlights-bar');
  bar.innerHTML = HIGHLIGHTS.map(h => `
    <button type="button" data-highlight-id="${h.id}" class="story-item flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none">
      <div class="story-ring">
        <div class="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-cream p-0.5 overflow-hidden">
          <img src="${h.image}" alt="${h.id}" class="w-full h-full object-cover rounded-full" />
        </div>
      </div>
      <span class="text-xs font-medium text-cocoa-800 group-hover:text-blush-600 whitespace-nowrap">${h.emoji} ${h.id}</span>
    </button>
  `).join('');
}

function renderCategories() {
  const container = document.getElementById('category-pills');
  container.innerHTML = CATEGORIES.map(cat => {
    const active = !state.wishlistOnly && state.activeCategory === cat;
    return `
      <button type="button" data-cat="${cat}" class="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
        active
          ? 'bg-cocoa-800 text-white shadow-sm'
          : 'bg-white text-cocoa-700 border border-blush-200 hover:bg-blush-50'
      }">${cat}</button>
    `;
  }).join('') + (state.wishlistOnly ? `
    <button type="button" id="clear-wishlist-filter" class="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-blush-500 text-white shadow-sm">
      ❤️ Saved (${state.favorites.length}) ✕
    </button>
  ` : '');
}

function getFilteredProducts() {
  const q = state.searchQuery.trim().toLowerCase();
  return PRODUCTS.filter(p => {
    if (state.wishlistOnly && !state.favorites.includes(p.id)) return false;
    if (!state.wishlistOnly && state.activeCategory !== 'All' && p.category !== state.activeCategory) return false;
    if (q) {
      const hay = (p.name + ' ' + p.category + ' ' + p.desc).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

function renderProducts() {
  const grid = document.getElementById('product-grid');
  const empty = document.getElementById('empty-state');
  const list = getFilteredProducts();

  if (list.length === 0) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');
  grid.innerHTML = list.map(p => {
    const isFav = state.favorites.includes(p.id);
    return `
      <article class="product-card bg-white rounded-3xl border border-blush-100 overflow-hidden flex flex-col justify-between shadow-xs">
        <div>
          <div class="relative aspect-square bg-blush-50 overflow-hidden group cursor-pointer" data-open-product="${p.id}">
            <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-bold text-blush-600 shadow-xs">${p.badge}</span>
            <button type="button" data-fav-id="${p.id}" aria-label="Toggle favorite" class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-xs flex items-center justify-center transition-transform active:scale-90 ${isFav ? 'text-blush-500' : 'text-cocoa-700'}">
              ${isFav ? '❤️' : '🤍'}
            </button>
          </div>
          <div class="p-4">
            <span class="text-[11px] font-semibold uppercase tracking-wider text-blush-500">${p.category}</span>
            <h3 class="font-display text-lg font-bold text-cocoa-900 mt-0.5 leading-snug cursor-pointer hover:text-blush-600" data-open-product="${p.id}">${p.name}</h3>
            <p class="text-xs text-cocoa-700 mt-1.5 line-clamp-2 leading-relaxed">${p.desc}</p>
            <p class="text-xs font-semibold text-emerald-700 mt-2.5 bg-emerald-50 inline-block px-2.5 py-1 rounded-lg">Made to Order · Quote on WhatsApp</p>
          </div>
        </div>
        <div class="px-4 pb-4 pt-1 flex items-center gap-2">
          <button type="button" data-quick-add="${p.id}" class="flex-1 py-2.5 rounded-full bg-blush-100 hover:bg-blush-200 text-blush-700 text-xs font-bold transition-all active:scale-95">
            + Add to Bag
          </button>
          <button type="button" data-open-product="${p.id}" class="px-3.5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all active:scale-95" title="Customize & Order on WhatsApp">
            WhatsApp
          </button>
        </div>
      </article>
    `;
  }).join('');
}

function updateBadges(animateCart = false) {
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountEl = document.getElementById('cart-count');
  cartCountEl.textContent = totalItems;
  if (animateCart) {
    cartCountEl.classList.remove('badge-pop');
    void cartCountEl.offsetWidth;
    cartCountEl.classList.add('badge-pop');
  }

  const wishEl = document.getElementById('wishlist-count');
  wishEl.textContent = state.favorites.length;
  wishEl.classList.toggle('hidden', state.favorites.length === 0);
}

function renderCart() {
  const container = document.getElementById('cart-items');
  const checkoutBtn = document.getElementById('checkout-wa-btn');

  if (state.cart.length === 0) {
    checkoutBtn.disabled = true;
    container.innerHTML = `
      <div class="text-center py-14 space-y-3">
        <p class="text-5xl">🧶</p>
        <p class="font-display text-lg font-bold text-cocoa-900">Your Crochet Bag is empty</p>
        <p class="text-xs text-cocoa-700">Add handmade bouquets, amigurumi, bows, or custom pieces to start your WhatsApp order.</p>
      </div>
    `;
    return;
  }

  checkoutBtn.disabled = false;
  container.innerHTML = state.cart.map(item => `
    <div class="bg-white rounded-2xl p-3 border border-blush-100 flex gap-3 items-center shadow-xs">
      <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-xl object-cover shrink-0" />
      <div class="flex-1 min-w-0">
        <h4 class="font-display font-bold text-sm text-cocoa-900 truncate">${item.name}</h4>
        <p class="text-[11px] text-cocoa-700">${item.colorPref ? 'Pref: ' + item.colorPref : item.category}</p>
        <div class="flex items-center gap-2 mt-2">
          <button type="button" data-cart-dec="${item.cartItemId}" class="w-6 h-6 rounded-full bg-blush-50 hover:bg-blush-100 text-cocoa-800 font-bold text-xs">-</button>
          <span class="text-xs font-bold w-4 text-center">${item.quantity}</span>
          <button type="button" data-cart-inc="${item.cartItemId}" class="w-6 h-6 rounded-full bg-blush-50 hover:bg-blush-100 text-cocoa-800 font-bold text-xs">+</button>
        </div>
      </div>
      <button type="button" data-cart-del="${item.cartItemId}" class="p-1.5 text-cocoa-700 hover:text-blush-600 text-xs" title="Remove">🗑️</button>
    </div>
  `).join('');
}

function addToCart(productId, qty = 1, colorPref = '') {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const cleanPref = colorPref.trim();
  const existing = state.cart.find(i => i.id === productId && i.colorPref === cleanPref);
  if (existing) {
    existing.quantity += qty;
  } else {
    state.cart.push({
      cartItemId: productId + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      id: product.id,
      name: product.name,
      category: product.category,
      image: product.image,
      quantity: qty,
      colorPref: cleanPref,
    });
  }
  saveState();
  updateBadges(true);
  renderCart();
  showToast(`Added ${product.name} to your Crochet Bag! 🧶`);
}

function openProductModal(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  state.selectedProductId = p.id;
  state.modalQty = 1;
  document.getElementById('modal-img').src = p.image;
  document.getElementById('modal-img').alt = p.name;
  document.getElementById('modal-category').textContent = p.category;
  document.getElementById('modal-title').textContent = p.name;
  document.getElementById('modal-desc').textContent = p.desc;
  document.getElementById('modal-color').value = '';
  document.getElementById('modal-qty').textContent = '1';
  const modal = document.getElementById('product-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function buildWhatsAppMessage() {
  const name = document.getElementById('wa-name').value.trim() || 'Customer';
  const city = document.getElementById('wa-city').value.trim() || 'India';
  const date = document.getElementById('wa-date').value.trim();
  const note = document.getElementById('wa-note').value.trim();

  const items = state.directOrderItem ? [state.directOrderItem] : state.cart;
  const lines = [
    `Hi KnottyPurls! 🧶✨`,
    `I'd love to place a handmade crochet order:`,
    ``,
  ];

  if (items.length > 0) {
    items.forEach((item, idx) => {
      const pref = item.colorPref ? ` (${item.colorPref})` : '';
      lines.push(`${idx + 1}. ${item.name} × ${item.quantity}${pref}`);
    });
  } else {
    lines.push(`1. Custom Crochet Inquiry`);
  }

  lines.push(``);
  lines.push(`👤 Name: ${name}`);
  lines.push(`📍 City/Pincode: ${city}`);
  if (date) lines.push(`📅 Needed by: ${date}`);
  if (note) lines.push(`📝 Note: ${note}`);
  lines.push(``);
  lines.push(`Please share the quote & timeline! 💐`);
  return lines.join('\n');
}

function updateWaPreview() {
  document.getElementById('wa-preview').textContent = buildWhatsAppMessage();
}

function openWaModal(directItem = null) {
  state.directOrderItem = directItem;
  document.getElementById('wa-store-phone').value = state.storeWhatsapp || '';
  updateWaPreview();
  const modal = document.getElementById('wa-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeWaModal() {
  state.directOrderItem = null;
  const modal = document.getElementById('wa-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function copyTextFallback(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Order message copied! Paste it on WhatsApp or IG DM 📋');
    }).catch(() => legacyCopy(text));
  } else {
    legacyCopy(text);
  }
}

function legacyCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showToast('Order message copied! 📋');
  } catch (e) {
    showToast('Please select and copy the message preview above.');
  }
  document.body.removeChild(ta);
}

function openStoryModal(highlightId) {
  const h = HIGHLIGHTS.find(x => x.id === highlightId);
  if (!h) return;
  state.activeStoryCategory = h.category;
  document.getElementById('story-emoji').textContent = h.emoji;
  document.getElementById('story-title').textContent = h.id;
  document.getElementById('story-img').src = h.image;
  document.getElementById('story-img').alt = h.id;
  document.getElementById('story-desc').textContent = h.desc;
  const modal = document.getElementById('story-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeStoryModal() {
  const modal = document.getElementById('story-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function initObservers() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderHighlights();
  renderCategories();
  renderProducts();
  renderCart();
  updateBadges(false);
  initObservers();

  document.getElementById('category-pills').addEventListener('click', (e) => {
    const catBtn = e.target.closest('[data-cat]');
    if (catBtn) {
      state.wishlistOnly = false;
      state.activeCategory = catBtn.dataset.cat;
      renderCategories();
      renderProducts();
    }
    if (e.target.id === 'clear-wishlist-filter') {
      state.wishlistOnly = false;
      renderCategories();
      renderProducts();
    }
  });

  document.getElementById('search-input').addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderProducts();
  });

  document.getElementById('reset-filters-btn').addEventListener('click', () => {
    state.activeCategory = 'All';
    state.searchQuery = '';
    state.wishlistOnly = false;
    document.getElementById('search-input').value = '';
    renderCategories();
    renderProducts();
  });

  document.getElementById('product-grid').addEventListener('click', (e) => {
    const favBtn = e.target.closest('[data-fav-id]');
    if (favBtn) {
      const id = favBtn.dataset.favId;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(x => x !== id);
        showToast('Removed from Saved Favorites');
      } else {
        state.favorites.push(id);
        showToast('Saved to Favorites ❤️');
      }
      saveState();
      updateBadges(false);
      renderCategories();
      renderProducts();
      return;
    }

    const quickAddBtn = e.target.closest('[data-quick-add]');
    if (quickAddBtn) {
      addToCart(quickAddBtn.dataset.quickAdd, 1, '');
      return;
    }

    const openEl = e.target.closest('[data-open-product]');
    if (openEl) {
      openProductModal(openEl.dataset.openProduct);
    }
  });

  document.getElementById('highlights-bar').addEventListener('click', (e) => {
    const item = e.target.closest('[data-highlight-id]');
    if (item) openStoryModal(item.dataset.highlightId);
  });

  document.getElementById('close-story-modal').addEventListener('click', closeStoryModal);
  document.getElementById('story-modal-backdrop').addEventListener('click', closeStoryModal);
  document.getElementById('story-filter-btn').addEventListener('click', () => {
    state.wishlistOnly = false;
    state.activeCategory = state.activeStoryCategory;
    renderCategories();
    renderProducts();
    closeStoryModal();
    document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('open-wishlist-btn').addEventListener('click', () => {
    if (state.favorites.length === 0) {
      showToast('Tap the 🤍 on any product to save it here!');
      return;
    }
    state.wishlistOnly = !state.wishlistOnly;
    renderCategories();
    renderProducts();
    document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
  });

  const cartDrawer = document.getElementById('cart-drawer');
  document.getElementById('open-cart-btn').addEventListener('click', () => cartDrawer.classList.remove('hidden'));
  document.getElementById('close-cart-btn').addEventListener('click', () => cartDrawer.classList.add('hidden'));
  document.getElementById('cart-backdrop').addEventListener('click', () => cartDrawer.classList.add('hidden'));

  document.getElementById('cart-items').addEventListener('click', (e) => {
    const inc = e.target.closest('[data-cart-inc]');
    const dec = e.target.closest('[data-cart-dec]');
    const del = e.target.closest('[data-cart-del]');
    if (inc) {
      const item = state.cart.find(i => i.cartItemId === inc.dataset.cartInc);
      if (item) item.quantity += 1;
    } else if (dec) {
      const item = state.cart.find(i => i.cartItemId === dec.dataset.cartDec);
      if (item) {
        if (item.quantity > 1) item.quantity -= 1;
        else state.cart = state.cart.filter(i => i.cartItemId !== item.cartItemId);
      }
    } else if (del) {
      state.cart = state.cart.filter(i => i.cartItemId !== del.dataset.cartDel);
    } else {
      return;
    }
    saveState();
    updateBadges(false);
    renderCart();
  });

  document.getElementById('close-product-modal').addEventListener('click', closeProductModal);
  document.getElementById('product-modal-backdrop').addEventListener('click', closeProductModal);
  document.getElementById('modal-qty-minus').addEventListener('click', () => {
    if (state.modalQty > 1) {
      state.modalQty -= 1;
      document.getElementById('modal-qty').textContent = state.modalQty;
    }
  });
  document.getElementById('modal-qty-plus').addEventListener('click', () => {
    state.modalQty += 1;
    document.getElementById('modal-qty').textContent = state.modalQty;
  });
  document.getElementById('modal-add-btn').addEventListener('click', () => {
    const pref = document.getElementById('modal-color').value;
    addToCart(state.selectedProductId, state.modalQty, pref);
    closeProductModal();
  });
  document.getElementById('modal-direct-wa-btn').addEventListener('click', () => {
    const p = PRODUCTS.find(x => x.id === state.selectedProductId);
    const pref = document.getElementById('modal-color').value.trim();
    const directItem = p ? { name: p.name, quantity: state.modalQty, colorPref: pref } : null;
    closeProductModal();
    openWaModal(directItem);
  });

  document.getElementById('checkout-wa-btn').addEventListener('click', () => {
    cartDrawer.classList.add('hidden');
    openWaModal(null);
  });
  document.getElementById('hero-custom-btn').addEventListener('click', () => {
    openWaModal({ name: 'Custom Crochet Order', quantity: 1, colorPref: 'Custom Request' });
  });
  document.getElementById('about-whatsapp-btn').addEventListener('click', () => openWaModal(null));
  document.getElementById('floating-wa-btn').addEventListener('click', () => openWaModal(null));
  document.getElementById('footer-settings-btn').addEventListener('click', () => openWaModal(null));

  document.getElementById('close-wa-modal').addEventListener('click', closeWaModal);
  document.getElementById('wa-modal-backdrop').addEventListener('click', closeWaModal);

  ['wa-name', 'wa-city', 'wa-date', 'wa-note'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateWaPreview);
  });

  document.getElementById('wa-store-phone').addEventListener('input', (e) => {
    state.storeWhatsapp = e.target.value;
    saveState();
  });

  document.getElementById('copy-wa-btn').addEventListener('click', () => {
    copyTextFallback(buildWhatsAppMessage());
  });

  document.getElementById('send-wa-btn').addEventListener('click', () => {
    const rawPhone = document.getElementById('wa-store-phone').value.replace(/[^\d]/g, '');
    if (rawPhone.length < 10) {
      showToast('Enter KnottyPurls WhatsApp number (e.g. 9198XXXXXXXX) or click Copy Message!');
      document.getElementById('wa-store-phone').focus();
      return;
    }
    const normalized = rawPhone.length === 10 ? '91' + rawPhone : rawPhone;
    const msg = encodeURIComponent(buildWhatsAppMessage());
    window.open(`https://wa.me/${normalized}?text=${msg}`, '_blank', 'noopener,noreferrer');
  });
});
