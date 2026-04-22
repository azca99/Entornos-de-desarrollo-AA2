import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm';
import { el, icon, td } from './documentUtil.js';
import { notifyError, notifyOk } from './dialogUtil.js';

window.readPlayers = function() {
    axios.get('http://localhost:3000/players')
        .then((response) => {
            const playerList = response.data;
            const playerTable = el('tableBody');

            playerTable.innerHTML = '';

            playerList.forEach(player => {
                const row = document.createElement('tr');
                row.id = 'player-' + player.id;

                row.innerHTML =
                    td(player.name) +
                    td(player.birth_date) +
                    td(player.position) +
                    td(player.id_team) +
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
        })
        .catch((error) => {
            console.error('Error al cargar los jugadores:', error);
            notifyError('Error al cargar los jugadores');
        });
};

window.removePlayer = function(id) {
    if (confirm('¿Está seguro de que desea eliminar este jugador?')) {
        axios.delete('http://localhost:3000/players/' + id)
            .then((response) => {
                el('player-' + id).remove();
                notifyOk('Jugador eliminado correctamente');
            })
            .catch((error) => {
                console.error('Error al eliminar el jugador:', error);

                if (error.response && error.response.data && error.response.data.message) {
                    notifyError(error.response.data.message);
                } else {
                    notifyError('Error al eliminar el jugador');
                }
            });
    }
};