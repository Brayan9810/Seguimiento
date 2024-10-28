// Guardar el tipo de usuario seleccionado y activar el modo correspondiente
function setUserType(userType) {
    localStorage.setItem('userType', userType);
    document.getElementById('user-selection').style.display = 'none';
    document.getElementById('project-content').style.display = 'block';

    // Si el usuario es Observador, deshabilitar los campos de entrada
    if (userType === 'viewer') {
        disableEditing();
    }
    loadData();
}

// Deshabilitar los campos para el modo Observador
function disableEditing() {
    document.querySelectorAll('#project-content input').forEach(input => {
        input.disabled = true;
    });
}

// Función para guardar datos en LocalStorage
function saveData() {
    const data = {
        startDate: document.getElementById('start-date-phase1').value,
        endDate: document.getElementById('end-date-phase1').value,
        responsible1: document.getElementById('responsible1-phase1').value,
        progress1: document.getElementById('progress-activity1-phase1').value,
        responsible2: document.getElementById('responsible2-phase1').value,
        progress2: document.getElementById('progress-activity2-phase1').value
    };
    localStorage.setItem('phase1Data', JSON.stringify(data));
}

// Función para cargar datos desde LocalStorage al iniciar la página
function loadData() {
    const savedData = JSON.parse(localStorage.getItem('phase1Data'));
    if (savedData) {
        document.getElementById('start-date-phase1').value = savedData.startDate || "";
        document.getElementById('end-date-phase1').value = savedData.endDate || "";
        document.getElementById('responsible1-phase1').value = savedData.responsible1 || "";
        document.getElementById('progress-activity1-phase1').value = savedData.progress1 || "";
        document.getElementById('responsible2-phase1').value = savedData.responsible2 || "";
        document.getElementById('progress-activity2-phase1').value = savedData.progress2 || "";
        updateProgress();
    }
}

// Función para actualizar la barra de progreso
function updateProgress() {
    const progress1 = parseInt(document.getElementById('progress-activity1-phase1').value) || 0;
    const progress2 = parseInt(document.getElementById('progress-activity2-phase1').value) || 0;

    const phaseProgress = Math.round((progress1 + progress2) / 2);
    const progressBar = document.getElementById('progress-bar-phase1');
    progressBar.style.width = `${phaseProgress}%`;
    progressBar.textContent = `${phaseProgress}%`;
}

// Cargar el tipo de usuario desde LocalStorage y aplicar la configuración correspondiente
window.onload = function() {
    const userType = localStorage.getItem('userType');
    if (userType) {
        setUserType(userType);
    }
};