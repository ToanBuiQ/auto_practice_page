// Interaction Page Logic

document.addEventListener('DOMContentLoaded', () => {

    // --- Alerts ---
    const alertResult = document.getElementById('alertResult');

    document.getElementById('alertBtn')?.addEventListener('click', () => {
        alert('This is a simple alert!');
        alertResult.innerText = 'Alert was accepted.';
    });

    document.getElementById('confirmBtn')?.addEventListener('click', () => {
        const result = confirm('Do you confirm this action?');
        alertResult.innerText = result ? 'You clicked OK.' : 'You clicked Cancel.';
        alertResult.className = result ? 'text-success' : 'text-danger';
    });

    document.getElementById('promptBtn')?.addEventListener('click', () => {
        const name = prompt('Please enter your name:');
        if (name) {
            alertResult.innerText = `Hello, ${name}!`;
        } else {
            alertResult.innerText = 'User cancelled the prompt.';
        }
    });


    // --- Modals ---
    const modalBtn = document.getElementById('modalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalOverlay = document.getElementById('modalOverlay');

    function openModal() {
        modalOverlay.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        requestAnimationFrame(() => {
            modalOverlay.classList.add('active');
        });
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        setTimeout(() => {
            modalOverlay.classList.add('hidden');
        }, 300); // match css transition
    }

    modalBtn?.addEventListener('click', openModal);
    closeModalBtn?.addEventListener('click', closeModal);
    // Click outside to close
    modalOverlay?.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });


    // --- Loading / Dynamic Content ---
    const loadUserBtn = document.getElementById('loadUserBtn');
    const userInfo = document.getElementById('userInfo');

    loadUserBtn?.addEventListener('click', () => {
        loadUserBtn.disabled = true;
        userInfo.innerHTML = '<div class="spinner">Loading...</div>'; // Simple text spinner

        setTimeout(() => {
            userInfo.innerHTML = `
                <div class="fade-in">
                    <strong>John Doe</strong><br>
                    <small>Software Engineer</small>
                </div>
            `;
            loadUserBtn.disabled = false;
            window.showToast('User loaded!', 'success');
        }, 3000);
    });


    // --- Enable / Disable ---
    const enableBtn = document.getElementById('enableBtn');
    const targetInput = document.getElementById('targetInput');

    enableBtn?.addEventListener('click', () => {
        if (targetInput.disabled) {
            targetInput.disabled = false;
            targetInput.placeholder = "Input Enabled";
            targetInput.focus();
            enableBtn.innerText = "Disable Input";
        } else {
            targetInput.disabled = true;
            targetInput.placeholder = "Disabled...";
            targetInput.value = ""; // clear on disable
            enableBtn.innerText = "Enable Input";
        }
    });


    // --- Drag & Drop ---
    const draggable = document.getElementById('draggableBox');
    const dropzone = document.getElementById('dropzone');

    if (draggable && dropzone) {
        draggable.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', 'dragged-item');
            draggable.style.opacity = '0.5';
        });

        draggable.addEventListener('dragend', () => {
            draggable.style.opacity = '1';
        });

        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault(); // allow drop
            dropzone.classList.add('drag-over');
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.classList.remove('drag-over');
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('drag-over');
            const data = e.dataTransfer.getData('text/plain');

            if (data === 'dragged-item') {
                dropzone.innerText = "Dropped!";
                dropzone.style.background = "#dbeafe";
                dropzone.style.borderColor = "#3b82f6";
                dropzone.style.color = "#1e40af";
                window.showToast('Item dropped successfully!', 'success');
            }
        });
    }

    // --- Dynamic Dropdown ---
    const dynamicSelect = document.getElementById('dynamicSelect');
    if (dynamicSelect) {
        let isLoaded = false;

        const loadOptions = () => {
            // If already loaded or currently has loading message, skip to avoid flicker loops
            if (dynamicSelect.options.length > 1) return;

            dynamicSelect.innerHTML = '<option value="" disabled selected>Loading...</option>';
            dynamicSelect.disabled = true; // Optional: disable while loading to prevent interaction

            setTimeout(() => {
                dynamicSelect.innerHTML = '<option value="">Select a technology...</option>';
                const options = ['Selenium', 'Playwright', 'Cypress', 'Appium'];
                options.forEach(opt => {
                    const el = document.createElement('option');
                    el.value = opt.toLowerCase();
                    el.innerText = opt;
                    dynamicSelect.appendChild(el);
                });
                dynamicSelect.disabled = false;
                dynamicSelect.focus(); // Restore focus

                // Highlight success
                dynamicSelect.style.borderColor = 'var(--secondary-color)';
                setTimeout(() => dynamicSelect.style.borderColor = '', 1000);
            }, 3000);
        };

        // Trigger load on interaction
        dynamicSelect.addEventListener('focus', loadOptions);

        // Reset on blur (to allow practicing wait multiple times)
        dynamicSelect.addEventListener('blur', () => {
            // Small delay to allow value capture if needed, then reset
            setTimeout(() => {
                dynamicSelect.innerHTML = '<option value="">Select a technology...</option>';
            }, 200);
        });
    }

});
