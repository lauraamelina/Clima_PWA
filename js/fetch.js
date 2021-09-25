let API_KEY = '18f3fdf8f746f9f414adbf8c2e402ce5';
let URL = 'api.openweathermap.org/data/2.5/';

let sendButton = document.getElementById('sendButton');
let inputElement = document.getElementById('busqueda');
let main = document.getElementById('main');

sendButton.addEventListener('click', () => {
    console.log('Cuidad:', inputElement.value);
    buscarEnApi(inputElement.value);

});