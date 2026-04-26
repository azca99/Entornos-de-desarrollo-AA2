import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm';
import { el } from './documentUtil.js';
import { notifyError, saveNotification } from './dialogUtil.js';
import { isValidUrl } from './validationUtil.js';

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
            el('image_url').value = team.image_url || '';
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

// UPDATE team
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
    const image_url = el('image_url').value.trim();

    // Validaciones
    if (name === '' || city === '' || sport === '') {
        notifyError('Por favor, rellena todos los campos');
        return;
    }

    // Validar URL de escudo
    if (image_url && !isValidUrl(image_url)) {
        notifyError('Por favor, introduce una URL válida para el escudo');
        return;
    }

    // PUT: mandar JSON al backend
    axios.put(`http://localhost:3000/teams/${id}`, {
        name: name,
        city: city,
        sport: sport,
        image_url: image_url
    })
    .then((response) => {
        saveNotification('ok', 'Equipo actualizado correctamente');
        window.location.href = 'index.html';
    })
    .catch((error) => {
        console.error('Error al actualizar el equipo:', error);
        if (error.response && error.response.data && error.response.data.message) {
            saveNotification('error', error.response.data.message);
        } else {
            saveNotification('error', 'Error desconocido');
        }
    });
};