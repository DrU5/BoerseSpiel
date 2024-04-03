document.addEventListener('DOMContentLoaded', function () {
    // Function to generate random stock names
    function generateRandomStockNames(count) {
        const names = [];
        const prefixes = ["Mining", "Chemical", "Insurance", "Shipping", "Automotive"];
        const suffixes = ["Corp", "Inc", "Ltd", "Group", "Enterprises"];

        for (let i = 0; i < count; i++) {
            const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
            const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
            names.push(prefix + " " + suffix);
        }

        return names;
    }

    // Function that generates a random number in a specific range
    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Function to generate random starting prices for stocks
    function generateRandomStartingPrices(count, minPrice, maxPrice) {
        const prices = [];
        for (let i = 0; i < count; i++) {
            const price = getRandomNumber(minPrice, maxPrice);
            prices.push(parseFloat(price.toFixed(2)));
        }
        return prices;
    }

    // Function to update stock prices and trends
    function updateStockPrices() {
        const tableBody = document.getElementById('stock-list');
        const rows = tableBody.querySelectorAll('tr');

        rows.forEach((row, index) => {
            // Retrieve current stock price
            const currentPriceElement = row.querySelector('.price');
            let currentPrice = parseFloat(currentPriceElement.textContent.substring(1));
            
            // Retrieve previous stock price
            const previousPriceElement = row.querySelector('.previous-price');
            let previousPrice = parseFloat(previousPriceElement.textContent.substring(1));

            // Generate a random percentage change between -0.5% and 0.5%
            const change = (Math.random() * (0.005 - (-0.005)) + (-0.005)) * currentPrice;
            
            // Update the stock price
            currentPrice += change;

            // Update the trend
            let trend = '';
            if (currentPrice > previousPrice) {
                trend = 'up';
            } else if (currentPrice < previousPrice) {
                trend = 'down';
            }

            // Update the text content
            currentPriceElement.textContent = `$${currentPrice.toFixed(2)}`;
            row.querySelector('.trend').textContent = trend;

            // Store current price as previous price for next iteration
            previousPriceElement.textContent = `$${currentPrice.toFixed(2)}`;
        });
    }

    // Generate random names for stocks
    const stockNames = generateRandomStockNames(10);

    // Generate random starting prices for stocks
    const startingPrices = generateRandomStartingPrices(10, 50, 200);

    // Display the generated stock names and starting prices on the webpage
    const tableBody = document.getElementById('stock-list');
    for (let i = 0; i < stockNames.length; i++) {
        const stockName = stockNames[i];
        const startingPrice = startingPrices[i];

        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = stockName;
        row.appendChild(nameCell);

        const priceCell = document.createElement('td');
        priceCell.classList.add('price', 'previous-price');
        priceCell.textContent = `$${startingPrice.toFixed(2)}`;
        row.appendChild(priceCell);

        const trendCell = document.createElement('td');
        trendCell.classList.add('trend');
        row.appendChild(trendCell);

        tableBody.appendChild(row);
    }

    // Call the function every second to update stock prices
    setInterval(updateStockPrices, 1000);
});
