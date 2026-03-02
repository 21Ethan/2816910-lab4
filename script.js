

document.getElementById('search-btn').addEventListener('click', () => 
{
    const country = document.getElementById('country-input').value;
    displayCountry(country);
}
);
const input = document.getElementById('country-input');
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const country = input.value;
        displayCountry(country);
    }
});

async function displayCountry(country){
    const spinner = document.getElementById('loading-spinner');
    const errorMessage = document.getElementById('error-message');

    try {
        spinner.classList.remove('hidden');
        errorMessage.textContent='';
        const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);

        }
        const data= await response.json();
        const countryData = data[0]
        document.getElementById('country-info').innerHTML = `
        <h2>${countryData.name.common}</h2>
        <p><strong>Capital:</strong> ${countryData.capital[0]}</p>
        <p><strong>Population:</strong> ${countryData.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${countryData.region}</p>
        <img src="${countryData.flags.svg}" alt="${countryData.name.common} flag">
    `;}
        catch (error){
              errorMessage.textContent = 'Error: ' + error.message;
        }
        finally {
    
        spinner.classList.add('hidden');
    }
    }


