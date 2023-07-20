const countriesContainer = document.querySelector(".countries-container");
const btnSort = document.querySelectorAll(".btnSort");
let countriesData = [];

let sortMethod = "maxToMin"; //de base on va aller du plus grand au plus petit

async function fetchCountries() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countriesData = data));
  console.log(countriesData);
  countriesisplay();
}

function countriesisplay() {
  countriesContainer.innerHTML = countriesData
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    ) //atentoin sensible a la casse dc les maj ne seron pas reconnu
    .sort((a, b) => {
      if (sortMethod === "maxToMin") {
        return b.population - a.population;
      } else if (sortMethod === "minToMax") {
        return a.population - b.population;
      } else if (sortMethod === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    .slice(0, inputRange.value)
    .map(
      (country) =>
        `
       <div class="card">
       <img src=${country.flags.svg} alt="drapeau ${
          country.translations.fra.common
        }">
        <h2>${country.translations.fra.common}</h2>
        <h4>${country.capital}</h4>
        <p>Population: ${country.population.toLocaleString()}</p>
       </div>

    `
    )
    .join(""); //pour enlever les virgules
}

window.addEventListener("load", fetchCountries);

inputSearch.addEventListener("input", countriesisplay);
inputRange.addEventListener("input", () => {
  countriesisplay();
  rangeValue.textContent = inputRange.value;
});
// console.log(countriesData); //dc a ce niveau ne lie rien car la foncyion n'est pas a ce stade async

btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // console.log(e.target.id);
    sortMethod = e.target.id;
    countriesisplay();
  });
});
