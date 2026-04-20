import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm';
import { el } from './documentUtil.js';
import { notifyError, notifyOk } from './dialogUtil.js';

// Obtener Id del equipo a modificar
const getTeamIdFromUrl = function() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
};

window.loadTeam = function() {
    const id = getTeamIdFromUrl();

    // Validación: si no hay Id, mostrar error
    if (!id) {
        notifyError('Id del equipo no proporcionada');
        return;
    }

    axios.get(`http://localhost:3000/teams/${id}`)
        .then((response) => {
            console.log('Equipo cargado:', response.data);
            const team = response.data;

            // Cargar los datos del equipo en el formulario
            el('name').value = team.name;
            el('city').value = team.city;
            el('sport').value = team.sport;
        })
        .catch((error) => {
            console.error('Error al cargar el equipo:', error);

            if (error.response && error.response.data && error.response.data.message) {
                notifyError(error.response.data.message);
            } else {
                notifyError('Error desconocido');
            }
        });
};

window.updateTeam = function() {
    const id = getTeamIdFromUrl();

    // Validación: si no hay Id, mostrar error
    if (!id) {
        notifyError('Id del equipo no proporcionada');
        return;
    }

    // Leer lo que escribe el usuario en los campos del formulario
    const name = el('name').value;
    const city = el('city').value;
    const sport = el('sport').value;

    // Validaciones
    if (name === '' || city === '' || sport === '') {
        notifyError('Por favor, rellena todos los campos');
        return;
    }

    // PUT: mandar JSON al backend
    axios.put(`http://localhost:3000/teams/${id}`, {
        name: name,
        city: city,
        sport: sport
    })
    .then((response) => {
        notifyOk('Equipo actualizado correctamente');
        window.location.href = 'index.html';
    })
    .catch((error) => {
        console.error('Error al actualizar el equipo:', error);
        if (error.response && error.response.data && error.response.data.message) {
            notifyError(error.response.data.message);
        } else {
            notifyError('Error desconocido');
        }
    });
};