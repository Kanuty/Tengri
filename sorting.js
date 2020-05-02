const dataTableHeader = dataTable
  .getElementsByTagName("thead")[0]
  .getElementsByTagName("tr")[0];
const headerId = dataTableHeader.getElementsByTagName("th")[0];
const headerCompany = dataTableHeader.getElementsByTagName("th")[1];
const headerCity = dataTableHeader.getElementsByTagName("th")[2];
// total income
const headerTI = dataTableHeader.getElementsByTagName("th")[3];
// average income
const headerAI = dataTableHeader.getElementsByTagName("th")[4];
// last mounth income
const headerLMI = dataTableHeader.getElementsByTagName("th")[5];

headerId.addEventListener("click", function () {
  sortTable(0);
});
headerCompany.addEventListener("click", function () {
  sortTable(1, "string");
});
headerCity.addEventListener("click", function () {
  sortTable(2, "string");
});
headerTI.addEventListener("click", function () {
  sortTable(3);
});
headerAI.addEventListener("click", function () {
  sortTable(4);
});
headerLMI.addEventListener("click", function () {
  sortTable(5);
});

// This sorting mechanism "work" but is hard to say that it make its job done. Elimination of global variables is necessity.
// Moreover, it is higly suggested to change a bubblig sort to merge or quick sort in a future (time dependent).
// Lastly, sorting mechanism should became modular and reusable in any table.

// n = column of the table
// type = "string" || "number" - depend if sorting has to be performed on strings or numbers
function sortTable(n, type = "number") {
  const rows = dataTableTB.rows;
  let switching = true;
  let shouldSwitch = false;
  // dir === "asc" || "desc"
  let dir = "asc";
  var i = 0;
  var switchcount = 0;
  while (switching === true) {
    switching = false;
    for (; i < rows.length - 1; i++) {
      let x = rows[i].getElementsByTagName("TD")[n];
      let y = rows[i + 1].getElementsByTagName("TD")[n];
      if (type == "string") {
        if (dir === "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (type == "number") {
        if (dir === "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
