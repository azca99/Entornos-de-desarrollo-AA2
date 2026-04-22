import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm';
import { el } from './documentUtil.js';
import { notifyError, notifyOk } from './dialogUtil.js';

// Obtener Id del player a modificar
const getPlayerIdFromUrl = function() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
};

// Cambiar formato de la fecha
const formatDate = function(dateString) {
    if (!dateString) {
        return '';
    }
    
    const parts = dateString.split('-');

    if (parts.length !== 3) {
        return '';
    }

    const day = parts[0];
    const month = parts[1];
    const year = parts[2];

    return `${year}-${month}-${day}`;
};

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

// Cargar teams para el select
const loadTeams = function(selectedTeamId) {
    return axios.get('http://localhost:3000/teams')
        .then((response) => {
            const teamList = response.data;
            const teamSelect = el('id_team');

            teamSelect.innerHTML = '<option value="">Seleccione un equipo</option>';

            teamList.forEach(team => {
                const option = document.createElement('option');
                option.value = team.id;
                option.textContent = team.name;
                teamSelect.appendChild(option);
            });

            // Guardar el Id del team
            if (selectedTeamId) {
                teamSelect.value = selectedTeamId;
            }
        });
};

// Cargar datos del player
window.loadPlayer = function() {
    const id = getPlayerIdFromUrl();

    // Validación: si no hay Id, mostrar error
    if (!id) {
        notifyError('No se ha indicado el id del jugador');
        return;
    }

    axios.get('http://localhost:3000/players/' + id)
        .then((response) => {
            const player = response.data;

            // Cargar los datos del player en el formulario
            return loadTeams(player.id_team)
                .then(() => {
                    el('name').value = player.name;
                    el('birth_date').value = formatDate(player.birth_date);
                    el('position').value = player.position;
                });
        })
        .catch((error) => {
            console.error('Error al cargar el jugador:', error);

            if (error.response && error.response.data && error.response.data.message) {
                notifyError(error.response.data.message);
            } else {
                notifyError('Error al cargar el jugador');
            }
        });
};

// UPDATE player
window.updatePlayer = function() {
    const id = getPlayerIdFromUrl();

    // Validación: si no hay Id, mostrar error
    if (!id) {
        notifyError('No se ha indicado el id del jugador');
        return;
    }

    // Leer lo que escribe el usuario en los campos del formulario
    const name = el('name').value.trim();
    const birth_date = el('birth_date').value;
    const position = el('position').value.trim();
    const id_team = el('id_team').value;

    // Validaciones
    if (name === '' || birth_date === '' || position === '' || id_team === '') {
        notifyError('Todos los campos son obligatorios');
        return;
    }

    // PUT: mandar JSON al backend
    axios.put('http://localhost:3000/players/' + id, {
        name: name,
        birth_date: formatDateForBackend(birth_date),
        position: position,
        id_team: parseInt(id_team)
    })
    .then((response) => {
        notifyOk('Jugador actualizado correctamente');
        window.location.href = 'players.html';
    })
    .catch((error) => {
        console.error('Error al actualizar el jugador:', error);

        if (error.response && error.response.data && error.response.data.message) {
            notifyError(error.response.data.message);
        } else {
            notifyError('Error al actualizar el jugador');
        }
    });
};