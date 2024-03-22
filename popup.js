const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayData(data) {
    const cryptoDataElement = document.getElementById('crypto-data');
    cryptoDataElement.innerHTML = '';

    data.forEach(item => {
        const priceChange = item.price_change_percentage_24h;
        const priceChangeClass = priceChange >= 0 ? 'gainer' : 'loser';

        const cryptoItem = document.createElement('div');
        cryptoItem.classList.add('crypto-item');
        cryptoItem.innerHTML = `
            <div class="crypto-name">${item.name}</div>
            <div>Price: $${item.current_price.toFixed(2)}</div>
            <div class="${priceChangeClass}">24h Change: ${priceChange.toFixed(2)}%</div>
        `;
        cryptoDataElement.appendChild(cryptoItem);
    });
}

fetchData();
