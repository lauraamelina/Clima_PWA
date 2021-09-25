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


function madeGrid(data) {
    console.log('Data:', data);
    if (data.cod == 404) {
        console.log('ERROR 404! POR FAVOR, INGRESAR UNA CUIDAD VALIDA');
    } else {
        let maxima = document.createElement("p");
        let minima = document.createElement("p");
        let humedad = document.createElement("p");
        let sensacion = document.createElement("p");
        let presion = document.createElement("p");
        let viento = document.createElement("p");

        main.appendChild(maxima);
        main.appendChild(minima);
        main.appendChild(humedad);
        main.appendChild(sensacion);
        main.appendChild(presion);
        main.appendChild(viento);

        maxima.innerHTML = 'Maxima: ' + data.main.temp_max;
        minima.innerHTML = 'Minima: ' + data.main.temp_min;
        humedad.innerHTML = 'Humedad: ' + data.main.humidity;
        sensacion.innerHTML = 'Sensación Térmica:  ' + data.main.feels_like;
        presion.innerHTML = 'Presión: ' + data.main.pressure;
        viento.innerHTML = 'Velocidad del viento: ' + data.wind.speed;

    }
}