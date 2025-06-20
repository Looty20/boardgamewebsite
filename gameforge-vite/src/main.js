
        // Simple drag and drop functionality
        document.addEventListener('DOMContentLoaded', function() {
            const components = document.querySelectorAll('.draggable-component');
            const dropArea = document.getElementById('dropArea');
            
            components.forEach(component => {
                component.addEventListener('dragstart', function(e) {
                    e.dataTransfer.setData('text/plain', component.dataset.type);
                    component.classList.add('opacity-50');
                });
                
                component.addEventListener('dragend', function() {
                    component.classList.remove('opacity-50');
                });
            });
            
            dropArea.addEventListener('dragover', function(e) {
                e.preventDefault();
                dropArea.classList.add('border-indigo-500', 'bg-indigo-50');
                dropArea.classList.remove('border-gray-300');
            });
            
            dropArea.addEventListener('dragleave', function() {
                dropArea.classList.remove('border-indigo-500', 'bg-indigo-50');
                dropArea.classList.add('border-gray-300');
            });
            
            dropArea.addEventListener('drop', function(e) {
                e.preventDefault();
                dropArea.classList.remove('border-indigo-500', 'bg-indigo-50');
                dropArea.classList.add('border-gray-300');
                
                const componentType = e.dataTransfer.getData('text/plain');
                const componentText = Array.from(components).find(c => c.dataset.type === componentType).textContent.trim();
                
                // Create a new component in the workspace
                const newComponent = document.createElement('div');
                newComponent.className = 'bg-white p-4 rounded-lg shadow-md absolute cursor-move';
                newComponent.style.left = (e.clientX - dropArea.getBoundingClientRect().left - 50) + 'px';
                newComponent.style.top = (e.clientY - dropArea.getBoundingClientRect().top - 50) + 'px';
                newComponent.style.width = '100px';
                newComponent.style.height = '100px';
                newComponent.innerHTML = `
                    <div class="flex flex-col items-center justify-center h-full">
                        <i class="${getComponentIcon(componentType)} text-2xl mb-2 ${getComponentColor(componentType)}"></i>
                        <span class="text-xs text-center">${componentText}</span>
                    </div>
                `;
                
                // Make the new component draggable
                newComponent.draggable = true;
                newComponent.addEventListener('dragstart', function(e) {
                    e.dataTransfer.setData('text/plain', 'move');
                    this.classList.add('opacity-50');
                });
                
                newComponent.addEventListener('dragend', function() {
                    this.classList.remove('opacity-50');
                });
                
                dropArea.appendChild(newComponent);
                
                // Remove the "drop here" message if it's the first component
                if (dropArea.querySelector('div.text-center')) {
                    dropArea.querySelector('div.text-center').remove();
                }
            });
            
            function getComponentIcon(type) {
                const icons = {
                    'board': 'fas fa-chess-board',
                    'card': 'fas fa-id-card',
                    'token': 'fas fa-coins',
                    'dice': 'fas fa-dice',
                    'player': 'fas fa-user-friends'
                };
                return icons[type] || 'fas fa-question';
            }
            
            function getComponentColor(type) {
                const colors = {
                    'board': 'text-indigo-500',
                    'card': 'text-green-500',
                    'token': 'text-yellow-500',
                    'dice': 'text-red-500',
                    'player': 'text-blue-500'
                };
                return colors[type] || 'text-gray-500';
            }
            
            // Mobile menu toggle (would need more implementation)
            document.querySelector('.md\\:hidden').addEventListener('click', function() {
                alert('Mobile menu would open here in a full implementation');
            });
        });
    


document.addEventListener('DOMContentLoaded', function () {
    const components = document.querySelectorAll('.draggable-component');
    const dropArea = document.getElementById('dropArea');
    const ruleEditor = document.getElementById('ruleEditor');
    const saveButton = document.querySelector('button:has(i.fa-save)');
    const zoomInBtn = document.querySelector('button[data-tooltip="Zoom In"]');
    const zoomOutBtn = document.querySelector('button[data-tooltip="Zoom Out"]');
    const clearBtn = document.querySelector('button[data-tooltip="Clear"]');
    let zoomScale = 1;

    // Drag from palette
    components.forEach(component => {
        component.addEventListener('dragstart', function (e) {
            e.dataTransfer.setData('text/plain', component.dataset.type);
            component.classList.add('opacity-50');
        });
        component.addEventListener('dragend', function () {
            component.classList.remove('opacity-50');
        });
    });

    // Drop area logic
    dropArea.addEventListener('dragover', e => {
        e.preventDefault();
        dropArea.classList.add('border-indigo-500', 'bg-indigo-50');
        dropArea.classList.remove('border-gray-300');
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('border-indigo-500', 'bg-indigo-50');
        dropArea.classList.add('border-gray-300');
    });

    dropArea.addEventListener('drop', function (e) {
        e.preventDefault();
        dropArea.classList.remove('border-indigo-500', 'bg-indigo-50');
        dropArea.classList.add('border-gray-300');

        const type = e.dataTransfer.getData('text/plain');
        const text = Array.from(components).find(c => c.dataset.type === type).textContent.trim();

        const newEl = createComponent(type, text);
        newEl.style.left = (e.clientX - dropArea.getBoundingClientRect().left - 50) + 'px';
        newEl.style.top = (e.clientY - dropArea.getBoundingClientRect().top - 50) + 'px';

        dropArea.appendChild(newEl);
        if (dropArea.querySelector('div.text-center')) {
            dropArea.querySelector('div.text-center').remove();
        }
    });

    function createComponent(type, text) {
        const el = document.createElement('div');
        el.className = 'bg-white p-4 rounded-lg shadow-md absolute cursor-move';
        el.style.width = '100px';
        el.style.height = '100px';
        el.setAttribute('data-type', type);
        el.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full">
                <i class="${getComponentIcon(type)} text-2xl mb-2 ${getComponentColor(type)}"></i>
                <span class="text-xs text-center editable" contenteditable="true">${text}</span>
            </div>
        `;
        makeMovable(el);
        return el;
    }

    function makeMovable(el) {
        let offsetX, offsetY;
        el.addEventListener('mousedown', function (e) {
            if (e.target.classList.contains('editable')) return;
            offsetX = e.offsetX;
            offsetY = e.offsetY;
            function moveHandler(e) {
                el.style.left = (e.clientX - dropArea.getBoundingClientRect().left - offsetX) + 'px';
                el.style.top = (e.clientY - dropArea.getBoundingClientRect().top - offsetY) + 'px';
            }
            function upHandler() {
                document.removeEventListener('mousemove', moveHandler);
                document.removeEventListener('mouseup', upHandler);
            }
            document.addEventListener('mousemove', moveHandler);
            document.addEventListener('mouseup', upHandler);
        });
    }

    function getComponentIcon(type) {
        const icons = {
            'board': 'fas fa-chess-board',
            'card': 'fas fa-id-card',
            'token': 'fas fa-coins',
            'dice': 'fas fa-dice',
            'player': 'fas fa-user-friends'
        };
        return icons[type] || 'fas fa-question';
    }

    function getComponentColor(type) {
        const colors = {
            'board': 'text-indigo-500',
            'card': 'text-green-500',
            'token': 'text-yellow-500',
            'dice': 'text-red-500',
            'player': 'text-blue-500'
        };
        return colors[type] || 'text-gray-500';
    }

    // Zoom logic
    function applyZoom() {
        dropArea.style.transform = `scale(${zoomScale})`;
        dropArea.style.transformOrigin = 'top left';
    }

    zoomInBtn.addEventListener('click', () => {
        zoomScale = Math.min(zoomScale + 0.1, 2);
        applyZoom();
    });

    zoomOutBtn.addEventListener('click', () => {
        zoomScale = Math.max(zoomScale - 0.1, 0.5);
        applyZoom();
    });

    // Clear canvas
    clearBtn.addEventListener('click', () => {
        dropArea.innerHTML = `
            <div class="text-center">
                <i class="fas fa-arrow-down text-3xl mb-2"></i>
                <p>Drag components here or click to upload</p>
            </div>`;
        localStorage.removeItem('workspace');
    });

    // Save
    saveButton.addEventListener('click', () => {
        const placed = Array.from(dropArea.querySelectorAll('div[data-type]')).map(el => ({
            type: el.getAttribute('data-type'),
            left: el.style.left,
            top: el.style.top,
            text: el.querySelector('.editable').innerText
        }));
        const rules = ruleEditor.innerHTML;
        localStorage.setItem('workspace', JSON.stringify(placed));
        localStorage.setItem('rules', rules);
        alert('Draft saved!');
    });

    // Load
    const saved = JSON.parse(localStorage.getItem('workspace') || '[]');
    saved.forEach(({ type, left, top, text }) => {
        const el = createComponent(type, text);
        el.style.left = left;
        el.style.top = top;
        dropArea.appendChild(el);
    });
    if (saved.length > 0 && dropArea.querySelector('div.text-center')) {
        dropArea.querySelector('div.text-center').remove();
    }

    const savedRules = localStorage.getItem('rules');
    if (savedRules) ruleEditor.innerHTML = savedRules;
});
