// Un reloj digital 24h + Fecha

const timeP = document.getElementById("timeP");
const infoHora = document.getElementById("infoHora");

if (timeP) {
  const now = new Date();
  const currentTime = now.toLocaleTimeString();
  timeP.innerText = currentTime;
} else {
  console.error("Elemento con ID 'timeP' no encontrado en el DOM.");
}

//funcion para cambiar la hora en un total de minutos y asociarlo a una frase
const interval = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;

  if (totalMinutes >= 1 && totalMinutes <= 420) {
    return "Es hora de descansar. Apaga y sigue mañana";
  } else if (totalMinutes >= 421 && totalMinutes <= 720) {
    return "Buenos días, desayuna fuerte y a darle al código";
  } else if (totalMinutes >= 721 && totalMinutes <= 840) {
    return "Echa un rato más pero no olvides comer";
  } else if (totalMinutes >= 841 && totalMinutes <= 960) {
    return "Espero que hayas comido";
  } else if (totalMinutes >= 961 && totalMinutes <= 1080) {
    return "Espero que hayas comido";
  } else if (totalMinutes >= 1081 && totalMinutes <= 1320) {
    return "Esto ya son horas extras, ... piensa en parar pronto";
  } else {
    return "Buenas noches, es hora de pensar en parar y descansar";
  }
};

if (timeP && infoHora) {
  const now = new Date();
  const currentTime = now.toLocaleTimeString();
  timeP.innerText = currentTime;

  const message = interval(currentTime);
  infoHora.innerText = message;
} else {
  console.error(
    "Elemento con ID 'timeP' o 'infoHora' no encontrado en el DOM."
  );
}

// Una estación meteorológica
const cityBtn = document.getElementById("cityBtn");

const fetchWeather = (city) => {
  if (!city) return;

  const weatherDisplayed = document.getElementById("weatherDisplayed");
  const apiKey = "a0eb19c6b94041bcb14110114240612";
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=yes&alerts=yes`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud no fue exitosa");
      }
      return response.json();
    })
    .then((data) => {
      if (!data || !data.current || !data.location) {
        throw new Error("Datos incompletos de la API");
      }

      const { name, country } = data.location;
      const { last_updated, temp_c, condition } = data.current;
      const iconUrl = `https:${condition.icon}`;

      weatherDisplayed.innerHTML = `
        <h3>Tiempo en ${name}, ${country}</h3>
        <p>Última actualización: ${last_updated}</p>
        <p>Temperatura: ${temp_c}°C</p>
        <p>Condiciones: ${condition.text}</p>
        <img src="${iconUrl}" alt="${condition.text}">
      `;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      weatherDisplayed.innerText =
        "Error: No se pudo obtener la información del clima.";
    });
};

document.getElementById("cityBtn").addEventListener("click", () => {
  const cityInput = document.getElementById("city").value.trim();
  if (!cityInput) {
    alert("Por favor, ingresa una ciudad válida.");
    return;
  }

  localStorage.setItem("lastCity", cityInput);
  fetchWeather(cityInput);
});

window.addEventListener("load", () => {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    document.getElementById("city").value = lastCity;
    fetchWeather(lastCity);
  }
});

window.addEventListener("load", () => {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    document.getElementById("city").value = lastCity;
    fetchWeather(lastCity);
  }
});

document.getElementById("cityBtn").addEventListener("click", () => {
  const cityInput = document.getElementById("city").value.trim();
  if (!cityInput) {
    alert("Por favor, ingresa una ciudad válida.");
    return;
  }

  localStorage.setItem("lastCity", cityInput);
  fetchWeather(cityInput);
});

window.addEventListener("load", () => {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    document.getElementById("city").value = lastCity;
    fetchWeather(lastCity);
  }
});

document.getElementById("cityBtn").addEventListener("click", () => {
  const cityInput = document.getElementById("city").value.trim();
  if (!cityInput) {
    alert("Por favor, ingresa una ciudad válida.");
    return;
  }

  localStorage.setItem("lastCity", cityInput);
  fetchWeather(cityInput);
});

window.addEventListener("load", () => {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    document.getElementById("city").value = lastCity;
    fetchWeather(lastCity);
  }
});

// Un creador de contraseñas seguras
const passwordDisplayed = document.getElementById("passwordDisplayed");
const passwordRequest = document.getElementById("passwordRequest");

const passwordRequested = (numberCharacter) => {
  const Mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const Minusculas = "abcdefghijklmnopqrstuvwxyz";
  const Numeros = "0123456789";
  const Simbolos = "!@#$%^&*()-_=+";
  const mergedArray = [...Mayusculas, ...Minusculas, ...Numeros, ...Simbolos];

  let password = [];
  for (let index = 0; index < numberCharacter; index++) {
    const randomIndex = Math.floor(Math.random() * mergedArray.length);
    password.push(mergedArray[randomIndex]);
  }
  return password.join("");
};

passwordRequest.addEventListener("click", () => {
  const numberCharacterInput = document
    .getElementById("numberCharacter")
    .value.trim();
  const numberCharacter = parseInt(numberCharacterInput, 10);

  if (isNaN(numberCharacter) || numberCharacter <= 0) {
    alert("Por favor, ingresa un número válido mayor que 0.");
    return;
  }

  const generatedPassword = passwordRequested(numberCharacter);
  passwordDisplayed.innerText = `Su nueva contraseña es: ${generatedPassword}`;

  localStorage.setItem("lastNumberCharacter", numberCharacter);
});

window.addEventListener("load", () => {
  const lastNumberCharacter = localStorage.getItem("lastNumberCharacter");
  if (lastNumberCharacter) {
    document.getElementById("numberCharacter").value = lastNumberCharacter;
  }
});

// Un listado de links interesántes (Además de imagenes random de fondo.)
// Get references to elements
const enlace = document.getElementById("enlace");
const nombreUrl = document.getElementById("nombreUrl");
const url = document.getElementById("url");
const listaEnlace = document.getElementById("listaEnlace");
const butonEnlace = document.getElementById("butonEnlace");

// cargar enlaces or añadir nuevo
window.addEventListener("load", () => {
  const enlaces = JSON.parse(localStorage.getItem("enlaces")) || [];

  // añadir el enlace a la lista
  listaEnlace.innerHTML = enlaces
    .map(
      (enlace) =>
        `<li><a href="${enlace.url}" target="_blank">${enlace.nombre}</a></li>`
    )
    .join("");
});

// filtrar el enlace
butonEnlace.addEventListener("click", () => {
  const nombre = nombreUrl.value.trim();
  const urlValue = url.value.trim();

  if (!nombre || !urlValue) {
    alert("Por favor, completa ambos campos antes de añadir el enlace.");
    return;
  }

  // guarda el enlace en local.storage
  const enlaces = JSON.parse(localStorage.getItem("enlaces")) || [];
  enlaces.push({ nombre, url: urlValue });
  localStorage.setItem("enlaces", JSON.stringify(enlaces));

  // actualiza la lista
  listaEnlace.innerHTML += `<li><a href="${urlValue}" target="_blank">${nombre}</a></li>`;

  // Confirmacion
  alert("Tu enlace ha sido añadido!");

  // actualize datos
  nombreUrl.value = "";
  url.value = "";
});

//Imagenes random background:

window.onload = () => choosePic();

const arrIMG = [];
for (let i = 1; i <= 130; i++) {
  arrIMG.push(i);
}

const choosePic = () => {
  const randomNum = arrIMG[Math.floor(Math.random() * arrIMG.length)];
  document.body.style.backgroundImage = `url('img/${randomNum}.jpg')`;
};
