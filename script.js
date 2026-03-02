

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

async function displayCountry(country) {
    const spinner = document.getElementById('loading-spinner');
    const errorMessage = document.getElementById('error-message');
    const bordersSection = document.getElementById('bordering-countries');

    try {
        spinner.classList.remove('hidden');
        errorMessage.textContent = '';
        bordersSection.innerHTML = '';

        const response = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`);
        if (!response.ok) {
            throw new Error(`Country not found`);
        }

        const data = await response.json();
        const countryData = data[0];

        // Display main country
        document.getElementById('country-info').innerHTML = `
            <h2>${countryData.name.common}</h2>
            <p><strong>Capital:</strong> ${countryData.capital?.[0] || 'N/A'}</p>
            <p><strong>Population:</strong> ${countryData.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${countryData.region}</p>
            <img src="${countryData.flags.svg}" alt="${countryData.name.common} flag" width="150">
        `;

       
        if (countryData.borders && countryData.borders.length > 0) {

            for (const code of countryData.borders) {
                const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha/${code}?fullText=true`);
                const borderData = await borderResponse.json();
                const neighbor = borderData[0];

                bordersSection.innerHTML += `
                    <div>
                        <p>${neighbor.name.common}</p>
                        <img src="${neighbor.flags.svg}" width="100">
                    </div>
                `;
            }

        } else {
            bordersSection.innerHTML = `<p>No bordering countries</p>`;
        }

    } catch (error) {
        errorMessage.textContent = 'Error: ' + error.message;
    } finally {
        spinner.classList.add('hidden');
    }
}
    


