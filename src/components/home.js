import React from "react";
import "./home.css";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

const Home = () => {
  var v1 = 1;
  var datesExclData = [];

  const handleDateExcluded = () => {
    var dates = document.getElementById("datesExcl").value;
    var date = new Date(dates);

    var v2 = document.getElementById("startDate").value;

    // Checking if the user is entering excluded date before entering start date and end date

    var v3 = document.getElementById("endDate").value;
    if (v2 === "" || v3 === "") {
      alert("Please Enter Start date and End date before Excluding Dates");
      return;
    }
    var v3d = new Date(v3);

    var v4 = new Date(v2);

    // Check if dates excluded are between Start Date and End Date

    if (date > v3d || date < v4) {
      alert("Excluded date should be Between the Start date & End Date");
      return;
    }

    for (let o of document.querySelectorAll("#datesExcl")) {
      datesExclData.push(o.value);
    }
    var preview = document.getElementById("datePreview");
    preview.appendChild(document.createTextNode(dates + ", "));
    document.getElementById("datesExcl").value = "";
  };

  const handleNewRow = () => {
    // Checking if a feild is remained empty

    if (!document.getElementById("startDate").value) {
      alert("Please enter the starting date");
      return;
    } else if (!document.getElementById("endDate").value) {
      alert("Please enter the ending date");
      return;
    } else if (!document.getElementById("leadCount").value) {
      alert("Please enter the Lead Count");
      return;
    }

    var preview = document.getElementById("datePreview");

    var v2 = document.getElementById("startDate").value;

    var v3 = document.getElementById("endDate").value;
    var v3d = new Date(v3);

    var v4 = new Date(v2);

    // check if end date is bigger than start date
    if (v3d < v4) {
      alert("Start date should be lower than the End date");
      return;
    }


    // Creating tr
    var tr = document.createElement("TR");
    document.getElementById("tbody").appendChild(tr);

    // Creating td

    var y0 = document.createElement("TD");
    var y1 = document.createElement("TD");
    var y2 = document.createElement("TD");
    var y3 = document.createElement("TD");
    var y4 = document.createElement("TD");
    var y5 = document.createElement("TD");
    var y6 = document.createElement("TD");
    var y7 = document.createElement("TD");
    var y8 = document.createElement("TD");
    var y9 = document.createElement("TD");

    // Assigning value to td

    y0.appendChild(document.createTextNode("N/A"));

    y1.appendChild(document.createTextNode(v1++));

    y2.appendChild(document.createTextNode(v2));

    y3.appendChild(document.createTextNode(v3));

    y4.appendChild(
      document.createTextNode(v4.getMonth() + 1 + ", " + v4.getFullYear())
    );

    y5.appendChild(document.createTextNode(datesExclData));

    var v6 = v3d.getDate() + 1 - v4.getDate() - datesExclData.length;
    y6.appendChild(document.createTextNode(v6));

    var v7 = document.getElementById("leadCount").value;
    y7.appendChild(document.createTextNode(v7));

    var v8 = Math.round(v7 / v6);
    y8.appendChild(document.createTextNode(v8));

    var v9 = new Date().toLocaleString();
    y9.appendChild(document.createTextNode(v9));

    // appending all td
    tr.appendChild(y0);
    tr.appendChild(y1);
    tr.appendChild(y2);
    tr.appendChild(y3);
    tr.appendChild(y4);
    tr.appendChild(y5);
    tr.appendChild(y6);
    tr.appendChild(y7);
    tr.appendChild(y8);
    tr.appendChild(y9);

    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    document.getElementById("leadCount").value = "";
    preview.innerHTML = "";
    datesExclData = [];
  };

  const handleSubmit = () => {
    var table = document.getElementById("dataTable");
    var tableArr = [];
    for (var i = 1; i < table.rows.length; i++) {
      tableArr.push({
        Action: table.rows[i].cells[0].innerHTML,
        ID: table.rows[i].cells[1].innerHTML,
        StartDate: table.rows[i].cells[2].innerHTML,
        EndDate: table.rows[i].cells[3].innerHTML,
        MonthYear: table.rows[i].cells[4].innerHTML,
        DatesExcluded: table.rows[i].cells[5].innerHTML,
        NoOfDays: table.rows[i].cells[6].innerHTML,
        LeadCount: table.rows[i].cells[7].innerHTML,
        ExpectedDRR: table.rows[i].cells[8].innerHTML,
        LastUpdated: table.rows[i].cells[9].innerHTML,
      });
    }
    console.log(tableArr);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/save-data");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(tableArr.map((obj) => JSON.stringify(obj)));
  };

  return (
    <>
      <div className="">
        <h1 className="logo">Daily Run Rate</h1>
      </div>
      <div className="container">
        <div className="leftbox">
          <nav className="editors">
            <div className="gap">
              <label htmlFor="start date">Start date</label> <br />
              <input id="startDate" className="inputdate" type="date" />
            </div>
            <div className="gap">
              <label htmlFor="end date">End date</label> <br />
              <input id="endDate" className="inputdate" type="date" />
            </div>
            <div id="excl">
              <label htmlFor="start date">Dates Excluded</label>
              <div style={{ display: "flex" }}>
                <input id="datesExcl" className="inputdate" type="date" />
                <i
                  onClick={handleDateExcluded}
                  className="fa-regular fa-square-plus"
                  style={{
                    fontSize: "2em",
                    paddingLeft: "2%",
                    cursor: "pointer",
                    color: "#024457",
                  }}
                ></i>
              </div>
            </div>
            <p id="datePreview"></p>
            <div>
              <label htmlFor="start date">Lead Count</label>
              <input id="leadCount" className="inputdate" type="number" />
            </div>
            <Button
              className="my-3"
              variant="outline-danger"
              onClick={handleNewRow}
            >
              Add New
            </Button>
          </nav>
        </div>
        <div className="rightbox">
          <Table id="dataTable" className="responstable table-hover">
            <thead>
              <tr>
                <th>Action</th>
                <th>ID</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Month, Year</th>
                <th>Dates Excluded</th>
                <th>No of Days</th>
                <th>Lead Count</th>
                <th>Expected DRR</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody id="tbody"></tbody>
          </Table>
          <button className="buttonSave" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
