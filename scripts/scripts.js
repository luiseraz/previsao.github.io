// Define your API key
const chave = "cebcd482eda57fa9a6714c1c2ba91885";

// Function to update weather information on the webpage
function updateWeatherInfo(data) {
    const cityNameElement = document.querySelector(".cidade");
    const tempElement = document.querySelector(".temp");
    const iconElement = document.querySelector(".icone");
    const humidityElement = document.querySelector(".umidade");

    if (cityNameElement) {
        cityNameElement.textContent = `Tempo em ${data.name}`;
    }

    if (tempElement) {
        tempElement.textContent = `${Math.floor(data.main.temp)}°C`;
    }

    if (iconElement) {
        iconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    }

    if (humidityElement) {
        humidityElement.textContent = `Umidade: ${data.main.humidity}%`;
    }
}

// Function to fetch weather data for a given city
async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${chave}&lang=pt_br&units=metric`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // Propagate the error
    }
}

// Function to handle button click event
function cliqueiNoBotao() {
    const inputCidade = document.querySelector(".input-cidade");
    const cidade = inputCidade.value.trim();

    if (cidade) {
        fetchWeatherData(cidade)
            .then(data => {
                updateWeatherInfo(data);
            })
            .catch(error => {
                console.error('Error:', error);
                // Optionally display an error message to the user
            });
    } else {
        console.error('Requer nome da Cidade');
        // Optionally display a message to enter a city name
    }
}
