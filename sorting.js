const dataTableHeader = dataTable
  .getElementsByTagName("thead")[0]
  .getElementsByTagName("tr")[0];
const rows = dataTableTB.rows;
const headerId = dataTableHeader.getElementsByTagName("th")[0];
const headerCompany = dataTableHeader.getElementsByTagName("th")[1];
const headerCity = dataTableHeader.getElementsByTagName("th")[2];
// total income
const headerTI = dataTableHeader.getElementsByTagName("th")[3];
// average income
const headerAI = dataTableHeader.getElementsByTagName("th")[4];
// last mounth income
const headerLMI = dataTableHeader.getElementsByTagName("th")[5];
let sorterToggle = [true, true, true, true, true, true];

headerId.addEventListener("click", function () {
  sortTable(0, sorterToggle[0]);
  paginationBtnFunctionality(0);
});
headerCompany.addEventListener("click", function () {
  sortTable(1, sorterToggle[1], "string");
  paginationBtnFunctionality(0);
});
headerCity.addEventListener("click", function () {
  sortTable(2, sorterToggle[2], "string");
  paginationBtnFunctionality(0);
});
headerTI.addEventListener("click", function () {
  sortTable(3, sorterToggle[3]);
  paginationBtnFunctionality(0);
});
headerAI.addEventListener("click", function () {
  sortTable(4, sorterToggle[4]);
  paginationBtnFunctionality(0);
});
headerLMI.addEventListener("click", function () {
  sortTable(5, sorterToggle[5]);
  paginationBtnFunctionality(0);
});

// This sorting mechanism "work" but is hard to say that it make its job done.
// Moreover, it is higly suggested to change a bubblig sort to more efficent algorithm like merge, radix or quick sort in the future.

// n = column of the table
// type = "string" || "number" - depend if sorting has to be performed on strings or numbers

function sortTable(n, asc = true, type = "number") {
  let switchingCounter = 0;
  while (switchingCounter <= rows.length) {
    let noSwaps = true;
    for (let i = 0; i < rows.length - 1 - switchingCounter; i += 1) {
      let x = rows[i].getElementsByTagName("TD")[n];
      let y = rows[i + 1].getElementsByTagName("TD")[n];

      if (type === "string") {
        if (asc) {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            noSwaps = false;
          }
        } else if (!asc) {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            noSwaps = false;
          }
        }
      }
      if (type === "number") {
        if (asc) {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            noSwaps = false;
          }
        } else if (!asc) {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            noSwaps = false;
          }
        }
      }
    }
    switchingCounter += 1;
    if (noSwaps) {
      sorterToggle[n] = !asc;
      break;
    }
  }
}
