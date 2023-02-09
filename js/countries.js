const body = document.body;
const switcher = document.getElementById('theme-switch');
const dark = document.getElementById('dark');
const light = document.getElementById('light');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const searchWarning = document.querySelector('.search-warning');
const dropdownBtn = document.getElementById('dropdown-btn');
const dropdownBox = document.getElementById('dropdown-box');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const loadingScreen = document.querySelector('.loading-screen');
const countries = document.getElementById('countries');
const africa = document.getElementById('africa');
const asia = document.getElementById('asia');
const nAmerica = document.getElementById('nAmerica');
const sAmerica = document.getElementById('sAmerica');
const europe = document.getElementById('europe');
const oceania = document.getElementById('oceania');
let searchValue = '';
let screenMode;
let countriesArr = [];

window.onload = () => {
    if (localStorage.getItem('screenMode') === 'dark') {
        dark.classList.remove('hide');
        light.classList.add('hide');
        body.classList.add('dark-mode');
    }
}

switcher.addEventListener('click', () => {
    if (dark.classList.contains('hide')) {
        dark.classList.remove('hide');
        light.classList.add('hide');
        body.classList.add('dark-mode');
        localStorage.setItem('screenMode', 'dark');
    } else if (light.classList.contains('hide')) {
        light.classList.remove('hide');
        dark.classList.add('hide');
        body.classList.remove('dark-mode');
        localStorage.setItem('screenMode', 'light');
    }
})

searchInput.addEventListener('focus', () => {
    searchWarning.classList.remove('hide');
    searchValue = searchInput.value;
})

searchInput.addEventListener('blur', () => {
    searchWarning.classList.add('hide');
})

searchInput.addEventListener('input', () => {
    searchInput.value = searchInput.value.replace(/[^a-zA-Z \-]/g, '')
    searchValue = searchInput.value;
})

searchInput.addEventListener('keypress', (event) => {
    if (event.key ==='Enter') {
        event.preventDefault();
        window.open(`search.html?search=${searchValue}`, '_self');
    }
})

const search = (event) => {
    event.preventDefault();
    window.open(`search.html?search=${searchValue}`, '_self');
}

dropdownBtn.addEventListener('click', () => {
    dropdownBox.classList.toggle('hide')
})

dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        dropdownBox.classList.add('hide');
    })
})

const fetchCountries = () => {
    loadingScreen.classList.remove('hide');
    countries.innerHTML = ''
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            countriesArr = data.map(item => {
                return {
                    'name': item.name.common,
                    'population': item.population,
                    'continent': item.continents[0],
                    'capital': item.capital || 'nil',
                    'flag': item.flags.png,
                    'code': item.cca3,
                    'borders': item.borders || []
                }
            }).sort(() => Math.random() - Math.random())

            displayCountries(countriesArr)
        })
        .catch(err => {
            loadingScreen.classList.add('hide');
            console.log(err)
            let errMessage =    `<div>
                                    <h2>Something went wrong.</h2>
                                    <details>
                                        ${err.toString()}
                                    </details>
                                </div>`
            countries.innerHTML = errMessage
        })
}

fetchCountries();

const displayCountries = arr => {
    let card = ``;
    for (let i = 0; i < arr.length; i++) {
        card += `<a href="country.html?country=${arr[i].code}" class="text-decoration-none m-0 p-0">
                    <div class="country-card rounded pb-3">
                        <div class="flag ratio ratio-16x9">
                            <img src="${arr[i].flag}" alt="Flag of ${arr[i].name}" class="img-fluid">
                        </div>
                        <div class="card-body d-flex flex-column py-4 px-4">
                            <h2 class="country-name h5 fw-800 mb-3">${arr[i].name}</h2>
                            <p class="fw-600 fs-small mb-1">Population: <span class="population fw-300 opacity-9">${arr[i].population.toLocaleString()}</span></p>
                            <p class="fw-600 fs-small mb-1">Continent: <span class="region fw-300 opacity-9">${arr[i].continent}</span></p>
                            <p class="fw-600 fs-small mb-3">Capital: <span class="capital fw-300 opacity-9">${arr[i].capital}</span></p>
                        </div>
                    </div>
                </a>`
    }

    countries.innerHTML = card;
    loadingScreen.classList.add('hide');
}

const filterAll = () => {
    loadingScreen.classList.remove('hide');
    countries.innerHTML = ''
    let newCountriesArr = countriesArr;
    displayCountries(newCountriesArr)
}

const filterAfrica = () => {
    loadingScreen.classList.remove('hide');
    countries.innerHTML = ''
    let newCountriesArr = countriesArr.filter(item => item.continent == 'Africa')
    displayCountries(newCountriesArr)
}

const filterAsia = () => {
    loadingScreen.classList.remove('hide');
    countries.innerHTML = ''
    let newCountriesArr = countriesArr.filter(item => item.continent == 'Asia')
    displayCountries(newCountriesArr)
}

const filterNAmerica = () => {
    loadingScreen.classList.remove('hide');
    countries.innerHTML = ''
    let newCountriesArr = countriesArr.filter(item => item.continent == 'North America')
    displayCountries(newCountriesArr)
}

const filterSAmerica = () => {
    loadingScreen.classList.remove('hide');
    countries.innerHTML = ''
    let newCountriesArr = countriesArr.filter(item => item.continent == 'South America')
    displayCountries(newCountriesArr)
}

const filterEurope = () => {
    loadingScreen.classList.remove('hide');
    countries.innerHTML = ''
    let newCountriesArr = countriesArr.filter(item => item.continent == 'Europe')
    displayCountries(newCountriesArr)
}

const filterOceania = () => {
    loadingScreen.classList.remove('hide');
    countries.innerHTML = ''
    let newCountriesArr = countriesArr.filter(item => item.continent == 'Oceania')
    displayCountries(newCountriesArr)
}

const filterAntarctica = () => {
    loadingScreen.classList.remove('hide');
    countries.innerHTML = ''
    let newCountriesArr = countriesArr.filter(item => item.continent == 'Antarctica')
    displayCountries(newCountriesArr)
}