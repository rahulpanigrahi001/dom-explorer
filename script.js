document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskContainer = document.getElementById('task-container');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const titleInputEl = document.getElementById('task-title');
    
   
    console.log('Static Attribute:', titleInputEl.getAttribute('value')); 
    console.log('Dynamic Live Property:', titleInputEl.value);

   
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const titleValue = document.getElementById('task-title').value;
        const categoryValue = document.getElementById('task-category').value;
        
        if (!titleValue.trim() || !categoryValue) return;

        
        const card = document.createElement('div');
        card.className = 'task-card';
        
       
        card.setAttribute('data-id', Date.now().toString());
        card.dataset.status = 'pending';
        card.dataset.category = categoryValue;

        const heading = document.createElement('h3');
        heading.appendChild(document.createTextNode(titleValue));

        const badge = document.createElement('span');
        badge.className = 'category-badge';
        badge.appendChild(document.createTextNode(`[${categoryValue}]`));

        
        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete-btn';
        completeBtn.appendChild(document.createTextNode('Complete'));

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.appendChild(document.createTextNode('Edit'));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.appendChild(document.createTextNode('Delete'));

       
        card.append(heading, badge, completeBtn, editBtn, deleteBtn);
        taskContainer.prepend(card); 
        
        taskForm.reset();
        updateCounters();
    });

    
    themeToggleBtn.addEventListener('click', () => {
        const body = document.body;
        const currentTheme = body.hasAttribute('data-theme') ? body.getAttribute('data-theme') : 'light';
        const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', targetTheme);
        body.dataset.theme = targetTheme; 
        body.classList.toggle('dark-mode', targetTheme === 'dark');
    });

    
    taskContainer.addEventListener('click', (event) => {
        const target = event.target;
        const taskCard = target.closest('.task-card');
        
        if (!taskCard) return;

        
        if (target.classList.contains('delete-btn')) {
            taskCard.remove();
            updateCounters();
        }

      
        if (target.classList.contains('complete-btn')) {
            if (taskCard.dataset.status === 'pending') {
                taskCard.dataset.status = 'completed';
                taskCard.classList.add('is-complete');
            } else {
                taskCard.dataset.status = 'pending';
                taskCard.classList.remove('is-complete');
            }
            updateCounters();
        }

       
        if (target.classList.contains('save-btn')) {
            const inputEl = taskCard.querySelector('.inline-edit-input');
            const updatedText = inputEl.value;
            
            editInput.type = 'text';
            editInput.className = 'inline-edit-input';
            editInput.value = currentText;
            
           
            headingEl.replaceWith(editInput);
            
            target.textContent = 'Save';
            target.className = 'save-btn';
            return;
        }

       
        if (target.classList.contains('save-btn')) {
            const inputEl = taskCard.querySelector('.inline-edit-input');
            const updatedText = inputEl.value;
            
            const newHeading = document.createElement('h3');
            newHeading.appendChild(document.createTextNode(updatedText || 'Untitled Task'));
            
            inputEl.replaceWith(newHeading);
            
            target.textContent = 'Edit';
            target.className = 'edit-btn';
        }
    });

    
    const grandparent = document.getElementById('grandparent');
    const parent = document.getElementById('parent');
    const childButton = document.getElementById('child-button');

    
    grandparent.addEventListener('click', () => console.log('1. Capturing Phase: Grandparent'), true);
    parent.addEventListener('click', () => console.log('2. Capturing Phase: Parent'), true);
    childButton.addEventListener('click', () => console.log('3. Capturing Phase: Child'), true);

    
    childButton.addEventListener('click', () => console.log('4. Bubbling Phase: Child'), false);
    parent.addEventListener('click', () => console.log('5. Bubbling Phase: Parent'), false);
    grandparent.addEventListener('click', () => console.log('6. Bubbling Phase: Grandparent'), false);

 
    function updateCounters() {
        const pendingCount = taskContainer.querySelectorAll('.task-card[data-status="pending"]').length;
        const completedCount = taskContainer.querySelectorAll('.task-card[data-status="completed"]').length;
        
        document.getElementById('pending-count').textContent = pendingCount;
        document.getElementById('completed-count').textContent = completedCount;
    }

    clearAllBtn.addEventListener('click', () => {
        taskContainer.replaceChildren(); 
        updateCounters();
    });
});