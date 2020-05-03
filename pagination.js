const pagination = document.getElementById("pagination");

const showNumber = [0, 50, 100, 150, 200, 250, 300];

function createPagButtons(quantityOfBtn) {
  for (let i = 0; i <= quantityOfBtn; i += 1) {
    let pagButton = document.createElement("BUTTON");
    pagButton.innerHTML = i + 1;
    pagButton.addEventListener("click", function () {
      paginationBtnFunctionality(i);
    });
    pagination.appendChild(pagButton);
  }
}
createPagButtons(5);
paginationBtnFunctionality(0);

function paginationBtnFunctionality(i) {
  for (elements of dataTableTB.rows) {
    elements.classList.add("hide");
  }
  for (let toShow = showNumber[i]; toShow < showNumber[i + 1]; toShow += 1) {
    dataTableTB.rows[toShow].classList.remove("hide");
  }
}
