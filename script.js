document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const billingToggle = document.getElementById('billing-toggle');
  const labelMonthly = document.getElementById('label-monthly');
  const labelYearly = document.getElementById('label-yearly');
  
  const priceBasic = document.getElementById('price-basic');
  const pricePro = document.getElementById('price-pro');
  const pricePremium = document.getElementById('price-premium');
  
  const periodBasic = document.getElementById('period-basic');
  const periodPro = document.getElementById('period-pro');
  const periodPremium = document.getElementById('period-premium');
  
  const subscribeBasic = document.getElementById('subscribe-basic');
  const subscribePro = document.getElementById('subscribe-pro');
  const subscribePremium = document.getElementById('subscribe-premium');
  
  // Modal Elements
  const checkoutModal = document.getElementById('checkout-modal');
  const closeModal = document.getElementById('close-modal');
  const checkoutForm = document.getElementById('checkout-form');
  const checkoutStep = document.getElementById('checkout-step');
  const successStep = document.getElementById('success-step');
  
  const selectedPlanName = document.getElementById('selected-plan-name');
  const summaryPlan = document.getElementById('summary-plan');
  const summaryBilling = document.getElementById('summary-billing');
  const summaryPrice = document.getElementById('summary-price');
  
  const cardholderNameInput = document.getElementById('cardholder-name');
  const emailInput = document.getElementById('email');
  const cardNumberInput = document.getElementById('card-number');
  const cardExpiryInput = document.getElementById('card-expiry');
  const cardCvvInput = document.getElementById('card-cvv');
  
  const submitBtn = document.getElementById('submit-payment');
  const btnText = submitBtn.querySelector('.btn-text');
  const paymentSpinner = document.getElementById('payment-spinner');
  
  const successPlanName = document.getElementById('success-plan-name');
  const successPlanPrice = document.getElementById('success-plan-price');
  const successMemberId = document.getElementById('success-member-id');
  const successRenewalDate = document.getElementById('success-renewal-date');
  const successDoneBtn = document.getElementById('success-done-btn');
  
  const confettiCanvas = document.getElementById('confetti-canvas');
  
  // --- Pricing State ---
  // Plans configuration
  const prices = {
    monthly: { basic: 0, pro: 99, premium: 199 },
    yearly: { basic: 0, pro: 84, premium: 169 } // Billed yearly: Pro = ₹1008/yr, Premium = ₹2028/yr
  };
  
  let currentBillingCycle = 'monthly'; // 'monthly' or 'yearly'
  
  // --- Initialize Event Listeners ---
  billingToggle.addEventListener('click', toggleBilling);
  labelMonthly.addEventListener('click', () => { if (currentBillingCycle !== 'monthly') toggleBilling(); });
  labelYearly.addEventListener('click', () => { if (currentBillingCycle !== 'yearly') toggleBilling(); });
  
  subscribeBasic.addEventListener('click', () => openCheckout('Basic'));
  subscribePro.addEventListener('click', () => openCheckout('Pro'));
  subscribePremium.addEventListener('click', () => openCheckout('Premium'));
  
  closeModal.addEventListener('click', closeCheckout);
  checkoutModal.addEventListener('click', (e) => {
    if (e.target === checkoutModal) closeCheckout();
  });
  
  checkoutForm.addEventListener('submit', handlePaymentSubmit);
  successDoneBtn.addEventListener('click', closeCheckout);
  
  // Card Input Formatting Helpers
  cardNumberInput.addEventListener('input', formatCardNumber);
  cardExpiryInput.addEventListener('input', formatExpiryDate);
  cardCvvInput.addEventListener('input', formatCvv);
  
  // --- Toggle Billing Logic ---
  function toggleBilling() {
    if (currentBillingCycle === 'monthly') {
      currentBillingCycle = 'yearly';
      billingToggle.classList.add('yearly-active');
      labelMonthly.classList.remove('active');
      labelYearly.classList.add('active');
      
      // Update displayed prices & billing periods
      animatePriceUpdate(pricePro, prices.yearly.pro);
      animatePriceUpdate(pricePremium, prices.yearly.premium);
      
      periodPro.textContent = '/ month, billed yearly';
      periodPremium.textContent = '/ month, billed yearly';
    } else {
      currentBillingCycle = 'monthly';
      billingToggle.classList.remove('yearly-active');
      labelMonthly.classList.add('active');
      labelYearly.classList.remove('active');
      
      // Update displayed prices & billing periods
      animatePriceUpdate(pricePro, prices.monthly.pro);
      animatePriceUpdate(pricePremium, prices.monthly.premium);
      
      periodPro.textContent = '/ month';
      periodPremium.textContent = '/ month';
    }
  }
  
  function animatePriceUpdate(element, finalValue) {
    element.classList.add('price-fade-out');
    setTimeout(() => {
      element.textContent = finalValue;
      element.classList.remove('price-fade-out');
      element.classList.add('price-fade-in');
      setTimeout(() => element.classList.remove('price-fade-in'), 300);
    }, 150);
  }
  
  // --- Modal Management ---
  function openCheckout(planName) {
    // Populate plan details
    selectedPlanName.textContent = `${planName} Plan`;
    summaryPlan.textContent = planName;
    summaryBilling.textContent = currentBillingCycle.charAt(0).toUpperCase() + currentBillingCycle.slice(1);
    
    // Determine prices
    let priceText = '';
    let rawPrice = 0;
    
    if (planName === 'Basic') {
      priceText = 'Free';
      rawPrice = 0;
    } else {
      const planKey = planName.toLowerCase();
      const rate = prices[currentBillingCycle][planKey];
      if (currentBillingCycle === 'monthly') {
        priceText = `₹${rate}/month`;
        rawPrice = rate;
      } else {
        const yearlyTotal = rate * 12;
        priceText = `₹${yearlyTotal}/year (₹${rate}/mo)`;
        rawPrice = yearlyTotal;
      }
    }
    
    summaryPrice.textContent = priceText;
    
    // Premium Detail: If it's the free Basic plan, hide card fields and change button text
    const formFields = checkoutForm.querySelectorAll('.form-row, .form-group:nth-child(3), .form-group:nth-child(4)');
    const cardInputFields = [cardNumberInput, cardExpiryInput, cardCvvInput];
    
    if (planName === 'Basic') {
      // Hide payment fields
      cardInputFields.forEach(field => {
        field.required = false;
        const group = field.closest('.form-group') || field.closest('.form-row');
        if (group) group.style.display = 'none';
      });
      btnText.textContent = 'Activate Free Membership';
    } else {
      // Show payment fields
      cardInputFields.forEach(field => {
        field.required = true;
        const group = field.closest('.form-group') || field.closest('.form-row');
        if (group) group.style.display = 'flex';
      });
      btnText.textContent = `Confirm & Pay ${planName === 'Pro' ? (currentBillingCycle === 'monthly' ? '₹99' : '₹1008') : (currentBillingCycle === 'monthly' ? '₹199' : '₹2028')}`;
    }
    
    // Reset Form and View States
    checkoutForm.reset();
    checkoutStep.classList.add('active');
    successStep.classList.remove('active');
    submitBtn.disabled = false;
    paymentSpinner.classList.add('hidden');
    
    // Open Modal
    checkoutModal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Disable scroll on body
    
    // Focus first input field
    setTimeout(() => cardholderNameInput.focus(), 100);
  }
  
  function closeCheckout() {
    checkoutModal.classList.remove('open');
    document.body.style.overflow = ''; // Re-enable scroll
    stopConfetti();
  }
  
  // --- Payment Submission Simulation ---
  function handlePaymentSubmit(e) {
    e.preventDefault();
    
    const planName = summaryPlan.textContent;
    const amountText = summaryPrice.textContent;
    
    // Disable inputs and show loading state
    submitBtn.disabled = true;
    paymentSpinner.classList.remove('hidden');
    btnText.textContent = planName === 'Basic' ? 'Activating Plan...' : 'Processing Payment...';
    
    // Simulate secure network transaction delay
    setTimeout(() => {
      // Setup success screen data
      successPlanName.textContent = planName;
      successPlanPrice.textContent = amountText;
      
      // Generate confirmation details
      successMemberId.textContent = `PP-${Math.floor(100000 + Math.random() * 900000)}`;
      
      // Calculate renewal date
      const renewalDate = new Date();
      if (currentBillingCycle === 'monthly') {
        renewalDate.setMonth(renewalDate.getMonth() + 1);
      } else {
        renewalDate.setFullYear(renewalDate.getFullYear() + 1);
      }
      
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      successRenewalDate.textContent = planName === 'Basic' ? 'Never (Free Forever)' : renewalDate.toLocaleDateString('en-IN', options);
      
      // Switch view
      checkoutStep.classList.remove('active');
      successStep.classList.add('active');
      
      // Start celebration!
      startConfetti();
    }, 1500);
  }
  
  // --- Card Form Fields Formatter ---
  function formatCardNumber(e) {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }
    e.target.value = formattedValue;
  }
  
  function formatExpiryDate(e) {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (value.length > 2) {
      e.target.value = value.substring(0, 2) + '/' + value.substring(2, 4);
    } else {
      e.target.value = value;
    }
  }
  
  function formatCvv(e) {
    e.target.value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  }
  
  // --- Custom Confetti Particle System ---
  let confettiInterval;
  let animationFrameId;
  let particles = [];
  const colors = ['#5f5dec', '#8b5cf6', '#10b981', '#f59e0b', '#3b82f6', '#ec4899'];
  
  function startConfetti() {
    confettiCanvas.style.display = 'block';
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Spawn particles
    particles = [];
    for (let i = 0; i < 120; i++) {
      particles.push(createParticle());
    }
    
    // Update loop
    function update() {
      const ctx = confettiCanvas.getContext('2d');
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      
      let alive = false;
      particles.forEach((p) => {
        p.y += p.velocity;
        p.x += p.drift;
        p.rotation += p.rotationSpeed;
        
        if (p.y < confettiCanvas.height) {
          alive = true;
        }
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        ctx.restore();
      });
      
      if (alive) {
        animationFrameId = requestAnimationFrame(update);
      }
    }
    
    animationFrameId = requestAnimationFrame(update);
    
    // Add bursts periodically
    confettiInterval = setInterval(() => {
      for (let i = 0; i < 30; i++) {
        const p = createParticle();
        p.y = -10;
        particles.push(p);
      }
    }, 800);
  }
  
  function stopConfetti() {
    clearInterval(confettiInterval);
    cancelAnimationFrame(animationFrameId);
    confettiCanvas.style.display = 'none';
    window.removeEventListener('resize', resizeCanvas);
  }
  
  function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  
  function createParticle() {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * -window.innerHeight - 20,
      width: Math.random() * 8 + 6,
      height: Math.random() * 12 + 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      velocity: Math.random() * 3 + 2,
      drift: Math.random() * 2 - 1,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: Math.random() * 0.08 - 0.04
    };
  }
});
