let API_KEY = '18f3fdf8f746f9f414adbf8c2e402ce5';
let URL = 'api.openweathermap.org/data/2.5/';

let sendButton = document.getElementById('sendButton');
let inputElement = document.getElementById('busqueda');
let main = document.getElementById('main');

sendButton.addEventListener('click', () => {
    console.log('Cuidad:', inputElement.value);
    buscarEnApi(inputElement.value);

});



function buscarEnApi(cuidad) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cuidad}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {
            madeGrid(data);
        })
        .catch(function(error) {
            console.log('Algo fallo!', error);
        });
}