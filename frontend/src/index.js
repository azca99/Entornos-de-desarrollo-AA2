import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm';
import { el, icon, td } from './documentUtil.js';
import { notifyError, notifyOk } from './dialogUtil.js';

window.readTeams = function () {
    axios.get('http://localhost:3000/teams')
        .then((response) => {
            const teamList = response.data;
            const teamTable = el('tableBody');

            teamTable.innerHTML = '';

            teamList.forEach(team => {
                const row = document.createElement('tr');
                row.id = 'team-' + team.id;

                row.innerHTML =
                    td(team.name) +
                    td(team.city) +
                    td(team.sport) +
                    '<td>' +
                    '<a class="btn btn-warning me-1" href="modify.html?id=' + team.id + '">' +
                    icon('edit') +
                    '</a>' +
                    '<a class="btn btn-danger" href="javascript:removeTeam(' + team.id + ')">' +
                    icon('delete') +
                    '</a>' +
                    '</td>';

                teamTable.appendChild(row);
            });
        })
        .catch((error) => {
            console.error('Error al cargar los equipos:', error);
            notifyError('Error al cargar los equipos. Por favor, inténtalo de nuevo.');
        });
};

window.removeTeam = function (id) {
    if (confirm('¿Estás seguro de que deseas eliminar este equipo?')) {
        axios.delete('http://localhost:3000/teams/' + id)
            .then((response) => {
                if (response.status == 204) {
                    // TODO No se ve el mensaje
                    notifyOk('Equipo eliminado correctamente');
                    el('team ' + id).remove();
                }
            })
            .catch((error) => {
                console.error('Error al eliminar el equipo:', error);

                if (error.response && error.response.data && error.response.data.message) {
                    notifyError(error.response.data.message);
                } else {
                    notifyError('Error al eliminar el equipo. Por favor, inténtalo de nuevo.');
                }
            });
    }
};
