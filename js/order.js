/* ============================================
   AURELIAN - Order Page JavaScript
   Full cart & ordering functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Menu Data ----------
  const menuData = {
    popular: [
      { id: 1, name: 'Pan-Seared A5 Wagyu', desc: 'Black truffle jus, roasted bone marrow, seasonal root vegetables', price: 128, icon: 'fa-drumstick-bite', badge: "Chef's Choice" },
      { id: 2, name: 'Lobster Thermidor', desc: 'Maine lobster, cognac cream, gruyere gratin, saffron bisque', price: 96, icon: 'fa-shrimp', badge: 'Popular' },
      { id: 7, name: 'Wild Mushroom Risotto', desc: 'Porcini, chanterelle, truffle oil, aged parmesan, fresh herbs', price: 44, icon: 'fa-seedling', badge: 'Vegetarian' },
      { id: 10, name: 'Gold Leaf Chocolate Sphere', desc: 'Valrhona dark chocolate, passion fruit coulis, vanilla gelato', price: 42, icon: 'fa-cake-candles', badge: 'New' },
    ],
    starters: [
      { id: 3, name: 'Yellowfin Tuna Tartare', desc: 'Avocado mousse, sesame tuile, ponzu gel, micro shiso', price: 32, icon: 'fa-lemon', badge: 'Gluten-Free' },
      { id: 4, name: 'Heirloom Tomato & Burrata', desc: 'Aged balsamic, basil oil, fleur de sel, toasted pine nuts', price: 26, icon: 'fa-cheese', badge: 'Vegetarian' },
      { id: 5, name: 'Seared Foie Gras', desc: 'Brioche toast, fig compote, port wine reduction, candied walnuts', price: 38, icon: 'fa-bread-slice', badge: 'Signature' },
      { id: 6, name: 'Truffle Veloute', desc: 'Black truffle, crème fraîche, chive oil, parmigiano crisp', price: 28, icon: 'fa-bowl-food', badge: '' },
    ],
    mains: [
      { id: 1, name: 'Pan-Seared A5 Wagyu', desc: 'Black truffle jus, roasted bone marrow, seasonal root vegetables', price: 128, icon: 'fa-drumstick-bite', badge: "Chef's Choice" },
      { id: 7, name: 'Wild Mushroom Risotto', desc: 'Porcini, chanterelle, truffle oil, aged parmesan, fresh herbs', price: 44, icon: 'fa-seedling', badge: 'Vegetarian' },
      { id: 8, name: 'Roasted Duck Breast', desc: 'Cherry gastrique, confit leg croquette, braised endive', price: 62, icon: 'fa-utensils', badge: 'Popular' },
      { id: 9, name: 'Herb-Crusted Rack of Lamb', desc: 'Rosemary jus, pommes dauphine, ratatouille provençale', price: 78, icon: 'fa-pepper-hot', badge: '' },
      { id: 15, name: 'Prime Filet Mignon', desc: 'Béarnaise sauce, truffle mashed potatoes, grilled asparagus', price: 86, icon: 'fa-fire', badge: '' },
    ],
    seafood: [
      { id: 2, name: 'Lobster Thermidor', desc: 'Maine lobster, cognac cream, gruyere gratin, saffron bisque', price: 96, icon: 'fa-shrimp', badge: 'Signature' },
      { id: 16, name: 'Chilean Sea Bass', desc: 'Miso glaze, bok choy, shiitake mushrooms, ginger broth', price: 68, icon: 'fa-fish', badge: '' },
      { id: 17, name: 'Diver Scallops', desc: 'Cauliflower purée, golden raisins, brown butter, capers', price: 54, icon: 'fa-circle-dot', badge: "Chef's Pick" },
      { id: 18, name: 'Oysters Rockefeller', desc: 'Six East Coast oysters, spinach, Pernod, hollandaise', price: 36, icon: 'fa-water', badge: 'Classic' },
    ],
    desserts: [
      { id: 10, name: 'Gold Leaf Chocolate Sphere', desc: 'Valrhona dark chocolate, passion fruit coulis, vanilla gelato', price: 42, icon: 'fa-cake-candles', badge: 'New' },
      { id: 11, name: 'Grand Marnier Soufflé', desc: 'Orange zest, crème anglaise, candied kumquats', price: 28, icon: 'fa-cloud', badge: 'Classic' },
      { id: 12, name: 'Tahitian Vanilla Crème Brûlée', desc: 'Madagascar vanilla, caramelized sugar, fresh berries', price: 22, icon: 'fa-fire-flame-simple', badge: 'Popular' },
      { id: 13, name: 'Seasonal Fruit Tart', desc: 'Pâte sablée, pastry cream, market fruits, mascarpone', price: 24, icon: 'fa-stroopwafel', badge: 'Seasonal' },
    ],
    drinks: [
      { id: 19, name: 'The Aurelian', desc: 'Aged bourbon, honey lavender syrup, Angostura bitters', price: 24, icon: 'fa-martini-glass-citrus', badge: 'House Special' },
      { id: 20, name: 'Dom Pérignon Vintage', desc: 'Toasty notes with citrus and mineral complexity', price: 85, icon: 'fa-champagne-glasses', badge: 'Premium' },
      { id: 21, name: 'Opus One, Napa Valley', desc: 'Rich, velvety Bordeaux-style blend with dark fruit', price: 120, icon: 'fa-wine-glass', badge: "Sommelier's Pick" },
      { id: 22, name: 'Midnight Garden', desc: "Hendrick's gin, elderflower, cucumber, rose water", price: 22, icon: 'fa-glass-water-droplet', badge: 'Refreshing' },
    ]
  };

  // ---------- State ----------
  let cart = [];
  let orderType = 'delivery';
  const DELIVERY_FEE = 12;
  const TAX_RATE = 0.08875;

  // ---------- DOM Elements ----------
  const cartItemsEl = document.getElementById('cartItems');
  const cartEmptyEl = document.getElementById('cartEmpty');
  const cartSummaryEl = document.getElementById('cartSummary');
  const cartCountEl = document.getElementById('cartCount');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartTaxEl = document.getElementById('cartTax');
  const cartDeliveryEl = document.getElementById('cartDelivery');
  const cartTotalEl = document.getElementById('cartTotal');
  const deliveryFeeRow = document.getElementById('deliveryFeeRow');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const checkoutModal = document.getElementById('checkoutModal');
  const confirmModal = document.getElementById('confirmModal');
  const modalClose = document.getElementById('modalClose');
  const checkoutForm = document.getElementById('checkoutForm');
  const checkoutTotal = document.getElementById('checkoutTotal');
  const mobileCartBtn = document.getElementById('mobileCartBtn');
  const mobileCartCount = document.getElementById('mobileCartCount');
  const mobileCartTotal = document.getElementById('mobileCartTotal');
  const cartSidebar = document.getElementById('cartSidebar');
  const orderNumber = document.getElementById('orderNumber');
  const deliveryFields = document.getElementById('deliveryFields');

  // ---------- Render Menu Items ----------
  function renderMenuSection(sectionId, items) {
    const container = document.getElementById(sectionId);
    if (!container) return;

    container.innerHTML = items.map(item => `
      <div class="order-item-card">
        <div class="order-item-image">
          <div class="img-placeholder dish">
            <i class="fas ${item.icon}"></i>
          </div>
          ${item.badge ? `<div class="order-item-badge">${item.badge}</div>` : ''}
        </div>
        <div class="order-item-body">
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
          <div class="order-item-footer">
            <span class="order-item-price">$${item.price}</span>
            <button class="add-to-cart-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">
              <i class="fas fa-plus"></i> Add
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Bind add-to-cart buttons
    container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const name = btn.dataset.name;
        const price = parseFloat(btn.dataset.price);
        addToCart(id, name, price);

        // Visual feedback
        btn.classList.add('added');
        btn.innerHTML = '<i class="fas fa-check"></i> Added';
        setTimeout(() => {
          btn.classList.remove('added');
          btn.innerHTML = '<i class="fas fa-plus"></i> Add';
        }, 1200);
      });
    });
  }

  // Render all sections
  renderMenuSection('popularItems', menuData.popular);
  renderMenuSection('starterItems', menuData.starters);
  renderMenuSection('mainItems', menuData.mains);
  renderMenuSection('seafoodItems', menuData.seafood);
  renderMenuSection('dessertItems', menuData.desserts);
  renderMenuSection('drinkItems', menuData.drinks);

  // ---------- Category Navigation ----------
  const catBtns = document.querySelectorAll('.order-cat-btn');
  const orderSections = document.querySelectorAll('.order-section');

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.cat;
      orderSections.forEach(section => {
        if (cat === 'all' || section.dataset.section === cat) {
          section.classList.remove('hidden');
        } else {
          section.classList.add('hidden');
        }
      });

      // Scroll to section
      const targetSection = document.querySelector(`[data-section="${cat}"]`);
      if (targetSection) {
        const navHeight = 80;
        const top = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---------- Order Type Toggle ----------
  const typeBtns = document.querySelectorAll('.order-type-btn');
  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      orderType = btn.dataset.type;

      if (deliveryFeeRow) {
        deliveryFeeRow.style.display = orderType === 'delivery' ? 'flex' : 'none';
      }
      if (deliveryFields) {
        deliveryFields.style.display = orderType === 'delivery' ? 'block' : 'none';
        deliveryFields.querySelectorAll('input, textarea').forEach(input => {
          input.required = orderType === 'delivery';
        });
      }

      updateCartDisplay();
    });
  });

  // ---------- Cart Functions ----------
  function addToCart(id, name, price) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id, name, price, qty: 1 });
    }
    updateCartDisplay();
    showToast(`${name} added to order`);
  }

  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartDisplay();
  }

  function updateQuantity(id, delta) {
    const item = cart.find(item => item.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(id);
      return;
    }
    updateCartDisplay();
  }

  function getSubtotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  function getTax() {
    return getSubtotal() * TAX_RATE;
  }

  function getTotal() {
    const subtotal = getSubtotal();
    const tax = getTax();
    const delivery = orderType === 'delivery' ? DELIVERY_FEE : 0;
    return subtotal + tax + delivery;
  }

  function getTotalItems() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }

  function formatPrice(amount) {
    return '$' + amount.toFixed(2);
  }

  function updateCartDisplay() {
    const totalItems = getTotalItems();
    const hasItems = totalItems > 0;

    // Cart count
    cartCountEl.textContent = totalItems === 1 ? '1 item' : `${totalItems} items`;

    // Toggle empty / items
    cartEmptyEl.style.display = hasItems ? 'none' : 'block';
    cartSummaryEl.style.display = hasItems ? 'block' : 'none';

    // Render cart items
    cartItemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${formatPrice(item.price * item.qty)}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" data-id="${item.id}" data-delta="-1">
            <i class="fas fa-minus"></i>
          </button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn" data-id="${item.id}" data-delta="1">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <button class="cart-item-remove" data-id="${item.id}">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `).join('');

    // Bind quantity buttons
    cartItemsEl.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        updateQuantity(parseInt(btn.dataset.id), parseInt(btn.dataset.delta));
      });
    });

    // Bind remove buttons
    cartItemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        removeFromCart(parseInt(btn.dataset.id));
      });
    });

    // Update totals
    cartSubtotalEl.textContent = formatPrice(getSubtotal());
    cartTaxEl.textContent = formatPrice(getTax());
    cartDeliveryEl.textContent = formatPrice(orderType === 'delivery' ? DELIVERY_FEE : 0);
    cartTotalEl.textContent = formatPrice(getTotal());

    // Mobile cart button
    if (mobileCartBtn) {
      if (hasItems) {
        mobileCartBtn.style.display = 'flex';
        mobileCartBtn.classList.remove('empty');
      } else {
        mobileCartBtn.classList.add('empty');
      }
      mobileCartCount.textContent = totalItems;
      mobileCartTotal.textContent = formatPrice(getTotal());
    }
  }

  // ---------- Mobile Cart Sidebar Toggle ----------
  if (mobileCartBtn && cartSidebar) {
    mobileCartBtn.addEventListener('click', () => {
      cartSidebar.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    // Close cart on background click / add close button
    const closeCartBtn = document.createElement('button');
    closeCartBtn.className = 'modal-close';
    closeCartBtn.innerHTML = '<i class="fas fa-xmark"></i>';
    closeCartBtn.style.cssText = 'display:none; position:absolute; top:16px; right:16px; z-index:10;';
    cartSidebar.style.position = 'relative';
    cartSidebar.appendChild(closeCartBtn);

    const closeCart = () => {
      cartSidebar.classList.remove('open');
      document.body.style.overflow = '';
    };

    closeCartBtn.addEventListener('click', closeCart);

    // Show close button on mobile
    const checkMobile = () => {
      closeCartBtn.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
  }

  // ---------- Checkout Modal ----------
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      checkoutTotal.textContent = formatPrice(getTotal());
      checkoutModal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Close mobile cart if open
      if (cartSidebar) cartSidebar.classList.remove('open');
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      checkoutModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close modal on overlay click
  [checkoutModal, confirmModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  });

  // ---------- Checkout Form Submission ----------
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Generate random order number
      if (orderNumber) {
        orderNumber.textContent = Math.floor(1000 + Math.random() * 9000);
      }

      // Close checkout, show confirmation
      checkoutModal.classList.remove('active');
      confirmModal.classList.add('active');

      // Clear cart
      cart = [];
      updateCartDisplay();
      checkoutForm.reset();
    });
  }

  // ---------- Initialize ----------
  updateCartDisplay();

});
