class Todo {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('military_tasks')) || [];
    this.term = "";
    this.render();
  }

  save() {
    localStorage.setItem('military_tasks', JSON.stringify(this.tasks));
  }

  validate(text, date) {
    const errors = [];
    if (text.length < 3 || text.length > 255) errors.push("Rozkaz musi mieć od 3 do 255 znaków.");
    if (date) {
      const selectedDate = new Date(date);
      if (selectedDate < new Date()) errors.push("Termin nie może być w przeszłości.");
    }
    return errors;
  }

  addTask(text, date) {
    const errors = this.validate(text, date);
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }
    this.tasks.push({ text, date, id: Date.now() });
    this.save();
    this.draw();
  }

  removeTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save();
    this.draw();
  }

  editTask(id, newText, newDate) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.text = newText;
      task.date = newDate;
      this.save();
      this.draw();
    }
  }

  get filteredTasks() {
    if (this.term.length < 2) return this.tasks;
    return this.tasks.filter(t => t.text.toLowerCase().includes(this.term.toLowerCase()));
  }

  highlight(text) {
    if (this.term.length < 2) return text;
    const re = new RegExp(`(${this.term})`, 'gi');
    return text.replace(re, '<mark>$1</mark>');
  }

  draw() {
    const container = document.getElementById('todo-list-container');
    container.innerHTML = '';

    this.filteredTasks.forEach(task => {
      const taskEl = document.createElement('div');
      taskEl.className = 'task-item';

      taskEl.innerHTML = `
                <div class="task-content">
                    <span class="task-text">${this.highlight(task.text)}</span>
                    <span class="task-date">${task.date ? task.date.replace('T', ' ') : 'BRAK TERMINU'}</span>
                </div>
                <button class="delete-btn" onclick="document.todo.removeTask(${task.id})">UTYLIZUJ</button>
            `;

      taskEl.querySelector('.task-content').onclick = (e) => {
        this.renderEditMode(taskEl, task);
      };

      container.appendChild(taskEl);
    });
  }

  renderEditMode(el, task) {
    el.innerHTML = `
            <input type="text" class="edit-text" value="${task.text}">
            <input type="datetime-local" class="edit-date" value="${task.date}">
            <button class="save-btn">ZAPISZ</button>
        `;

    const save = () => {
      const newText = el.querySelector('.edit-text').value;
      const newDate = el.querySelector('.edit-date').value;
      this.editTask(task.id, newText, newDate);
    };

    el.querySelector('.save-btn').onclick = save;
    el.querySelector('.edit-text').onblur = (e) => {
      if (e.relatedTarget?.className !== 'save-btn') setTimeout(save, 100);
    };
  }

  render() {
    this.draw();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.todo = new Todo();

  document.getElementById('add-task-btn').onclick = () => {
    const text = document.getElementById('new-task-text').value;
    const date = document.getElementById('new-task-date').value;
    document.todo.addTask(text, date);
    document.getElementById('new-task-text').value = '';
    document.getElementById('new-task-date').value = '';
  };

  document.getElementById('search-input').oninput = (e) => {
    document.todo.term = e.target.value;
    document.todo.draw();
  };
});
