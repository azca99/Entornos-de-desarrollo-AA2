import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm';
import { el, icon, td } from './documentUtil.js';
import { notifyError, notifyOk, saveNotification, showSavedNotification } from './dialogUtil.js';

// Guardar lista de equipos
let teamsData = [];

// Obtener nombre de team por id
const getTeamNameById = function(id_team) {
    const team = teamsData.find(team => team.id === id_team);

    if (team) {
        return team.name;
    }

    return 'Equipo no encontrado';
};

// Pintar players
const printPlayers = function(playerList) {
    const playerTable = el('tableBody');
    playerTable.innerHTML = '';

    playerList.forEach(player => {
                const row = document.createElement('tr');
                row.id = 'player-' + player.id;

                row.innerHTML =
                    td(player.name) +
                    td(player.birth_date) +
                    td(player.position) +
                    td(getTeamNameById(player.id_team)) +
                    '<td>' +
                        '<a class="btn btn-warning me-1" href="player-modify.html?id=' + player.id + '">' +
                            icon('edit') +
                        '</a>' +
                        '<a class="btn btn-danger" href="javascript:removePlayer(' + player.id + ')">' +
                            icon('delete') +
                        '</a>' +
                    '</td>';

                playerTable.appendChild(row);
            });
}

// READ: leer players
window.readPlayers = function() {
    showSavedNotification();

    Promise.all([
        axios.get('http://localhost:3000/players'),
        axios.get('http://localhost:3000/teams')
    ])
    .then(([playersResponse, teamsResponse]) => {
        const playerList = playersResponse.data;
        teamsData = teamsResponse.data;

        printPlayers(playerList);
        })
    .catch((error) => {
        console.error('Error al cargar los jugadores:', error);
        saveNotification('error', 'Error al cargar los jugadores');
    });
};

// Buscar players por backend
window.searchPlayers = function() {
    const searchText = el('searchPlayer').value.trim();

    if (searchText === '') {
        readPlayers();
        return;
    }

    // proteger input con encodeURIComponent
    Promise.all([
        axios.get('http://localhost:3000/players/search?name=' + encodeURIComponent(searchText)),
        axios.get('http://localhost:3000/teams')
    ])
    .then(([playersResponse, teamsResponse]) => {
        const playerList = playersResponse.data;
        teamsData = teamsResponse.data;

        printPlayers(playerList);
        })
    .catch((error) => {
        console.error('Error al buscar jugadores:', error);
        saveNotification('error', 'Error al buscar jugadores');
    });
};

// DELETE: eliminar players
window.removePlayer = function(id) {
    if (confirm('¿Está seguro de que desea eliminar este jugador?')) {
        axios.delete('http://localhost:3000/players/' + id)
            .then((response) => {
                el('player-' + id).remove();
                saveNotification('ok', 'Jugador eliminado correctamente');
            })
            .catch((error) => {
                console.error('Error al eliminar el jugador:', error);

                if (error.response && error.response.data && error.response.data.message) {
                    saveNotification('error', error.response.data.message);
                } else {
                    saveNotification('error', 'Error al eliminar el jugador');
                }
            });
    }
    readPlayers();
};