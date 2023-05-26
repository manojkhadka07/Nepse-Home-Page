function populateTable() {
  axios.get('/api/data')
    .then(response => {
      const stocks = response.data;

      const stockDataContainer = document.getElementById('stockData');

      stocks.forEach(stock => {
        const row = document.createElement('tr');

        // Create table cells and populate data
        const stockSymbolCell = document.createElement('td');
        stockSymbolCell.setAttribute('data-column', 'stockSymbol');
        stockSymbolCell.textContent = stock.stockSymbol;
        row.appendChild(stockSymbolCell);

        const maxPriceCell = document.createElement('td');
        maxPriceCell.setAttribute('data-column', 'maxPrice');
        maxPriceCell.textContent = stock.maxPrice;
        row.appendChild(maxPriceCell);

        const minPriceCell = document.createElement('td');
        minPriceCell.setAttribute('data-column', 'minPrice');
        minPriceCell.textContent = stock.minPrice;
        row.appendChild(minPriceCell);

        const openingPriceCell = document.createElement('td');
        openingPriceCell.setAttribute('data-column', 'openingPrice');
        openingPriceCell.textContent = stock.openingPrice;
        row.appendChild(openingPriceCell);

        const closingPriceCell = document.createElement('td');
        closingPriceCell.setAttribute('data-column', 'closingPrice');
        closingPriceCell.textContent = stock.closingPrice;
        row.appendChild(closingPriceCell);

        const amountCell = document.createElement('td');
        amountCell.setAttribute('data-column', 'amount');
        amountCell.textContent = stock.amount;
        row.appendChild(amountCell);

        const previousClosingCell = document.createElement('td');
        previousClosingCell.setAttribute('data-column', 'previousClosing');
        previousClosingCell.textContent = stock.previousClosing;
        row.appendChild(previousClosingCell);

        const differenceCell = document.createElement('td');
        differenceCell.setAttribute('data-column', 'differenceRs');
        differenceCell.textContent = stock.differenceRs;
        row.appendChild(differenceCell);

        const percentChangeCell = document.createElement('td');
        percentChangeCell.setAttribute('data-column', 'percentChange');
        percentChangeCell.textContent = stock.percentChange;
        row.appendChild(percentChangeCell);

        const volumeCell = document.createElement('td');
        volumeCell.setAttribute('data-column', 'volume');
        volumeCell.textContent = stock.volume;
        row.appendChild(volumeCell);

        const asOfDateStringCell = document.createElement('td');
        asOfDateStringCell.setAttribute('data-column', 'asOfDateString');
        asOfDateStringCell.textContent = stock.asOfDateString;
        row.appendChild(asOfDateStringCell);

        // Apply different styles based on percent change
        const percentChange = stock.percentChange;
        if (percentChange > 0) {
          row.classList.add('positive-change');
        } else if (percentChange < 0) {
          row.classList.add('negative-change');
        } else {
          row.classList.add('zero-change');
        }

        // Append the row to the table body
        stockDataContainer.appendChild(row);
      });

      // Get the table element
      const table = document.querySelector('.table');

      // Get the table headers
      const headers = table.querySelectorAll('th[data-sort]');

      // Sort direction (ascending or descending)
      let sortDirection = 1;

      // Add click event listeners to table headers
      headers.forEach(header => {
        header.addEventListener('click', () => {
          // Get the column to sort by from the data-sort attribute
          const column = header.dataset.sort;

          // Sort the table data based on the selected column
          sortTable(column);

          // Toggle the sort direction
          sortDirection *= -1;

          // Remove the "sorted" class from all headers
          headers.forEach(header => header.classList.remove('sorted', 'desc'));

          // Add the "sorted" class to the currently sorted header
          header.classList.add('sorted');
          if (sortDirection === -1) {
            header.classList.add('desc');
          }
        });
      });

      // Function to sort the table data
      function sortTable(column) {
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));

        rows.sort((rowA, rowB) => {
          const valueA = getValue(rowA, column);
          const valueB = getValue(rowB, column);

          if (valueA < valueB) {
            return -1 * sortDirection;
          } else if (valueA > valueB) {
            return 1 * sortDirection;
          } else {
            return 0;
          }
        });

        // Remove existing rows from the table
        rows.forEach(row => tbody.removeChild(row));

        // Add sorted rows back to the table
        rows.forEach(row => tbody.appendChild(row));
      }

      // Function to get the value of a specific column in a table row
      function getValue(row, column) {
        const cell = row.querySelector(`td[data-column="${column}"]`);
        return cell ? cell.textContent.trim() : '';
      }
    })
    .catch(error => {
      console.error(error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  populateTable();
});
