// In a production version, all console.log's has to be removed!!!

const errorLink =
  "https://s3.amazonaws.com/blog.invisionapp.com/uploads/2018/04/404-2.jpg";

const dataTable = document.getElementById("dataTable");
const dataTableTB = dataTable.getElementsByTagName("tbody")[0];

// Data request
const request = new XMLHttpRequest();
request.open("GET", "https://recruitment.hal.skygate.io/companies", true);
request.onload = function () {
  if (request.readyState === 4) {
    if (request.status === 200) {
      const companies = JSON.parse(request.responseText);

      for (let i = 0; i < companies.length; i += 1) {
        // createNewTableTBody(dataTable, companies[i].id, companies[i].name);
        createNewTableCells(i, companies[i]);
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

function createNewTableCells(iteration, data) {
  let row = dataTableTB.insertRow(iteration);
  const noValue = "There is no data";

  //check for data
  if (data.id == null) {
    data.id = noValue;
  }
  if (data.name == null) {
    data.name = noValue;
  }
  if (data.city == null) {
    data.city = noValue;
  }
  // insert cells
  row.insertCell(0).innerHTML = data.id;
  row.insertCell(1).innerHTML = data.name;
  row.insertCell(2).innerHTML = data.city;
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
