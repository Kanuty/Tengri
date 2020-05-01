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
const qwerty = document.getElementById("qwerty");

qwerty.addEventListener("click", sortTable(0));
headerId.addEventListener("click", sortTable(0));
headerCompany.addEventListener("click", sortTable(1));
headerCity.addEventListener("click", sortTable(2));
headerTI.addEventListener("click", sortTable(3));
headerAI.addEventListener("click", sortTable(4));
headerLMI.addEventListener("click", sortTable(5));

function sortTable(n) {
  const rows = dataTable.rows;
  let switching = true;
  let shouldSwitch = false;
  // dir == asc || desc
  let dir = "asc";
  let switchcount = 0;

  while (switching) {
    switching = false;
    for (let i = 1; i < rows.length - 1; i++) {
      console.log(rows[i].getElementsByTagName("TD")[n]);
      let x = rows[i].getElementsByTagName("TD")[n];
      let y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
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
