// Load products from folder
function loadProducts() {
    const products = [
        {
            name: 'MEGTONE',
            image: 'product name 1.png',
            details: [
                {
                    name: 'Cattle Feed Supplements (1 Liter)',
                    image: 'product 1.png',
                    tips: 'Shake well before use so that you get balanced nutrition in every drop. Megha Pashuaahar: Healthy Animals, Prosperous Farmers!',
                    price: '₹180'
                },
                {
                    name: 'Cattle Feed Supplements (2 Liter)',
                    image: 'product 2.png',
                    tips: 'Shake well before use so that you get balanced nutrition in every drop. Megha Pashuaahar: Healthy Animals, Prosperous Farmers!',
                    price: '₹320'
                },
                {
                    name: 'Cattle Feed Supplements (3 Liter)',
                    image: 'product 3.png',
                    tips: 'Shake well before use so that you get balanced nutrition in every drop. Megha Pashuaahar: Healthy Animals, Prosperous Farmers!',
                    price: '₹750'
                }
            ]
        },
        {
            name: 'MEGTOVET',
            image: 'product name 2.png',
            details: [
                {
                    name: 'Cattle Feed Supplements (1 Liter)',
                    image: 'product 4.png',
                    tips: 'Shake well before use so that you get balanced nutrition in every drop. Megha Pashuaahar: Healthy Animals, Prosperous Farmers!',
                    price: '₹180'
                },
                {
                    name: 'Cattle Feed Supplements (2 Liter)',
                    image: 'product 5.png',
                    tips: 'Shake well before use so that you get balanced nutrition in every drop. Megha Pashuaahar: Healthy Animals, Prosperous Farmers!',
                    price: '₹320'
                },
                {
                    name: 'Cattle Feed Supplements (3 Liter)',
                    image: 'product 6.png',
                    tips: 'Shake well before use so that you get balanced nutrition in every drop. Megha Pashuaahar: Healthy Animals, Prosperous Farmers!',
                    price: '₹750'
                }
            ]
        }
    ];

    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    products.forEach((product) => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="products/${product.image}" alt="${product.name}">
            <div class="product-item-info">
                <h3>${product.name}</h3>
            </div>
        `;
        
        productItem.addEventListener('click', () => {
            openProductModal(product);
        });
        
        productsGrid.appendChild(productItem);
    });
}

// Open Product Modal with Details
function openProductModal(product) {
    const modal = document.getElementById('productModal');
    const modalProductName = document.getElementById('modalProductName');
    const productDetailsGrid = document.getElementById('productDetailsGrid');

    modalProductName.textContent = product.name;
    productDetailsGrid.innerHTML = '';

    product.details.forEach((detail) => {
        const detailCard = document.createElement('div');
        detailCard.className = 'product-detail-card';
        detailCard.innerHTML = `
            <div class="product-detail-image">
                <img src="products/${detail.image}" alt="${detail.name}">
            </div>
            <div class="product-detail-info">
                <h3>${detail.name}</h3>
                <div class="product-tips">
                    <strong>Pro Tips:</strong> ${detail.tips}
                </div>
                <div class="product-detail-price">${detail.price}</div>
                <button class="order-btn" onclick="openOrderForm('${detail.name}', '${detail.price}')">Order Now</button>
            </div>
        `;
        productDetailsGrid.appendChild(detailCard);
    });

    modal.style.display = 'block';
}

// Open Order Form
function openOrderForm(productName, price) {
    const orderModal = document.getElementById('orderModal');
    document.getElementById('orderProductName').value = productName;
    document.getElementById('orderPrice').value = price;
    document.getElementById('orderName').value = '';
    document.getElementById('orderPhone').value = '';
    document.getElementById('orderQuantity').value = 1;
    document.getElementById('orderAddress').value = '';
    document.getElementById('orderRequirements').value = '';
    orderModal.style.display = 'block';
}

// Close Order Modal
function closeOrderModal() {
    const orderModal = document.getElementById('orderModal');
    orderModal.style.display = 'none';
}

// Close modal when clicking X
document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.getElementById('productModal').style.display = 'none';
        });
    }

    const closeOrderBtn = document.querySelector('.close-order');
    if (closeOrderBtn) {
        closeOrderBtn.addEventListener('click', closeOrderModal);
    }

    // Close modal when clicking outside
    const modal = document.getElementById('productModal');
    const orderModal = document.getElementById('orderModal');
    
    if (modal) {
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
            if (event.target == orderModal) {
                orderModal.style.display = 'none';
            }
        });
    }

    // Handle order form submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const productName = document.getElementById('orderProductName').value;
            const price = document.getElementById('orderPrice').value;
            const name = document.getElementById('orderName').value;
            const phone = document.getElementById('orderPhone').value;
            const quantity = document.getElementById('orderQuantity').value;
            const address = document.getElementById('orderAddress').value;
            const requirements = document.getElementById('orderRequirements').value;

            // Validate phone number (basic validation)
            if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
                alert('Please enter a valid 10-digit phone number');
                return;
            }

            // Create Email message
            const orderMessage = `
Product Name: ${productName}
Price: ${price}
Quantity: ${quantity}

Customer Details:
Name: ${name}
Phone: ${phone}
Address: ${address}
${requirements ? `Special Requirements: ${requirements}` : ''}

Please confirm availability and delivery time.
            `;

            // Email configuration
            const recipientEmail = 'meghapashuaahar@gmail.com'; // Your email
            const subject = `New Order: ${productName}`;
            const body = encodeURIComponent(orderMessage);
            const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;

            // Open email client
            window.location.href = mailtoLink;

            // Close order modal
            closeOrderModal();
            
            // Show success message
            setTimeout(() => {
                alert('✅ Order Placed Successfully!\n\nYour order details have been sent to our email.\nWe will contact you soon at +91 9431409815 to confirm your order.');
            }, 500);
            
            // Reset form
            this.reset();
        });
    }

    // Load products first
    loadProducts();
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                navLinks.style.display = 'flex';
            } else {
                navLinks.style.display = 'none';
            }
        });
    }

    // Close menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navLinks.style.display = 'none';
            }
        });
    });

    // Handle contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageTextarea = this.querySelector('textarea');
            
            const name = nameInput.value;
            const email = emailInput.value;
            const message = messageTextarea.value;

            // Simple validation
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Please fill in all fields');
                return;
            }

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Send email using mailto with cc to company email
            const companyEmail = 'meghapashuaahar@gmail.com';
            const subject = encodeURIComponent('Contact Form Submission from ' + name);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            
            window.location.href = `mailto:${companyEmail}?subject=${subject}&body=${body}`;

            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }

    // Add smooth scroll behavior for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and service items
    const cards = document.querySelectorAll('.about-card, .service-card, .feature-item, .info-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    });
});
