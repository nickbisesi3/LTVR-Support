// footer.js: Dynamically injects the shared footer content
(function() {
    // Use a direct path since all pages are assumed to be in the root
    const footerFile = 'components/footer.html'; 

    // Find the placeholder div
    const placeholder = document.getElementById('footer-placeholder');

    if (placeholder) {
        fetch(footerFile)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status} fetching ${footerFile}`);
                }
                return res.text();
            })
            .then(html => {
                placeholder.outerHTML = html; // Replace placeholder with footer HTML
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                if (placeholder) {
                    placeholder.textContent = 'Error loading footer.'; // Provide fallback text
                }
            });
    } else {
        console.warn('Footer placeholder div not found.');
    }
})();
