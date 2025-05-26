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
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto';
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        mobileToggle.classList.remove('active');
        sidebar.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Event listeners with improved touch handling
    if (mobileToggle) {
        const handleMobileToggle = (e) => {
            e.preventDefault();
            if (e.type === 'touchstart') {
                mobileToggle.removeEventListener('click', handleMobileToggle);
            }
            toggleMobileMenu();
        };
        
        mobileToggle.addEventListener('click', handleMobileToggle);
        mobileToggle.addEventListener('touchstart', handleMobileToggle);
    }
    
    if (mobileOverlay) {
        const handleOverlay = (e) => {
            e.preventDefault();
            if (e.type === 'touchstart') {
                mobileOverlay.removeEventListener('click', handleOverlay);
            }
            closeMobileMenu();
        };
        
        mobileOverlay.addEventListener('click', handleOverlay);
        mobileOverlay.addEventListener('touchstart', handleOverlay);
    }
    
    // Close menu when clicking nav links with improved touch handling
    navLinks.forEach(link => {
        const handleNavLink = (e) => {
            if (e.type === 'touchstart') {
                e.preventDefault();
                link.removeEventListener('click', handleNavLink);
            }
            if (window.innerWidth <= 480) {
                closeMobileMenu();
            }
        };
        
        link.addEventListener('click', handleNavLink);
        link.addEventListener('touchstart', handleNavLink);
    });
    
    // Handle project demo links (Live Demo) for both click and touch
    const demoLinks = document.querySelectorAll('.project-links a');
    demoLinks.forEach(link => {
        const openDemo = (e) => {
            e.preventDefault();
            window.open(link.href, '_blank');
        };
        link.addEventListener('click', openDemo);
        link.addEventListener('touchend', openDemo, { passive: false });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 480) {
            closeMobileMenu();
        }
    });
    // Smooth Scroll for Navigation Links with improved touch handling
    document.querySelectorAll('nav a').forEach(anchor => {
        const handleScroll = (e) => {
            e.preventDefault();
            if (e.type === 'touchstart') {
                anchor.removeEventListener('click', handleScroll);
            }
            const targetId = anchor.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        };

        anchor.addEventListener('click', handleScroll);
        anchor.addEventListener('touchstart', handleScroll);
    });

    // Education Modal Functionality with improved touch handling
    const educationItems = document.querySelectorAll('.education-item');
    const educationModal = document.getElementById('education-modal');
    const educationModalTitle = document.getElementById('education-modal-title');
    const closeButtons = document.querySelectorAll('.close-modal');

    educationItems.forEach(item => {
        item.style.cursor = 'pointer';
        
        const handleEducationClick = (e) => {
            if (e.type === 'touchstart') {
                e.preventDefault();
                item.removeEventListener('click', handleEducationClick);
            }
            
            const eduType = item.getAttribute('data-edu');
            const title = item.querySelector('h3').textContent;
            
            // Hide all detail sections first
            document.querySelectorAll('.education-details').forEach(detail => {
                detail.style.display = 'none';
            });
            
            // Show the selected detail section
            const detailSection = document.getElementById(`${eduType}-details`);
            if (detailSection) {
                detailSection.style.display = 'block';
            }
            
            educationModalTitle.textContent = title;
            educationModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };

        item.addEventListener('click', handleEducationClick);
        item.addEventListener('touchstart', handleEducationClick);
    });

    // Certificate Modal Functionality for both click and touch
    const certLinks = document.querySelectorAll('.cert-link');
    const certificateModal = document.getElementById('certificate-modal');
    const certificateImage = document.getElementById('certificate-image');
    
    certLinks.forEach(link => {
        const openCertModal = (e) => {
            e.preventDefault();
            certificateImage.src = link.getAttribute('href');
            certificateModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };
        link.addEventListener('click', openCertModal);
        link.addEventListener('touchend', openCertModal, { passive: false });
    });

    // Close modals with improved touch handling
    closeButtons.forEach(btn => {
        const handleModalClose = (e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent event bubbling
            
            // For touch events, prevent the click event from firing
            if (e.type === 'touchend') {
                btn.removeEventListener('click', handleModalClose);
            }
            
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
            if (certificateImage) {
                certificateImage.src = '';
            }
        };

        btn.addEventListener('click', handleModalClose);
        btn.addEventListener('touchend', handleModalClose, { passive: false });
    });

    // Close modal when clicking outside with improved touch handling
    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('modal')) {
            // Only prevent default for touch events
            if (e.type === 'touchend') {
                e.preventDefault();
                e.stopPropagation();
                window.removeEventListener('click', handleOutsideClick);
            }
            
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
            if (certificateImage && e.target === certificateModal) {
                certificateImage.src = '';
            }
        }
    };

    window.addEventListener('click', handleOutsideClick);
    window.addEventListener('touchend', handleOutsideClick, { passive: false });

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
    
    // Contact form submit button with improved touch handling
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        const handleSubmit = (e) => {
            if (e.type === 'touchstart') {
                e.preventDefault();
                submitBtn.removeEventListener('click', handleSubmit);
            }
            const form = document.getElementById('contactForm');
            if (form) {
                sendEmail(e);
            }
        };

        submitBtn.addEventListener('click', handleSubmit);
        submitBtn.addEventListener('touchstart', handleSubmit);
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
