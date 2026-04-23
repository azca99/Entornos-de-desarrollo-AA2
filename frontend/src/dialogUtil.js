import Toastify from 'https://cdn.jsdelivr.net/npm/toastify-js/+esm';

const notifyError = function(message) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {
            background: 'red'
        }
    }).showToast();
};

const notifyOk = function(message) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {
            background: 'green'
        }
    }).showToast();
};

// Resolver problema de mostrar una notificación después de redirigir a otra página, guardando la notificación en localStorage y mostrándola al cargar la nueva página
// Guarda notificación como JSON
const saveNotification = function(type, message) {
    console.log('Guardando notificación:', type, message);

    localStorage.setItem('savedNotification', JSON.stringify({
        type, 
        message
    }));
};

// Buscar y mostrar mensaje
const showSavedNotification = function() {
    const savedNotification = localStorage.getItem('savedNotification');
    console.log('Notificación guardada:', savedNotification);

    if (!savedNotification) {
        return;
    }

    const notification = JSON.parse(savedNotification);

    if (notification.type === 'ok') {
        notifyOk(notification.message);
    } else if (notification.type === 'error') {
        notifyError(notification.message);
    }

    localStorage.removeItem('savedNotification');
};

export { notifyError, notifyOk, saveNotification, showSavedNotification };