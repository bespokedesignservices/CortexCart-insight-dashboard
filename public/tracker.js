
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
    timestamp: new Date().toISOString()
  };
  
  // Send visitor info immediately
  if (window.rctk) {
    window.rctk('event', 'visitor_info', visitorData);
  }
  
  // Track add to cart events
  function setupCartTracking() {
    // Find elements that look like "Add to cart" buttons
    const cartButtons = Array.from(document.querySelectorAll('button, a')).filter(el => {
      const text = el.textContent.toLowerCase();
      return text.includes('cart') || text.includes('basket') || text.includes('buy');
    });
    
    cartButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        // Try to get product info from nearby elements
        const container = button.closest('div, section, article');
        let productTitle = '';
        let productPrice = '';
        
        if (container) {
          const titleEl = container.querySelector('h1, h2, h3, .product-title');
          const priceEl = container.querySelector('.price, [data-price]');
          
          if (titleEl) productTitle = titleEl.textContent.trim();
          if (priceEl) productPrice = priceEl.textContent.trim();
        }
        
        window.rctk('event', 'add_to_cart', {
          product: productTitle || 'Unknown Product',
          price: productPrice || 'Unknown Price',
          timestamp: new Date().toISOString()
        });
      });
    });
  }
  
  // Set up cart tracking after page load
  if (document.readyState === 'complete') {
    setupCartTracking();
  } else {
    window.addEventListener('load', setupCartTracking);
  }
})();
