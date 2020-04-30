// In a production version, all console.log's has to be removed!!!

const closeBtn = document.getElementById("gdprClose");
const cookieR = document.getElementById("cookieRemover");
const gdprList = document.getElementById("gdprList");
const gdprR = document.getElementById("gdprReject");
const gdprA = document.getElementById("gdprAccept");
const modal = document.getElementById("simpleModal");
const modalClose = document.getElementById("modalClose");

const errorLink =
  "https://s3.amazonaws.com/blog.invisionapp.com/uploads/2018/04/404-2.jpg";

// new consts

const dataTable = document.getElementById("dataTable");
const dataTableTB = dataTable.getElementsByTagName("tbody")[0];

cookieR.addEventListener("click", removeCookies);

// Modal
closeBtn.addEventListener("click", closeModal);
gdprR.addEventListener("click", closeModalR);
gdprA.addEventListener("click", closeModalA);
modalClose.addEventListener("click", openModal);

function noScroll() {
  window.scrollTo(0, 0);
}

function openModal() {
  modal.style.display = "block";
  window.addEventListener("scroll", noScroll);
}

function closeModal() {
  hideModal();
}

function closeModalR() {
  hideModal();
  createPermisioncookie("false");
  console.log(document.cookie);
}

function closeModalA() {
  hideModal();
  createPermisioncookie("true");
  console.log(document.cookie);
}

function hideModal() {
  modal.style.display = "none";
  window.removeEventListener("scroll", noScroll);
}

// Do (sth) on a page load
(function () {
  if (location.protocol === "https:") {
    if (document.cookie !== "permission=true") {
      openModal();
    }
  } else {
    console.log("（╬ಠ益ಠ) lack of https（╬ಠ益ಠ)");
  }
})();

// Data request
const request = new XMLHttpRequest();
request.open("GET", "https://recruitment.hal.skygate.io/companies", true);
request.onload = function () {
  if (request.readyState === 4) {
    if (request.status === 200) {
      const companies = JSON.parse(request.responseText);

      for (let i = 0; i < companies.length; i += 1) {
        // createNewTableTBody(dataTable, companies[i].id, companies[i].name);
        let row = dataTableTB.insertRow(i);
        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let cell2 = row.insertCell(2);
        cell0.innerHTML = companies[i].id;
        cell1.innerHTML = companies[i].name;
        cell2.innerHTML = companies[i].city;
      }
    } else {
      errorInfo();
    }
  }
};
request.onerror = function () {
  console.error(request.statusText);
};
request.send(null);

//
function createNewTableTBody(target = dataTable, ...text) {
  const arr = text;
  const tb = target.tBodies;
  console.log(tb);
  console.log(target);

  const row = document.createElement("tr");
  const cell = document.createElement("td");
  const tableBody = document.createElement("tBody");
  dataTable.appendChild(tableBody);

  for (let i = 0; i < text.length; i += 1) {
    cell.innerText = arr[i];
    row.appendChild(cell);
  }
  target.appendChild(row);
}

function errorInfo(
  errorText = "Sorry, something is wrong on our side",
  target = dataTable
) {
  const paragraph = document.createElement("p");
  const text = document.createTextNode(errorText);
  paragraph.appendChild(text);
  target.appendChild(paragraph);
}

function removeCookies() {
  const res = document.cookie;
  const multiple = res.split(";");
  for (let i = 0; i < multiple.length; i += 1) {
    const key = multiple[i].split("=");
    document.cookie = key[0] + " =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
  }
  console.log(document.cookie);
}

function createPermisioncookie(value = "false") {
  const d = new Date();
  // 24h expiration time
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  const expires = "; expires=" + d.toGMTString();
  document.cookie = `permission=${value} ${expires}`;
}
