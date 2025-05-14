document.addEventListener('DOMContentLoaded', function() {
    console.log('[Debug] DOMContentLoaded: Event fired. Checking for footer-placeholder immediately.');
    const initialFooterPlaceholderCheck = document.getElementById('footer-placeholder');
    if (initialFooterPlaceholderCheck) {
        console.log('[Debug] DOMContentLoaded: SUCCESS - Found footer-placeholder immediately.');
    } else {
        console.error('[Debug] DOMContentLoaded: CRITICAL FAILURE - footer-placeholder was NOT FOUND immediately on DOMContentLoaded.');
        // Logging body.innerHTML here might be too early if body itself isn't fully ready, 
        // but let's try to get some insight if the element is missing this early.
        if (document.body) {
            console.log('[Debug] DOMContentLoaded (footer-placeholder not found): document.body.innerHTML was:', document.body.innerHTML);
        } else {
            console.log('[Debug] DOMContentLoaded (footer-placeholder not found): document.body was null.');
        }
    }

    const calendlyUrl = 'https://calendly.com/learningtimevr-demo/30min';

    // --- Function to load HTML partials ---
    function loadHTML(url, elementId, callback) {
        console.log(`[Debug] loadHTML: Called with url='${url}', elementId='${elementId}'`); // Log parameters
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok for ' + url);
                }
                return response.text();
            })
            .then(data => {
                console.log(`[Debug] loadHTML for '${elementId}': Fetched data. Attempting to find element by ID.`); // Log before finding element
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = data;
                    if (callback) callback(); // Execute callback function if provided
                } else {
                    console.error(`[Debug] loadHTML for '${elementId}': CRITICAL - Element with ID '${elementId}' was NOT FOUND by document.getElementById.`);
                }
            })
            .catch(error => console.error('Error loading HTML partial:', error));
    }

    // Function to open Calendly popup
    function openCalendly(url) {
        Calendly.initPopupWidget({ url: url });
        return false; // Prevent default anchor behavior if used with <a>
    }

    // --- Event Listeners for Scheduling Buttons ---

    // Header Button - Moved inside headerLoadedPromise below
    // const scheduleHeaderBtn = document.getElementById('schedule-header-btn');
    // if (scheduleHeaderBtn) {
    //     scheduleHeaderBtn.addEventListener('click', function() {
    //         openCalendly(calendlyUrl);
    //     });
    // }

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
        // console.log('Header loaded, attempting to set up hamburger menu...'); // DEBUG

        // --- Load Footer (now that header is confirmed loaded, defer slightly) --- 
        setTimeout(function() {
            console.log('[Debug] Footer setTimeout: Checking for footer-placeholder in DOM right before calling loadHTML...');
            const checkFooterElement = document.getElementById('footer-placeholder');
            if (checkFooterElement) {
                console.log('[Debug] Footer setTimeout: SUCCESS - Found footer-placeholder via getElementById:', checkFooterElement);
            } else {
                console.log('[Debug] DOM State when footer-placeholder is NULL: document.body.innerHTML was:', document.body.innerHTML); // Log innerHTML of body
                console.error('[Debug] Footer setTimeout: CRITICAL FAILURE - footer-placeholder is NULL via getElementById right before calling loadHTML.');
            }

            loadHTML('components/footer.html', 'footer-placeholder', function() {
                console.log('Footer HTML loaded successfully into footer-placeholder.'); // DEBUG
                const yearSpan = document.getElementById('copyright-year');
                if (yearSpan) {
                    yearSpan.textContent = new Date().getFullYear();
                    console.log('Copyright year set.'); // DEBUG
                } else {
                    console.error('Could not find copyright-year span after loading footer.'); // DEBUG
                }
            });
        }, 0);

        // Wrap header-dependent logic in setTimeout to ensure DOM is ready
        setTimeout(function() {
            console.log('Header loaded, (deferred via setTimeout) attempting to set up listeners...'); // DEBUG

            // Add Header Button Listener HERE
            const scheduleHeaderBtn = document.getElementById('schedule-header-btn');
            if (scheduleHeaderBtn) {
                console.log('Found schedule-header-btn (after setTimeout), adding listener.'); // DEBUG
                scheduleHeaderBtn.addEventListener('click', function() {
                    openCalendly(calendlyUrl);
                });
            } else {
                console.error('Could not find schedule-header-btn even after setTimeout.');
            }

            // --- Hamburger Menu Logic --- 
            const hamburgerBtn = document.getElementById('hamburger-btn');
            const mobileNav = document.getElementById('mobile-nav');
            const bodyEl = document.body;
            const overlay = document.getElementById('mobile-nav-overlay'); // Get overlay

            // DEBUG: Log found elements
            console.log('Hamburger Button Element (after setTimeout):', hamburgerBtn);
            console.log('Mobile Nav Element (after setTimeout):', mobileNav);
            console.log('Overlay Element (after setTimeout):', overlay);
            console.log('Body Element (after setTimeout):', bodyEl);

            if (hamburgerBtn && mobileNav && overlay && bodyEl) { // Check for bodyEl too
                console.log('Hamburger menu elements FOUND (after setTimeout), adding listeners.'); // DEBUG
                hamburgerBtn.addEventListener('click', function(event) { // Add event parameter
                    console.log('Hamburger button CLICKED! (after setTimeout)'); // DEBUG
                    // event.stopPropagation(); // Optional: Stop event bubbling if needed
                    bodyEl.classList.toggle('mobile-nav-active');
                    console.log('Toggled mobile-nav-active class. Body classes (after setTimeout):', bodyEl.className); // DEBUG
                    const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
                    hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
                });

                // Close menu when clicking overlay
                overlay.addEventListener('click', function() {
                    console.log('Overlay CLICKED! (after setTimeout)'); // DEBUG
                    bodyEl.classList.remove('mobile-nav-active');
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                });
            } else {
                 console.error('Hamburger menu elements NOT FOUND (after setTimeout). Check IDs in header partials.'); // DEBUG: Updated error msg
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
        }, 0); // End of setTimeout

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