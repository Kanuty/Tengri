const searchField = document.getElementById("searchInput");

function searcher() {
  for (elements of dataTableTB.rows) {
    elements.classList.add("hide");
  }
  let searchingValue = searchField.value.toUpperCase();
  let tr = dataTableTB.getElementsByTagName("tr");
  let columnsQuantity = dataTableTB
    .getElementsByTagName("tr")[0]
    .getElementsByTagName("td").length;
  for (let i = 0; i < tr.length; i += 1) {
    for (let j = 0; j <= columnsQuantity; j += 1) {
      let td = tr[i].getElementsByTagName("td")[j];
      if (td) {
        let txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(searchingValue) > -1) {
          tr[i].classList.remove("hide");
        }
      }
    }
  }
}

searchField.addEventListener("keyup", function () {
  searcher();
});
