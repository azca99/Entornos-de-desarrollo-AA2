const express = require('express');
 
const app = express();
app.use(express.json());
 

 
app.listen(8083, () => {
    console.log('Iniciando el backend en el puerto 8083');
});