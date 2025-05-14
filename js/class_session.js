// JavaScript for class_session.html

document.addEventListener('DOMContentLoaded', function() {
    // --- Global Variables / DOM Element Selections ---
    const studentGrid = document.querySelector('.student-status-grid');
    const experienceList = document.querySelector('.experience-list');
    const previewPanels = document.querySelectorAll('.preview-content');
    const defaultPreview = document.getElementById('preview-default');
    const experiencePreviewTitle = document.getElementById('experience-preview-title');
    let currentSelectedExperienceItem = null; // To keep track of the selected item

    // --- Function to Populate Student Grid (Placeholder) ---
    function populateStudentGrid() {
        if (!studentGrid) return;

        for (let i = 6; i <= 25; i++) {
            const isConnected = Math.random() > 0.2; // Randomly connected/disconnected
            const statusClass = isConnected ? 'status-connected' : 'status-disconnected';
            const statusText = isConnected ? 'Connected' : 'Disconnected';
            const batteryLevel = isConnected ? Math.floor(Math.random() * 51) + 50 : '--'; // 50-100% if connected
            const buttonDisabled = isConnected ? '' : 'disabled';

            let placeholderInnerContent = '';
            if (isConnected) {
                placeholderInnerContent = `<button class="view-screen-btn view-screen-btn-placeholder" data-headset-id="headset${i}">View Screen</button>`;
            } else {
                placeholderInnerContent = `<div class="status-text">Disconnected</div>`;
            }

            const cell = document.createElement('div');
            cell.className = 'headset-status-cell';
            cell.dataset.headsetId = `headset${i}`; // Add data attribute for easier selection
            cell.innerHTML = `
                <div class="student-pov-placeholder">
                    <div class="actual-pov-content">
                        <!-- Actual POV stream/image would go here when expanded -->
                    </div>
                    <button class="hide-screen-btn" ${buttonDisabled}>&times;</button>
                    <div class="placeholder-content-wrapper">
                        ${placeholderInnerContent}
                    </div>
                </div>
                <div class="headset-title-row">
                    <div class="headset-id">Headset ${i}</div>
                    
                </div>
                <div class="headset-info-row">
                    <div class="headset-status ${statusClass}"><span class="status-dot"></span>${statusText}</div>
                    <div class="headset-battery">🔋 <span>${batteryLevel}</span>%</div>
                </div>
            `;
            studentGrid.appendChild(cell);
        }
    }

    // --- Function to Initialize Pause Modal --- 
    function initPauseModal() {
        // Wait for the header to be fully loaded before attaching modal listeners
        // Assumes header.js defines and resolves window.headerLoadedPromise
        if (window.headerLoadedPromise) { 
            window.headerLoadedPromise.then(() => {
                const modal = document.getElementById('pause-modal');
                const triggerButton = document.getElementById('pause-modal-trigger'); // In header
                const closeButton = modal ? modal.querySelector('.close-button') : null;
    
                if (modal && triggerButton && closeButton) {
                    triggerButton.addEventListener('click', () => modal.style.display = 'block');
                    closeButton.addEventListener('click', () => modal.style.display = 'none');
                    window.addEventListener('click', (event) => {
                        if (event.target == modal) modal.style.display = 'none';
                    });
                }
            }).catch(error => {
                console.error("Failed to initialize pause modal due to header loading error:", error);
            });
        } else {
            console.warn("headerLoadedPromise not found. Pause modal might not work correctly if trigger is in header.");
            // Fallback or direct initialization if trigger is not in dynamic header
            const modal = document.getElementById('pause-modal');
            const triggerButton = document.getElementById('pause-modal-trigger'); // Check if it's in the main document
            const closeButton = modal ? modal.querySelector('.close-button') : null;
            if (modal && triggerButton && closeButton) { 
                triggerButton.addEventListener('click', () => modal.style.display = 'block');
                closeButton.addEventListener('click', () => modal.style.display = 'none');
                window.addEventListener('click', (event) => {
                    if (event.target == modal) modal.style.display = 'none';
                });
            }
        }
    }

    // --- Function to Initialize Add Experience Modal ---
    function initAddExperienceModal() {
        const modal = document.getElementById('add-experience-modal');
        const triggerButton = document.getElementById('add-experience-trigger');
        const closeButton = modal ? modal.querySelector('.full-modal-close-button') : null;

        if (modal && triggerButton && closeButton) {
            triggerButton.addEventListener('click', () => modal.style.display = 'block');
            closeButton.addEventListener('click', () => modal.style.display = 'none');
            // Optional: Close by clicking background - usually not for full-screen modals
            // window.addEventListener('click', (event) => { 
            //     if (event.target == modal) modal.style.display = 'none'; 
            // });
        }
    }

    // --- Function to Initialize Experience Preview Switcher ---
    function initExperiencePreviewSwitcher() {
        if (!experienceList || !experiencePreviewTitle) return;

        // Set initial selected item and title
        currentSelectedExperienceItem = experienceList.querySelector('.experience-item.selected');
        if (!currentSelectedExperienceItem) {
            const defaultItem = experienceList.querySelector('.experience-item[data-type="default"]');
            if (defaultItem) {
                defaultItem.classList.add('selected');
                currentSelectedExperienceItem = defaultItem;
            }
        }
        updatePreview(currentSelectedExperienceItem, true); // true for initial load
        
        experienceList.addEventListener('click', function(event) {
            const clickedItem = event.target.closest('.experience-item'); // Use closest to handle clicks on children
            if (clickedItem && clickedItem.id !== 'add-experience-trigger') { // Ensure it's an experience item and not 'Add New'
                if (currentSelectedExperienceItem) {
                    currentSelectedExperienceItem.classList.remove('selected');
                }
                clickedItem.classList.add('selected');
                currentSelectedExperienceItem = clickedItem;
                updatePreview(currentSelectedExperienceItem, false);
            }
        });
    }

    function updatePreview(selectedItem, isInitialLoad) {
        if (!selectedItem || !experiencePreviewTitle) return;

        const experienceType = selectedItem.dataset.type;
        const targetPreviewId = `preview-${experienceType}`;

        // Update Preview Title - refined logic
        let titleText = '';
        
        // Extract text content for the title, excluding the span.tag content
        for (let i = 0; i < selectedItem.childNodes.length; i++) {
            if (selectedItem.childNodes[i].nodeType === Node.TEXT_NODE) {
                titleText += selectedItem.childNodes[i].textContent.trim();
            } else if (selectedItem.childNodes[i].nodeType === Node.ELEMENT_NODE && 
                       selectedItem.childNodes[i].tagName.toLowerCase() !== 'span' && 
                       !selectedItem.childNodes[i].classList.contains('tag')) { // Also exclude elements with class 'tag'
                titleText += selectedItem.childNodes[i].textContent.trim();
            }
        }
        titleText = titleText.trim();
        if(titleText === "") { // Fallback for items that might be structured differently
            titleText = selectedItem.textContent.replace(/\s*<span.*<\/span>\s*/, '').replace(/\s{2,}/g, ' ').trim();
        }
        
        experiencePreviewTitle.textContent = titleText || 'Experience';

        // Show/Hide Preview Panels
        if (previewPanels) {
            previewPanels.forEach(panel => panel.style.display = 'none');
        }

        if (experienceType === 'default' && defaultPreview) {
            defaultPreview.style.display = 'flex';
        } else {
            const targetPreview = document.getElementById(targetPreviewId);
            if (targetPreview) {
                // Ensure the preview container uses flex display for align/justify rules to work
                targetPreview.style.display = 'flex'; 
            } else if (defaultPreview) { // Fallback to default
                defaultPreview.style.display = 'flex';
                console.warn(`Preview panel with ID ${targetPreviewId} not found. Fallback to default.`);
            }
        }
    }

    // --- Function to Initialize Student View Toggle Functionality ---
    function initStudentViewToggle() {
        const viewAllBtn = document.getElementById('view-all-screens-btn');
        if (!studentGrid || !viewAllBtn) return;

        studentGrid.addEventListener('click', (event) => {
            const target = event.target;
            const cell = target.closest('.headset-status-cell');

            if (cell && !cell.querySelector('.status-disconnected')) { // Ensure cell is connected
                if ((target.classList.contains('view-screen-btn') || target.classList.contains('view-screen-btn-placeholder')) && !target.disabled) {
                    cell.classList.add('expanded');
                    updateViewAllButtonState();
                } else if (target.classList.contains('hide-screen-btn') && !target.disabled) {
                    cell.classList.remove('expanded');
                    updateViewAllButtonState();
                }
            }
        });

        viewAllBtn.addEventListener('click', () => {
            const connectedCells = studentGrid.querySelectorAll('.headset-status-cell:has(.status-connected)');
            const currentlyShowingAll = viewAllBtn.textContent === 'Hide All Screens';

            connectedCells.forEach(cell => {
                if (currentlyShowingAll) {
                    cell.classList.remove('expanded');
                } else {
                    cell.classList.add('expanded');
                }
            });
            updateViewAllButtonState();
        });

        // Initial state for the 'View All/Hide All' button
        updateViewAllButtonState(); 
    }

    function updateViewAllButtonState() {
        const viewAllBtn = document.getElementById('view-all-screens-btn'); // Re-select or pass as param if needed
        if (!studentGrid || !viewAllBtn) return;

        const connectedCells = studentGrid.querySelectorAll('.headset-status-cell:has(.status-connected)');
        const expandedConnectedCells = studentGrid.querySelectorAll('.headset-status-cell.expanded:has(.status-connected)');

        if (connectedCells.length > 0 && expandedConnectedCells.length === connectedCells.length) {
            viewAllBtn.textContent = 'Hide All Screens';
        } else {
            viewAllBtn.textContent = 'View All Screens';
        }
    }

    // --- Initialize all functionalities ---
    populateStudentGrid();
    initPauseModal();
    initAddExperienceModal();
    initExperiencePreviewSwitcher();
    initStudentViewToggle();
});
