document.addEventListener('DOMContentLoaded', function() {
    const calendlyUrl = 'https://calendly.com/learningtimevr-demo/30min';

    // Function to open Calendly popup
    function openCalendly(url) {
        Calendly.initPopupWidget({ url: url });
        return false; // Prevent default anchor behavior if used with <a>
    }

    // --- Event Listeners for Scheduling Buttons ---

    // Header Button
    const scheduleHeaderBtn = document.getElementById('schedule-header-btn');
    if (scheduleHeaderBtn) {
        scheduleHeaderBtn.addEventListener('click', function() {
            openCalendly(calendlyUrl);
        });
    }

    // Hero Section Button
    const heroScheduleBtn = document.getElementById('hero-schedule-btn');
    if (heroScheduleBtn) {
        heroScheduleBtn.addEventListener('click', function() {
            openCalendly(calendlyUrl);
        });
    }

    // Virtual Training / Lesson Planning Button
    const scheduleVirtualBtn = document.getElementById('schedule-virtual-btn');
    if (scheduleVirtualBtn) {
        scheduleVirtualBtn.addEventListener('click', function() {
            openCalendly(calendlyUrl);
        });
    }

    // In-Class Facilitation Button
    const scheduleInClassBtn = document.getElementById('schedule-inclass-btn');
    if (scheduleInClassBtn) {
        scheduleInClassBtn.addEventListener('click', function() {
            // Assuming this uses the same Calendly link for now
            // Change calendlyUrl here if it's a different link
            openCalendly(calendlyUrl);
        });
    }

    // Classroom Visits Page Button (added)
    const scheduleVisitBtn = document.getElementById('schedule-visit-btn');
    if (scheduleVisitBtn) {
        scheduleVisitBtn.addEventListener('click', function() {
             openCalendly(calendlyUrl);
        });
    }

    // Headsets Page Button (added)
    const scheduleHeadsetsBtn = document.getElementById('schedule-headsets-btn');
    if (scheduleHeadsetsBtn) {
        scheduleHeadsetsBtn.addEventListener('click', function() {
             openCalendly(calendlyUrl);
        });
    }

    // Management Software Page Button (added)
    const scheduleSoftwareBtn = document.getElementById('schedule-software-btn');
    if (scheduleSoftwareBtn) {
        scheduleSoftwareBtn.addEventListener('click', function() {
             openCalendly(calendlyUrl);
        });
    }

    // --- Wait for Header to Load before setting up Hamburger Menu ---
    window.headerLoadedPromise.then(() => {
        console.log('Header loaded, attempting to set up hamburger menu...'); // DEBUG

        // --- Hamburger Menu Logic --- 
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mobileNav = document.getElementById('mobile-nav');
        const bodyEl = document.body;
        const overlay = document.getElementById('mobile-nav-overlay'); // Get overlay

        // DEBUG: Log found elements
        console.log('Hamburger Button Element:', hamburgerBtn);
        console.log('Mobile Nav Element:', mobileNav);
        console.log('Overlay Element:', overlay);
        console.log('Body Element:', bodyEl);

        if (hamburgerBtn && mobileNav && overlay && bodyEl) { // Check for bodyEl too
            console.log('Hamburger menu elements FOUND, adding listeners.'); // DEBUG
            hamburgerBtn.addEventListener('click', function(event) { // Add event parameter
                console.log('Hamburger button CLICKED!'); // DEBUG
                // event.stopPropagation(); // Optional: Stop event bubbling if needed
                bodyEl.classList.toggle('mobile-nav-active');
                console.log('Toggled mobile-nav-active class. Body classes:', bodyEl.className); // DEBUG
                const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
                hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
            });

            // Close menu when clicking overlay
            overlay.addEventListener('click', function() {
                console.log('Overlay CLICKED!'); // DEBUG
                bodyEl.classList.remove('mobile-nav-active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            });
        } else {
             console.error('Hamburger menu elements NOT FOUND. Check IDs in header partials.'); // DEBUG: Updated error msg
        }

        // Add listeners for mobile schedule buttons (assuming they use the same Calendly link)
        const scheduleMobileBtn = document.getElementById('schedule-mobile-btn');
        if (scheduleMobileBtn) {
            scheduleMobileBtn.addEventListener('click', function() {
                openCalendly(calendlyUrl);
                // Close menu after click - only if it's currently active
                if (bodyEl.classList.contains('mobile-nav-active')) { 
                    bodyEl.classList.remove('mobile-nav-active');
                    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }
        const scheduleMobileSupportBtn = document.getElementById('schedule-mobile-support-btn');
        if (scheduleMobileSupportBtn) {
            scheduleMobileSupportBtn.addEventListener('click', function() {
                openCalendly(calendlyUrl); // Assuming same link
                 // Close menu after click - only if it's currently active
                if (bodyEl.classList.contains('mobile-nav-active')) { 
                    bodyEl.classList.remove('mobile-nav-active'); 
                    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }

    }).catch(error => {
        console.error('Failed to initialize hamburger menu due to header loading error:', error);
    });

    // --- Start Here Button Functionality (Placeholder) ---
    const startHereButton = document.querySelector('.start-here .arrow-btn');
    const startHereInput = document.querySelector('.start-here input');
    if (startHereButton && startHereInput) {
        startHereButton.addEventListener('click', function() {
            const query = startHereInput.value;
            console.log('Searching for:', query); // Placeholder action
            // In a real application, you would redirect to a search results page
            // or filter content dynamically.
            alert('Search functionality not yet implemented for: ' + query);
        });
    }

    // --- Start Here Button Particle Effect (Cursor Repel) ---
    const startHereLink = document.getElementById('start-here-link');

    if (startHereLink) {
        const numParticles = 15; // Number of particles
        const particles = [];
        const repelDistance = 50; // How far particles should move away (pixels)
        const repelThreshold = 70; // How close the cursor needs to be to trigger repel (pixels)

        // Create and store particles
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            startHereLink.appendChild(particle);

            // Store original random position (percentage)
            const initialX = Math.random() * 100;
            const initialY = Math.random() * 100;
            particle.style.left = `${initialX}%`;
            particle.style.top = `${initialY}%`;

            // Store reference and initial position
            particles.push({ element: particle, initialX, initialY });
        }

        // Mouse move listener
        startHereLink.addEventListener('mousemove', (e) => {
            const rect = startHereLink.getBoundingClientRect();
            // Cursor position relative to the button
            const cursorX = e.clientX - rect.left;
            const cursorY = e.clientY - rect.top;

            particles.forEach(p => {
                const particleRect = p.element.getBoundingClientRect();
                // Particle center position relative to the button
                const particleX = (particleRect.left - rect.left) + particleRect.width / 2;
                const particleY = (particleRect.top - rect.top) + particleRect.height / 2;

                // Calculate distance and angle from cursor to particle
                const dx = particleX - cursorX;
                const dy = particleY - cursorY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx);

                // If close enough, repel the particle
                if (distance < repelThreshold) {
                    const moveX = Math.cos(angle) * repelDistance;
                    const moveY = Math.sin(angle) * repelDistance;

                    // Calculate new position relative to button edge (pixels)
                    let newX = particleX + moveX;
                    let newY = particleY + moveY;

                    // Clamp position within button bounds (approximate)
                    newX = Math.max(p.element.offsetWidth / 2, Math.min(rect.width - p.element.offsetWidth / 2, newX));
                    newY = Math.max(p.element.offsetHeight / 2, Math.min(rect.height - p.element.offsetHeight / 2, newY));

                    // Set new position in pixels relative to top-left
                    p.element.style.left = `${newX - p.element.offsetWidth / 2}px`;
                    p.element.style.top = `${newY - p.element.offsetHeight / 2}px`;
                } else {
                    // If far away, return to original position
                    p.element.style.left = `${p.initialX}%`;
                    p.element.style.top = `${p.initialY}%`;
                }
            });
        });

        // Mouse leave listener to reset positions
        startHereLink.addEventListener('mouseleave', () => {
            particles.forEach(p => {
                p.element.style.left = `${p.initialX}%`;
                p.element.style.top = `${p.initialY}%`;
            });
        });
    }

}); 