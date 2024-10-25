let tasks = [];
let xp = 0;
let level = 1;
const prizes = [
    "Beijo de Momo", 
    "Abraço de Momo", 
    "Buquê de Momo", 
    "Chocolate de Momo", 
    "O que Momo Annika quiser"
];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    if (task) {
        tasks.push(task);
        updateTaskList();
        taskInput.value = '';
    }
}

function updateTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        li.onclick = () => completeTask(task);
        taskList.appendChild(li);
    });
}

function completeTask(task) {
    tasks = tasks.filter(t => t !== task);
    xp += 10;
    updateXp();
    updateTaskList();
}

function updateXp() {
    document.getElementById('xpDisplay').textContent = xp;
    document.getElementById('xpBar').value = xp;

    if (xp >= 1000) {
        levelUp();
    }
}

function levelUp() {
    xp -= 1000;
    level++;
    document.getElementById('levelDisplay').textContent = `Nível: ${level}`;
    document.getElementById('xpDisplay').textContent = xp;

    const prize = level - 1 < prizes.length ? prizes[level - 2] : "Nenhum prêmio disponível";
    document.getElementById('prizeDisplay').textContent = `Prêmio: ${prize}`;
    document.getElementById('xpBar').value = xp;
}
