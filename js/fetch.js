let API_KEY = '18f3fdf8f746f9f414adbf8c2e402ce5';

let latitud;
let longitud;


var myLatlng;
var map;
var infowindow;
var latitude;
var longtitude;
var marker;

let sendButton = document.getElementById('sendButton');
let inputElement = document.getElementById('busqueda');
let info = document.getElementById('info');
let ultimaBusqueda = JSON.parse(localStorage.getItem('ciudad'));
let mapa = document.getElementById('map');
mapa.style.display = 'none';




if (ultimaBusqueda != null) {
    madeGrid(ultimaBusqueda);
    mapa.style.display = 'block';
} else {
    mapa.style.display = 'none';

}


sendButton.addEventListener('click', () => {
    console.log('Cuidad:', inputElement.value);
    buscarEnApi(inputElement.value);
    mapa.style.display = 'block';


});

function buscarEnApi(cuidad) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cuidad}&appid=${API_KEY}&units=metric&lang=es`)
        .then(response => response.json())
        .then(data => {
            guardarResultado('ciudad', data);
            madeGrid(data);
            updatePosition(data.coord.lat, data.coord.lon);
            console.log(data.coord.lat, data.coord.lon);

        })
        .catch(function(error) {
            console.log('Algo fallo!', error);
        });
}

function guardarResultado(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


function madeGrid(data) {
    console.log('Data:', data);

    if (data.cod == 404) {
        console.log('ERROR 404! POR FAVOR, INGRESAR UNA CUIDAD VALIDA');

    } else {
        inputElement.value = '';
        info.innerHTML = '';

        let temp = document.createElement("p");
        let minima = document.createElement("p");
        let maxima = document.createElement("p");
        let humedad = document.createElement("p");
        let sensacion = document.createElement("p");
        let presion = document.createElement("p");
        let viento = document.createElement("p");
        let ciudad = document.createElement("p");
        let pais = document.createElement("p");
        let icono = document.createElement("img");
        let descripcion = document.createElement("p");
        let icon;
        latitud = data.coord.lat;
        longitud = data.coord.lon;


        temp.className = 'temp';
        ciudad.id = 'ciudad';
        pais.className = 'pais';
        icono.className = 'icono';
        descripcion.className = 'descripcion';
        maxima.className = 'col-md-2 col-6 maxima';
        minima.className = 'col-md-2 col-6 minima';
        humedad.className = 'col-md-2 col-6 humedad';
        sensacion.className = 'col-md-2 col-6 sensacion';
        presion.className = 'col-md-2 col-6 presion';
        viento.className = 'col-md-2 col-6 viento';

        icon = `http://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png`;

        info.appendChild(icono);
        info.appendChild(temp);
        info.appendChild(ciudad);
        info.appendChild(pais);
        info.appendChild(descripcion);
        info.appendChild(minima);
        info.appendChild(maxima);
        info.appendChild(humedad);
        info.appendChild(sensacion);
        info.appendChild(presion);
        info.appendChild(viento);

        pais = data.sys.country;
        icono.src = icon;
        ciudad.innerHTML = data.name + ' ' + pais;
        descripcion.innerHTML = data.weather[0]["description"];
        temp.innerHTML = data.main.temp + '°';
        minima.innerHTML = 'Mín ' + data.main.temp_min + '°';
        maxima.innerHTML = 'Max ' + data.main.temp_max + '° ';
        humedad.innerHTML = 'Humedad ' + data.main.humidity + '%';
        sensacion.innerHTML = 'Térmica  ' + data.main.feels_like;
        presion.innerHTML = 'Presión: ' + data.main.pressure;
        viento.innerHTML = 'Vel. viento ' + data.wind.speed;





    }

}




loadMap();

function loadMap() {
    myLatlng = new google.maps.LatLng(latitud, longitud);

    var mapOptions = {
        zoom: 10,
        center: myLatlng
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);


    marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: "The Mew",
        animation: google.maps.Animation.DROP
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
}

function updatePosition(lat, lng) {
    myLatlng = new google.maps.LatLng(lat, lng);
    marker.setPosition(myLatlng);
    map.setCenter(myLatlng);
}