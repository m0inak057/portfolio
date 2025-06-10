// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle Functionality
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        mobileToggle.classList.toggle('active');
        sidebar.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        mobileToggle.classList.remove('active');
        sidebar.classList.remove('active');
        mobileOverlay.classList.remove('active');
    }
    
    // Event listeners with improved touch handling
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
        mobileToggle.addEventListener('touchstart', (e) => {
            e.preventDefault();
            toggleMobileMenu();
        }, { passive: false });
    }
    
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
        mobileOverlay.addEventListener('touchstart', (e) => {
            e.preventDefault();
            closeMobileMenu();
        }, { passive: false });
    }
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 480) {
                closeMobileMenu();
            }
        });
        link.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (window.innerWidth <= 480) {
                closeMobileMenu();
            }
        }, { passive: false });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 480) {
            closeMobileMenu();
        }
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Education Modal Functionality
    const educationItems = document.querySelectorAll('.education-item');
    const educationModal = document.getElementById('education-modal');
    const educationModalTitle = document.getElementById('education-modal-title');
    const closeButtons = document.querySelectorAll('.close-modal');

    educationItems.forEach(item => {
        item.style.cursor = 'pointer';
        
        item.addEventListener('click', () => {
            const eduType = item.getAttribute('data-edu');
            const title = item.querySelector('h3').textContent;
            
            document.querySelectorAll('.education-details').forEach(detail => {
                detail.style.display = 'none';
            });
            
            const detailSection = document.getElementById(`${eduType}-details`);
            if (detailSection) {
                detailSection.style.display = 'block';
            }
            
            educationModalTitle.textContent = title;
            educationModal.style.display = 'block';
        });
    });

    // Certificate Modal Functionality
    const certLinks = document.querySelectorAll('.cert-link');
    const certificateModal = document.getElementById('certificate-modal');
    const certificateImage = document.getElementById('certificate-image');
    
    certLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            certificateImage.src = link.getAttribute('href');
            certificateModal.style.display = 'block';
        });
    });

    // Close modals
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
            if (certificateImage) {
                certificateImage.src = '';
            }
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            if (certificateImage && e.target === certificateModal) {
                certificateImage.src = '';
            }
        }
    });

    // Animate skill tags on scroll
    const skillTags = document.querySelectorAll('.skill-tag');
    const skillOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, skillOptions);

    skillTags.forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        skillObserver.observe(tag);
    });
    
    // Contact form submit button
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            const form = document.getElementById('contactForm');
            if (form) {
                sendEmail(e);
            }
        });
    }
});

// Email sending functionality
function sendEmail(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // EmailJS send email
    emailjs.send('service_snhvtuv', 'template_bd1c457', {
        to_name: 'Moinak',
        to_email: 'moinak.mondal057@gmail.com',
        from_name: name,
        reply_to: email,
        email: email,
        subject: subject,
        message: message,
    }).then(
        function(response) {
            alert('Message sent successfully!');
            document.getElementById('contactForm').reset();
        },
        function(error) {
            alert('Failed to send message. Please try again.');
            console.error('EmailJS Error:', error);
        }
    );

    return false;
}
