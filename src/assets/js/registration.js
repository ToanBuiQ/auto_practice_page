// Registration Page Logic

document.addEventListener('DOMContentLoaded', () => {
    initMultiSelect();

    const form = document.getElementById('practiceForm');

    if (!form) return;

    // Handle Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic Validation Logic (only native fields)
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const terms = document.getElementById('terms').checked;

        if (!fullName || !email || !password || !terms) {
            window.showToast('Please fill in all required fields!', 'error');
            return;
        }

        // Mock Loading State
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = 'Registering...';

        // Simulate API Call
        setTimeout(() => {
            window.showToast('User registered successfully!', 'success');
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;

            // Collect Form Data including multi-select
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                if (data[key]) {
                    if (!Array.isArray(data[key])) {
                        data[key] = [data[key]];
                    }
                    data[key].push(value);
                } else {
                    data[key] = value;
                }
            });
            console.log('Form Data:', data);

            // Optional Reset
            // form.reset();
            // resetMultiSelect(); // Need to implement this if using reset
        }, 1500);
    });

    // Handle Reset
    form.addEventListener('reset', (e) => {
        setTimeout(resetMultiSelect, 0); // Wait for native reset
        window.showToast('Form cleared!', 'info');
    });
});

/**
 * Initialize Custom Multi Select Component
 */
function initMultiSelect() {
    const multiselect = document.getElementById('skillsMultiselect');
    if (!multiselect) return;

    const select = document.getElementById('skills');
    const dropdown = document.getElementById('skillsDropdown');
    const tagsContainer = document.getElementById('selectedTags');
    const searchInput = document.getElementById('skillsSearch');
    const caret = multiselect.querySelector('.caret');

    // 1. Populate Dropdown from Select Options
    function renderDropdown() {
        dropdown.innerHTML = '';
        Array.from(select.options).forEach(opt => {
            const div = document.createElement('div');
            div.className = 'option';
            if (opt.selected) div.classList.add('selected');
            div.textContent = opt.text;
            div.dataset.value = opt.value;

            div.addEventListener('click', () => {
                toggleOption(opt.value);
                searchInput.value = ''; // clear search
                renderDropdown(); // re-render to update selected state
                filterOptions(''); // reset filter
                searchInput.focus();
            });

            dropdown.appendChild(div);
        });
    }

    // 2. Render Tags
    function renderTags() {
        tagsContainer.innerHTML = '';
        Array.from(select.options).forEach(opt => {
            if (opt.selected) {
                const tag = document.createElement('div');
                tag.className = 'tag';
                tag.innerHTML = `${opt.text} <span class="tag-remove" data-value="${opt.value}">×</span>`;

                tag.querySelector('.tag-remove').addEventListener('click', (e) => {
                    e.stopPropagation(); // prevent opening dropdown
                    toggleOption(opt.value);
                });
                tagsContainer.appendChild(tag);
            }
        });
        renderDropdown(); // Update dropdown state alongside tags
    }

    // 3. Toggle Logic
    function toggleOption(value) {
        const option = Array.from(select.options).find(opt => opt.value === value);
        if (option) {
            option.selected = !option.selected;
            renderTags();
        }
    }

    // 4. Reset Logic
    window.resetMultiSelect = function () {
        Array.from(select.options).forEach(opt => opt.selected = false);
        renderTags();
    }

    // 5. Interactions
    // Open Dropdown
    searchInput.addEventListener('focus', () => {
        dropdown.classList.add('show');
        renderDropdown(); // ensure fresh state
    });

    // Toggle dropdown on caret/container click (if not input)
    multiselect.addEventListener('click', (e) => {
        if (e.target !== searchInput && !e.target.classList.contains('tag-remove')) {
            dropdown.classList.toggle('show');
            if (dropdown.classList.contains('show')) searchInput.focus();
        }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!multiselect.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });

    // Filter Logic
    function filterOptions(term) {
        const items = dropdown.querySelectorAll('.option');
        let hasVisible = false;
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(term.toLowerCase())) {
                item.style.display = 'block';
                hasVisible = true;
            } else {
                item.style.display = 'none';
            }
        });

        // No results handling
        const existingMsg = dropdown.querySelector('.no-results');
        if (existingMsg) existingMsg.remove();

        if (!hasVisible) {
            const msg = document.createElement('div');
            msg.className = 'no-results';
            msg.textContent = 'No skills found';
            dropdown.appendChild(msg);
        }
    }

    searchInput.addEventListener('input', (e) => {
        filterOptions(e.target.value);
        dropdown.classList.add('show'); // ensure open when typing
    });

    // Initial render
    renderTags();
}
