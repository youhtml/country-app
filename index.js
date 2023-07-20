// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)

// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.

// 3 - Passer les données à une variable

// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP

// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
// coutry.name.includes(inputSearch.value);

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays

const result = document.querySelector(".countries-container");

const inputRange = document.getElementById("inputRange");

const form = document.getElementById("inputSearch");

const rangeCountry = document.getElementById("rangeValue");

let countrys = [];
async function fecthCountrys() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json()) //permet de convertir en json pour qu'il soit lisable
    .then((data) => (countrys = data)); //ce tu amene je l'appel data
  console.log(countrys);
}

function countryDisplay() {
  // countrys.length = inputRange.value;

  result.innerHTML = countrys

    .filter((country) => country.translations.fra.common.includes(form.value))
    .slice(0, inputRange.value)
    .map(
      (country) =>
        `
      <div class="informations">
      <div class="img">  
      <img src="${country.flags.svg}" alt="photo">
      </div>
      <h2>${country.translations.fra.common}</h2>
      <h3>${country.capital}</h3>
      <p>Population: ${country.population}</p>
      </div>
      `
    );
}

inputRange.addEventListener("input", () => {
  rangeCountry.textContent = inputRange.value;
  fecthCountrys().then(countryDisplay());
});

form.addEventListener("input", (e) => {
  console.log(form.value);
  fecthCountrys().then(countryDisplay());
});
