document.addEventListener('DOMContentLoaded', () => {
    // State Management
    const state = {
        tasks: [],
        filter: 'all', // all, completed, active
        view: 'grid', // grid, list
        search: ''
    };

    // DOM Elements
    const elements = {
        tasksContainer: document.getElementById('tasks-container'),
        createBtn: document.getElementById('create-task-btn'),
        helpBtn: document.getElementById('help-btn'),
        modal: document.getElementById('task-modal'),
        closeModal: document.getElementById('close-modal'),
        cancelModal: document.getElementById('cancel-modal'),
        taskForm: document.getElementById('task-form'),
        saveBtn: document.getElementById('save-task-btn'),
        modalTitle: document.getElementById('modal-title'),
        
        // Stats
        totalCount: document.getElementById('total-tasks'),
        completedCount: document.getElementById('completed-tasks'),
        activeCount: document.getElementById('active-tasks'),
        pendingCountBadge: document.getElementById('pending-count'),
        
        // Toggles
        viewToggles: document.querySelectorAll('.toggle-btn'),
        navItems: document.querySelectorAll('.nav-item'),
        
        // Search
        searchInput: document.getElementById('search-input'),
        
        // Toast
        toastContainer: document.getElementById('toast-container')
    };

    // Accessibility Setup
    if (elements.toastContainer) {
        elements.toastContainer.setAttribute('aria-live', 'polite');
    }

    // --- Initialization ---
    init();

    function init() {
        fetchTasks();
        setupEventListeners();
        setupKeyboardShortcuts();
    }

    // --- API Interactions ---
    async function fetchTasks() {
        setLoading(true);
        try {
            const res = await fetch('/api/tasks');
            if (!res.ok) throw new Error('Error loading tasks');
            const data = await res.json();
            state.tasks = data;
            render();
        } catch (err) {
            showToast(err.message, 'error');
            // Show empty state on error to avoid infinite loading spinner
            elements.tasksContainer.innerHTML = `
                <div class="loading-state">
                    <i class="fas fa-exclamation-triangle fa-3x mb-3 text-warning"></i>
                    <p>No se pudieron cargar las tareas.</p>
                    <button class="btn btn-text mt-2" onclick="location.reload()">Reintentar</button>
                </div>
            `;
        } finally {
            setLoading(false);
        }
    }

    async function createTask(task) {
        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task)
            });
            if (!res.ok) throw new Error('Error creating task');
            await fetchTasks();
            closeModal();
            showToast('Tarea creada exitosamente', 'success');
        } catch (err) {
            showToast(err.message, 'error');
        }
    }

    async function updateTask(id, task) {
        try {
            const res = await fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task)
            });
            if (!res.ok) throw new Error('Error updating task');
            await fetchTasks();
            closeModal();
            showToast('Tarea actualizada', 'success');
        } catch (err) {
            showToast(err.message, 'error');
        }
    }

    async function deleteTask(id) {
        if (!confirm('¿Estás seguro de eliminar esta tarea?')) return;
        
        try {
            const res = await fetch(`/api/tasks/${id}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Error deleting task');
            await fetchTasks();
            showToast('Tarea eliminada', 'success');
        } catch (err) {
            showToast(err.message, 'error');
        }
    }

    async function toggleTaskStatus(id, currentStatus) {
        const task = state.tasks.find(t => t.id === id);
        if (!task) return;

        const updatedTask = { ...task, completed: !currentStatus };
        
        // Optimistic UI update
        task.completed = !currentStatus;
        render();

        try {
            const res = await fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask)
            });
            if (!res.ok) {
                // Revert on error
                task.completed = currentStatus;
                render();
                throw new Error('Error updating status');
            }
            // Success - silent update or toast if desired
            // showToast(task.completed ? 'Tarea completada' : 'Tarea reactivada', 'success');
        } catch (err) {
            showToast(err.message, 'error');
        }
    }

    // --- Rendering ---
    function render() {
        renderStats();
        renderTasks();
    }

    function renderStats() {
        const total = state.tasks.length;
        const completed = state.tasks.filter(t => t.completed).length;
        const active = total - completed;

        animateValue(elements.totalCount, parseInt(elements.totalCount.innerText) || 0, total, 500);
        animateValue(elements.completedCount, parseInt(elements.completedCount.innerText) || 0, completed, 500);
        animateValue(elements.activeCount, parseInt(elements.activeCount.innerText) || 0, active, 500);
        
        if (elements.pendingCountBadge) {
            elements.pendingCountBadge.innerText = active;
            elements.pendingCountBadge.style.display = active > 0 ? 'inline-flex' : 'none';
        }
    }

    function renderTasks() {
        elements.tasksContainer.innerHTML = '';
        
        // Filter Logic
        let filtered = state.tasks;
        
        // 1. Search
        if (state.search) {
            const term = state.search.toLowerCase();
            filtered = filtered.filter(t => 
                t.title.toLowerCase().includes(term) || 
                (t.description && t.description.toLowerCase().includes(term))
            );
        }

        // 2. View Filter (from Sidebar) - simple simulation
        const activeNav = document.querySelector('.nav-item.active');
        if (activeNav && activeNav.dataset.view === 'list') {
             // In "Mis Tareas" usually shows only active ones in some apps, 
             // but here we'll just keep showing all for now, or filter active if requested.
             // Let's keep showing all to avoid confusion unless "pending" is implied.
        }

        if (filtered.length === 0) {
            elements.tasksContainer.innerHTML = `
                <div class="loading-state">
                    <i class="fas fa-clipboard-check fa-3x mb-3 text-light"></i>
                    <p class="text-muted">No se encontraron tareas.</p>
                    ${state.search ? '<button class="btn btn-text" onclick="window.clearSearch()">Limpiar búsqueda</button>' : ''}
                </div>
            `;
            return;
        }

        filtered.forEach(task => {
            const card = document.createElement('div');
            card.className = 'task-card';
            // Animation delay for staggered entry
            
            // Priority Logic (Mock)
            const priority = 'medium'; 
            
            card.innerHTML = `
                <div class="task-header">
                    <div class="d-flex align-items-center">
                        <div class="task-status ${task.completed ? 'completed' : ''}" 
                             role="checkbox" 
                             aria-checked="${task.completed}"
                             tabindex="0"
                             aria-label="Marcar como ${task.completed ? 'pendiente' : 'completada'}"
                             onclick="window.toggleStatus(${task.id}, ${task.completed})"
                             onkeydown="if(event.key==='Enter'||event.key===' ') window.toggleStatus(${task.id}, ${task.completed})"></div>
                        ${state.view === 'list' ? `<span class="task-title ms-2 ${task.completed ? 'text-muted text-decoration-line-through' : ''}">${task.title}</span>` : ''}
                    </div>
                    ${state.view === 'grid' ? `
                        <div class="dropdown">
                            <button class="icon-btn-sm" aria-label="Opciones">
                                <i class="fas fa-ellipsis-h"></i>
                            </button>
                        </div>
                    ` : ''}
                </div>
                
                ${state.view === 'grid' ? `<div class="task-title mb-2 ${task.completed ? 'text-muted text-decoration-line-through' : ''}">${task.title}</div>` : ''}
                
                <p class="task-desc">${task.description || ''}</p>
                
                <div class="task-footer">
                    <span class="priority-badge priority-${priority}">${priority}</span>
                    <div class="task-actions">
                        <button class="action-btn" aria-label="Editar" onclick="window.editTask(${task.id})">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button class="action-btn delete" aria-label="Eliminar" onclick="window.deleteTask(${task.id})">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `;
            elements.tasksContainer.appendChild(card);
        });
        
        // Update View Class
        elements.tasksContainer.className = `tasks-container ${state.view}-view`;
    }

    function setLoading(isLoading) {
        if (!elements.tasksContainer) return;
        if (isLoading) {
            elements.tasksContainer.innerHTML = `
                <div class="loading-state">
                    <div class="spinner"></div>
                    <p>Cargando...</p>
                </div>
            `;
        }
    }

    // --- Event Listeners ---
    function setupEventListeners() {
        // Modal
        if (elements.createBtn) elements.createBtn.addEventListener('click', () => openModal());
        if (elements.closeModal) elements.closeModal.addEventListener('click', closeModal);
        if (elements.cancelModal) elements.cancelModal.addEventListener('click', closeModal);
        if (elements.modal) elements.modal.addEventListener('click', (e) => {
            if (e.target === elements.modal) closeModal();
        });

        // Help
        if (elements.helpBtn) elements.helpBtn.addEventListener('click', showHelp);

        // Form
        if (elements.saveBtn) elements.saveBtn.addEventListener('click', handleSave);

        // View Toggles
        elements.viewToggles.forEach(btn => {
            btn.addEventListener('click', () => {
                elements.viewToggles.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.view = btn.dataset.layout;
                renderTasks();
            });
        });

        // Search
        if (elements.searchInput) elements.searchInput.addEventListener('input', (e) => {
            state.search = e.target.value;
            renderTasks();
        });
        
        // Sidebar Nav
        elements.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                elements.navItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                // Basic routing simulation
                const view = item.dataset.view;
                if(view === 'dashboard' || view === 'list') {
                   state.search = '';
                   if (elements.searchInput) elements.searchInput.value = '';
                   renderTasks();
                }
            });
        });
    }

    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
                closeHelp();
            }
        });
    }

    // --- Actions ---
    let lastFocusedElement;

    function openModal(task = null) {
        lastFocusedElement = document.activeElement;
        elements.modal.classList.add('active');
        
        // Trap focus or just focus first input
        const firstInput = document.getElementById('task-title');
        
        if (task) {
            elements.modalTitle.textContent = 'Editar Tarea';
            document.getElementById('task-id').value = task.id;
            document.getElementById('task-title').value = task.title;
            document.getElementById('task-desc').value = task.description || '';
            document.getElementById('task-completed').checked = task.completed;
        } else {
            elements.modalTitle.textContent = 'Nueva Tarea';
            elements.taskForm.reset();
            document.getElementById('task-id').value = '';
        }
        
        setTimeout(() => firstInput && firstInput.focus(), 100);
    }

    function closeModal() {
        if (elements.modal.classList.contains('active')) {
            elements.modal.classList.remove('active');
            if (lastFocusedElement) lastFocusedElement.focus();
        }
    }

    function handleSave(e) {
        e.preventDefault();
        const id = document.getElementById('task-id').value;
        const titleInput = document.getElementById('task-title');
        const title = titleInput.value;
        
        if (!title.trim()) {
            titleInput.classList.add('error');
            showToast('El título es obligatorio', 'error');
            titleInput.focus();
            return;
        }
        titleInput.classList.remove('error');

        const task = {
            title,
            description: document.getElementById('task-desc').value,
            completed: document.getElementById('task-completed').checked
        };

        if (id) {
            updateTask(id, task);
        } else {
            createTask(task);
        }
    }

    function showToast(msg, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} toast-icon"></i>
            <span>${msg}</span>
        `;
        elements.toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // Contextual Help System
    function showHelp() {
        // Remove existing help modal if any
        const existing = document.getElementById('help-modal');
        if (existing) existing.remove();

        const helpModal = document.createElement('div');
        helpModal.id = 'help-modal';
        helpModal.className = 'modal-overlay active';
        helpModal.innerHTML = `
            <div class="modal-container" style="max-width: 500px;">
                <div class="modal-header">
                    <h3>Ayuda & Atajos</h3>
                    <button class="close-btn" onclick="document.getElementById('help-modal').remove()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="help-section">
                        <h4><i class="fas fa-keyboard me-2"></i>Atajos de Teclado</h4>
                        <ul class="help-list">
                            <li><kbd>Esc</kbd> Cerrar ventanas modales</li>
                            <li><kbd>Tab</kbd> Navegar entre elementos</li>
                            <li><kbd>Enter</kbd> Activar botones / Marcar tareas</li>
                        </ul>
                    </div>
                    <div class="help-section mt-4">
                        <h4><i class="fas fa-mouse-pointer me-2"></i>Interacciones</h4>
                        <ul class="help-list">
                            <li>Haz clic en el círculo de estado para completar una tarea.</li>
                            <li>Usa los filtros en la barra lateral para organizar tu vista.</li>
                            <li>Cambia entre vista de cuadrícula y lista según tu preferencia.</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="document.getElementById('help-modal').remove()">Entendido</button>
                </div>
            </div>
        `;
        document.body.appendChild(helpModal);
        
        // Close on overlay click
        helpModal.addEventListener('click', (e) => {
            if (e.target === helpModal) helpModal.remove();
        });
    }

    function closeHelp() {
        const helpModal = document.getElementById('help-modal');
        if (helpModal) helpModal.remove();
    }

    function animateValue(obj, start, end, duration) {
        if (start === end) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end;
            }
        };
        window.requestAnimationFrame(step);
    }

    // Expose global functions for onclick handlers
    window.toggleStatus = toggleTaskStatus;
    window.deleteTask = deleteTask;
    window.editTask = (id) => {
        const task = state.tasks.find(t => t.id === id);
        if (task) openModal(task);
    };
    window.clearSearch = () => {
        state.search = '';
        if (elements.searchInput) elements.searchInput.value = '';
        renderTasks();
    };
});
