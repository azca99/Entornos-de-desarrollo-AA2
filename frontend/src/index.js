import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm';
import { el, icon, td } from './documentUtil.js';
import { notifyError, notifyOk } from './dialogUtil.js';

let teamsData = [];

const printTeams = function(teamList) {
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
};

// READ: leer equipos
window.readTeams = function () {
    axios.get('http://localhost:3000/teams')
        .then((response) => {
            teamsData = response.data;
            printTeams(teamsData);
        })
        .catch((error) => {
            console.error('Error al cargar los equipos:', error);
            notifyError('Error al cargar los equipos');
        });
};

// Buscar teams por filtrado
window.filterTeams = function() {
    const searchText = el('searchTeam').value.trim().toLowerCase();

    const filteredTeams = teamsData.filter(team =>
        team.name.toLowerCase().includes(searchText) ||
        team.city.toLowerCase().includes(searchText) ||
        team.sport.toLowerCase().includes(searchText)
    );

    printTeams(filteredTeams);
};

// DELETE: Eliminar equipo
window.removeTeam = function (id) {
    if (confirm('¿Estás seguro de que deseas eliminar este equipo?')) {
        axios.delete('http://localhost:3000/teams/' + id)
            .then((response) => {
                    // TODO No se ve el mensaje
                    notifyOk('Equipo eliminado correctamente');
                    printTeams(teamsData);
                    el('team ' + id).remove();
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
