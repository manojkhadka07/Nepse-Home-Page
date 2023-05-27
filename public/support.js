function populateTable() {
  axios.get('/api/data')
    .then(response => {
      const stocks = response.data;

      const stockDataContainer = document.getElementById('stockData');
      const asOfDateContainer = document.getElementById('asOfDate');

      stocks.forEach(stock => {
        const row = document.createElement('tr');

        // Create table cells and populate data
        const stockSymbolCell = createTableCell(stock.stockSymbol, 'stockSymbol');
        row.appendChild(stockSymbolCell);

        const maxPriceCell = createTableCell(stock.maxPrice, 'maxPrice');
        row.appendChild(maxPriceCell);

        const minPriceCell = createTableCell(stock.minPrice, 'minPrice');
        row.appendChild(minPriceCell);

        const openingPriceCell = createTableCell(stock.openingPrice, 'openingPrice');
        row.appendChild(openingPriceCell);

        const closingPriceCell = createTableCell(stock.closingPrice, 'closingPrice');
        row.appendChild(closingPriceCell);

        const amountCell = createTableCell(stock.amount, 'amount');
        row.appendChild(amountCell);

        const previousClosingCell = createTableCell(stock.previousClosing, 'previousClosing');
        row.appendChild(previousClosingCell);

        const differenceCell = createTableCell(stock.differenceRs, 'differenceRs');
        row.appendChild(differenceCell);

        const percentChangeCell = createTableCell(stock.percentChange, 'percentChange');
        row.appendChild(percentChangeCell);

        const volumeCell = createTableCell(stock.volume, 'volume');
        row.appendChild(volumeCell);

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

      // Set the asOfDate value
      if (stocks.length > 0) {
        asOfDateContainer.textContent = stocks[0].asOfDateString;
      }

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

// Helper function to create a table cell
function createTableCell(text, columnName) {
  const cell = document.createElement('td');
  cell.setAttribute('data-column', columnName);
  cell.textContent = text;
  return cell;
}

document.addEventListener('DOMContentLoaded', () => {
  populateTable();
});
