// header.js: Dynamically injects the correct header based on page type
window.headerLoadedPromise = (function() {
    // List of support pages (add more as needed)
    const supportPages = [
        'support.html',
        'lesson.html',
        'faq.html',
        'troubleshooting.html',
        'setup.html',
        'class-management.html',
        'presentation.html',
        'headset-tour.html',
        'vxr-guide.html',
        'arborxr-guides.html',
        'support-home.html', // Added support-home just in case
        // Add other support-related page filenames here
    ];

    // Helper to get current page filename
    function getCurrentPage() {
        const path = window.location.pathname;
        return path.substring(path.lastIndexOf('/') + 1) || 'index.html'; // Default to index.html if path is just '/'
    }

    // Determine which header to load
    const currentPage = getCurrentPage();

    // Simplified path resolution since all HTML files are in the root
    function getHeaderPath(filename) {
        return 'partials/' + filename;
    }

    let headerFile = getHeaderPath('header-main.html');

    // Check for class_session.html first
    if (currentPage === 'class_session.html') {
        headerFile = getHeaderPath('header-class-session.html');
    }
    // Check if the current page (excluding index.html and class_session.html) is considered a support page
    else if (currentPage !== 'index.html' && supportPages.includes(currentPage)) {
        headerFile = getHeaderPath('header-support.html');
    }
    // Explicitly use main header for index.html
    else if (currentPage === 'index.html') {
         headerFile = getHeaderPath('header-main.html');
    } // Add else if for other non-support pages if needed


    // Insert header at top of body and return the promise
    return fetch(headerFile)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status} fetching ${headerFile}`);
            }
            return res.text();
        })
        .then(html => {
            document.body.insertAdjacentHTML('afterbegin', html);
            return true;
        })
        .catch(error => {
            console.error('Error loading header:', error);
            throw error;
        });
})();
