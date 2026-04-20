import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm';
import { el } from './documentUtil.js';
import { notifyError, notifyOk } from './dialogUtil.js';

window.addTeam = function() {

    // Leer lo que escribe el usuario en los campos del formulario
    const name = el('name').value;
    const city = el('city').value;
    const sport = el('sport').value;

    // Validaciones
    if (name === '' || city === '' || sport === '') {
        notifyError('Por favor, rellena todos los campos');
        return;
    }

    // POST: mandar JSON al backend
    axios.post('http://localhost:3000/teams', {
        name: name,
        city: city,
        sport: sport
    })
    .then((response) => {
        notifyOk('Equipo registrado correctamente');
        el('name').value = '';
        el('city').value = '';
        el('sport').value = '';
        window.location.href = 'index.html';
    })
    .catch((error) => {
        console.error('Error al registrar el equipo:', error);

        if (error.response && error.response.data && error.response.data.message) {
            notifyError(error.response.data.message);
        } else {
            notifyError('Error desconocido');
        }
    });
};