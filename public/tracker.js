
// RecoAI Tracker Core
(function() {
  console.log('RecoAI Tracker loaded successfully');
  
  // Extract visitor data
  const visitorData = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timestamp: new Date().toISOString(),
    referrer: document.referrer || 'direct',
    sessionId: generateSessionId()
  };
  
  // Generate a unique session ID
  function generateSessionId() {
    return 'sess_' + Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
  
  // Send visitor info immediately
  if (window.rctk) {
    window.rctk('event', 'visitor_info', visitorData);
  }
  
  // Track page views
  function trackPageView() {
    window.rctk('event', 'page_view', {
      url: window.location.href,
      title: document.title,
      referrer: document.referrer || 'direct',
      timestamp: new Date().toISOString()
    });
  }
  
  // Track add to cart events
  function setupCartTracking() {
    // Find elements that look like "Add to cart" buttons
    const cartButtons = Array.from(document.querySelectorAll('button, a')).filter(el => {
      const text = (el.textContent || '').toLowerCase();
      return text.includes('cart') || text.includes('basket') || text.includes('buy');
    });
    
    cartButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        // Try to get product info from nearby elements
        const container = button.closest('div, section, article');
        let productTitle = '';
        let productPrice = '';
        let productId = '';
        let productImage = '';
        
        if (container) {
          const titleEl = container.querySelector('h1, h2, h3, .product-title, [data-product-title]');
          const priceEl = container.querySelector('.price, [data-price]');
          const idEl = container.querySelector('[data-product-id]');
          const imgEl = container.querySelector('img');
          
          if (titleEl) productTitle = titleEl.textContent.trim();
          if (priceEl) productPrice = priceEl.textContent.trim();
          if (idEl) productId = idEl.getAttribute('data-product-id') || '';
          if (imgEl) productImage = imgEl.getAttribute('src') || '';
        }
        
        window.rctk('event', 'add_to_cart', {
          product_id: productId || 'unknown_id',
          product: productTitle || 'Unknown Product',
          price: productPrice || 'Unknown Price',
          image_url: productImage || '',
          timestamp: new Date().toISOString(),
          url: window.location.href
        });
      });
    });
  }
  
  // Track checkout events
  function setupCheckoutTracking() {
    const checkoutButtons = Array.from(document.querySelectorAll('button, a')).filter(el => {
      const text = (el.textContent || '').toLowerCase();
      return text.includes('checkout') || text.includes('pay') || text.includes('purchase');
    });
    
    checkoutButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        window.rctk('event', 'begin_checkout', {
          timestamp: new Date().toISOString(),
          url: window.location.href
        });
      });
    });
    
    // Look for forms that might be checkout forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      if (form.querySelector('input[type="email"]') && 
          (form.querySelector('input[name*="address"]') || 
           form.querySelector('input[name*="card"]'))) {
        
        form.addEventListener('submit', function(e) {
          window.rctk('event', 'purchase', {
            timestamp: new Date().toISOString(),
            url: window.location.href
          });
        });
      }
    });
  }
  
  // Track promo code usage
  function setupPromoCodeTracking() {
    const promoInputs = Array.from(document.querySelectorAll('input')).filter(el => {
      const name = (el.name || '').toLowerCase();
      const placeholder = (el.placeholder || '').toLowerCase();
      return name.includes('promo') || name.includes('coupon') || name.includes('discount') ||
             placeholder.includes('promo') || placeholder.includes('coupon') || placeholder.includes('discount');
    });
    
    promoInputs.forEach(input => {
      const form = input.closest('form');
      if (form) {
        form.addEventListener('submit', function() {
          const promoCode = input.value;
          if (promoCode) {
            window.rctk('event', 'apply_promo', {
              promo_code: promoCode,
              timestamp: new Date().toISOString(),
              url: window.location.href
            });
          }
        });
      }
    });
  }
  
  // Track product impressions
  function trackProductImpressions() {
    // Look for product listings
    const productContainers = document.querySelectorAll('.product, [data-product-id], .product-item');
    
    if (productContainers.length > 0) {
      const products = Array.from(productContainers).map(container => {
        const titleEl = container.querySelector('h1, h2, h3, .product-title, [data-product-title]');
        const priceEl = container.querySelector('.price, [data-price]');
        const idEl = container.querySelector('[data-product-id]');
        const imgEl = container.querySelector('img');
        
        return {
          product_id: idEl ? idEl.getAttribute('data-product-id') : 'unknown_id',
          product: titleEl ? titleEl.textContent.trim() : 'Unknown Product',
          price: priceEl ? priceEl.textContent.trim() : 'Unknown Price',
          image_url: imgEl ? imgEl.getAttribute('src') : '',
          url: window.location.href
        };
      });
      
      window.rctk('event', 'product_impressions', {
        products,
        timestamp: new Date().toISOString(),
        url: window.location.href
      });
    }
  }
  
  // Setup cart abandonment tracking
  function setupCartAbandonmentTracking() {
    if (document.querySelector('.cart, .shopping-cart, #cart, [data-cart]')) {
      // If we're on a cart page, record the cart state
      localStorage.setItem('recoai_cart_timestamp', new Date().toISOString());
      
      // Track when user leaves the cart page without checking out
      window.addEventListener('beforeunload', function() {
        const checkoutStarted = sessionStorage.getItem('recoai_checkout_started');
        if (!checkoutStarted) {
          window.rctk('event', 'cart_abandonment', {
            timestamp: new Date().toISOString(),
            url: window.location.href
          });
        }
      });
    }
    
    // Mark checkout as started when user clicks checkout button
    const checkoutButtons = Array.from(document.querySelectorAll('button, a')).filter(el => {
      const text = (el.textContent || '').toLowerCase();
      return text.includes('checkout') || text.includes('proceed to');
    });
    
    checkoutButtons.forEach(button => {
      button.addEventListener('click', function() {
        sessionStorage.setItem('recoai_checkout_started', 'true');
      });
    });
  }
  
  // Track user interactions on the page
  function setupUserInteractionTracking() {
    // Track clicks on major elements
    document.addEventListener('click', function(e) {
      const target = e.target.closest('a, button, [role="button"], .btn') || e.target;
      if (target.tagName) {
        window.rctk('event', 'user_interaction', {
          element_type: target.tagName.toLowerCase(),
          element_text: target.innerText ? target.innerText.substring(0, 50) : '',
          element_id: target.id || '',
          element_class: target.className || '',
          url_path: window.location.pathname,
          timestamp: new Date().toISOString()
        });
      }
    });
    
    // Track form submissions
    document.addEventListener('submit', function(e) {
      const form = e.target;
      window.rctk('event', 'form_submission', {
        form_id: form.id || '',
        form_name: form.name || '',
        form_action: form.action || '',
        url_path: window.location.pathname,
        timestamp: new Date().toISOString()
      });
    });
  }
  
  // Set up all tracking after page load
  function setupAllTracking() {
    trackPageView();
    setupCartTracking();
    setupCheckoutTracking();
    setupPromoCodeTracking();
    trackProductImpressions();
    setupCartAbandonmentTracking();
    setupUserInteractionTracking();
    
    // Record time spent on page when user leaves
    let pageLoadTime = new Date();
    window.addEventListener('beforeunload', function() {
      const timeSpentMs = new Date() - pageLoadTime;
      window.rctk('event', 'page_exit', {
        time_spent_seconds: Math.round(timeSpentMs / 1000),
        url: window.location.href,
        timestamp: new Date().toISOString()
      });
    });
  }
  
  // Set up tracking after page load
  if (document.readyState === 'complete') {
    setupAllTracking();
  } else {
    window.addEventListener('load', setupAllTracking);
  }
})();
