import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm';
import { el } from './documentUtil.js';
import { notifyError, notifyOk } from './dialogUtil.js';

// Cambiar formato de la fecha para el backend
const formatDateForBackend = function(dateString) {
    if (!dateString) {
        return '';
    }

    const parts = dateString.split('-');

    if (parts.length !== 3) {
        return '';
    }

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return `${day}-${month}-${year}`;
};

// GET teams
window.loadTeams = function() {
    axios.get('http://localhost:3000/teams')
        .then((response) => {
            // Datos
            const teamList = response.data;
            // Desplegable
            const teamSelect = el('id_team');

            // Crear option por cada elemento en el array de teams
            teamList.forEach(team => {
                const option = document.createElement('option');
                // Valor = id
                option.value = team.id;
                // Nombre del team
                option.textContent = team.name;
                teamSelect.appendChild(option);
            });
        })
        .catch((error) => {
            console.error('Error al cargar los equipos:', error);
            notifyError('Error al cargar los equipos');
        });
};

// PUT: añadir player 
window.addPlayer = function() {
    const name = el('name').value.trim();
    const birth_date = el('birth_date').value;
    const position = el('position').value.trim();
    const id_team = el('id_team').value;

    if (name === '' || birth_date === '' || position === '' || id_team === '') {
        notifyError('Todos los campos son obligatorios');
        return;
    }

    axios.post('http://localhost:3000/players', {
        name: name,
        birth_date: formatDateForBackend(birth_date),
        position: position,
        id_team: parseInt(id_team)
    })
    .then((response) => {
        notifyOk('Jugador registrado correctamente');

        el('name').value = '';
        el('birth_date').value = '';
        el('position').value = '';
        el('id_team').value = '';
    })
    .catch((error) => {
        console.error('Error al registrar el jugador:', error);

        if (error.response && error.response.data && error.response.data.message) {
            notifyError(error.response.data.message);
        } else {
            notifyError('Error al registrar el jugador');
        }
    });
};