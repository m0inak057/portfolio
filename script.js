// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll for Navigation Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Animate certification items on scroll
    const certItems = document.querySelectorAll('.cert-item');
    const certOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const certObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, certOptions);

    certItems.forEach(item => {
        certObserver.observe(item);
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
        reply_to: email,  // This will set the Reply-To header
        email: email,     // This will be shown in the email body
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
