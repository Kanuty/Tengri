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
      for (let element of companies) {
        createNewTableCells(element);
        incomesCall(element.id);
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
function incomesCall(id) {
  request.open(
    "GET",
    `https://recruitment.hal.skygate.io/incomes/${id}`,
    false
  );
  request.onload = function () {
    if (request.readyState === 4) {
      if (request.status === 200) {
        const companyIncomes = JSON.parse(request.responseText);
        callculateIncomes(companyIncomes.incomes);
        hideModal();
      } else {
        errorInfo();
      }
    }
  };
  request.onerror = function () {
    console.error(request.statusText);
  };
  request.send(null);
}

// 12 = December
// 1 = January
function callculateIncomes(data, lastMonth = 12) {
  if (data.length === 0) {
    return console.log("There is no company income data");
  }
  let totalIncome = 0;
  let averageIncome = 0;
  let lastMonthIncome = 0;
  for (let element of data) {
    totalIncome += parseInt(element.value);

    if (parseInt(element.date.split("T")[0].split("-")[1]) === lastMonth) {
      lastMonthIncome += parseInt(element.value);
    }
  }
  averageIncome = totalIncome / data.length;
  dataTableTB.rows[0].cells[3].innerHTML = totalIncome;
  dataTableTB.rows[0].cells[4].innerHTML = averageIncome;
  dataTableTB.rows[0].cells[5].innerHTML = lastMonthIncome;
}

function createNewTableCells(data) {
  let row = dataTableTB.insertRow(0);
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

  row.insertCell(0).innerHTML = parseInt(data.id);
  row.insertCell(1).innerHTML = data.name;
  row.insertCell(2).innerHTML = data.city;
  row.insertCell(3).innerHTML = "data yet to be loaded";
  row.insertCell(4).innerHTML = "data yet to be loaded";
  row.insertCell(5).innerHTML = "data yet to be loaded";
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
