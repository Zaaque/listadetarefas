const validUsername = 'momo';
const validPassword = 'zaquinho';
const rewards = ['beijo de momo', 'abraço de momo', 'sorvete com momo', 'xuxi com momo', 'qualquer coisa que momo quiser'];

let xp = 0;
let level = 0;
let tasks = [];

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === validUsername && password === validPassword) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('task-section').style.display = 'block';
        loadUserData();
    } else {
        document.getElementById('login-message').innerText = 'Usuário ou senha inválidos.';
    }
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const task = taskInput.value.trim();
    if (task) {
        tasks.push({ name: task, completed: false });
        taskInput.value = '';
        saveUserData();
        renderTasks();
    }
}

function completeTask(index) {
    if (!tasks[index].completed) {
        tasks[index].completed = true;
        xp += 10;
        updateLevel();
        saveUserData();
        renderTasks();
    }
}

function updateLevel() {
    const xpToNextLevel = (level + 1) * 50;
    if (xp >= xpToNextLevel) {
        level++;
        alert(`Você subiu de nível! Agora está no nível ${level}. Seu prêmio: ${rewards[level - 1] || 'nenhum prêmio mais!'}`);
    }
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.completed ? `${task.name} (Concluída)` : task.name;
        if (!task.completed) {
            li.onclick = () => completeTask(index);
        } else {
            li.classList.add('completed');
        }
        taskList.appendChild(li);
    });
    document.getElementById('xp-info').innerText = `XP: ${xp}`;
    document.getElementById('level-info').innerText = `Nível: ${level}`;
    document.getElementById('reward-info').innerText = `Prêmio: ${rewards[level - 1] || 'nenhum prêmio'}`;
}

function saveUserData() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('xp', xp);
    localStorage.setItem('level', level);
}

function loadUserData() {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    xp = parseInt(localStorage.getItem('xp')) || 0;
    level = parseInt(localStorage.getItem('level')) || 0;
    renderTasks();
}
