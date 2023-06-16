/*
 File: script.js
 Assignment: Interactive Dynamic Multiplication Table
 Sindhuja Ghale, UMass Lowell Computer Science, Sindhuja_Ghale@student.uml.edu
 Copyright (c) 2023 by Sindhuja Ghale. All rights reserved. May be
 freely copied or excerpted for educational purposes with credit to the
 author.
 Updated by SG on June 15, 2023 at 10:00 PM
 Brief Overview: This interactive multiplication table dynamically generates based on user input, utilizing the power of JavaScript.
 Sources of Help: w3school, Class Notes, and Mdn Web Docs. 
*/

function generate_multitable() {            //Generate a Multiplication table based on the input

    // Removes any existing multiplication table
  if (document.querySelector(".tContainer")) {          
    var remove = document.querySelector(".tContainer");
    var parent1 = remove.parentElement;
    parent1.removeChild(remove);
  }

  // Retrieving input values and validating them. Changes the decimal input and rounds it to nearest integer.
  var minH = Math.round(parseFloat(document.getElementById("minHorizontal").value));
  var maxH = Math.round(parseFloat(document.getElementById("maxHorizontal").value));
  var minV = Math.round(parseFloat(document.getElementById("minVertical").value));
  var maxV = Math.round(parseFloat(document.getElementById("maxVertical").value));

  // Validating input values from User
  if (isNaN(minH) || isNaN(minV) || isNaN(maxH) || isNaN(maxV)) {
    document.getElementById("ErrorMessage").innerHTML = "All values must be valid integers.";
    document.getElementById("ErrorOutput").innerHTML = " ";
    return;
  }

  //Checking if the input is between -50 and 50 in Horizontal Column
  if (minH > 50 || maxH > 50 || minH < -50 || maxH < -50 ) {
    document.getElementById("ErrorMessage").innerHTML = "ERROR";
    document.getElementById("ErrorOutput").innerHTML = "In the Horizontal (Multiplier), make sure that the integer is always equal to or between -50 and 50.";
    return;
  }

  //Checking if the input is between -50 and 50 in Verticle Column
  if(minV > 50 || maxV > 50 || minV < -50 || maxV < -50) {
    document.getElementById("ErrorMessage").innerHTML = "ERROR";
    document.getElementById("ErrorOutput").innerHTML = "In the Verticle (Multiplier), make sure that the integer is always equal to or between -50 and 50.";
    return;
  }

  // Checking if minimum horizontal value is greater than maximum Horizontal value
  if (minH > maxH) {
    document.getElementById("ErrorMessage").innerHTML = "ERROR";
    document.getElementById("ErrorOutput").innerHTML = "In the Horizontal (Multiplier), make sure that the minimum integer is always less than or equal to the maximum integer.";
    return;
  }

  // Checking if minimum vertical value is greater than maximum vertical value
  if (minV > maxV) {
    document.getElementById("ErrorMessage").innerHTML = "ERROR";
    document.getElementById("ErrorOutput").innerHTML = "In the Verticle (Multiplicand), make sure that the minimum integer is always less than or equal to the maximum integer.";
    return;
  }


  // Calculating the length of rows and columns
  var hlength = maxH - minH + 2;
  var vlength = maxV - minV + 2;

  // Creating arrays to store values
  var harr = [];
  for (var x = minH; x <= maxH; x++) {
    harr.push(x);
  }
  var varr = [];
  for (var x = minV; x <= maxV; x++) {
    varr.push(x);
  }

  /* REFERENCE:
  https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
  */

  // Creating the elements for the multiplication table to display
  var body = document.getElementsByTagName("body")[0];
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");
  var wrapper = document.createElement("div");
  wrapper.classList.add("tContainer");

  //Create table rows and cells
  for (var i = 0; i < hlength; i++) {
    var row = document.createElement("tr");
    row.setAttribute("id", "mtRow");
    for (var j = 0; j < vlength; j++) {
      if (i == 0 && j == 0) {
        //Creating an empty cell for the top left corner of the multiplication table
        var cell = document.createElement("td");
        var cellText = document.createTextNode("");
        cell.setAttribute("id", "mtCell");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (i == 0) {
       // Creating cells for the first row (horizontal values)
        var cell = document.createElement("td");
        var cellText = document.createTextNode(varr[j - 1]);
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (j == 0) {
        // Creating cells for the first column (vertical values)
        var cell = document.createElement("td");
        var cellText = document.createTextNode(harr[i - 1]);
        cell.setAttribute("id", "mtCellC");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else {
        // Creating cells for the rest of the Multiplication table
        var cell = document.createElement("td");
        var cellText = document.createTextNode(harr[i - 1] * varr[j - 1]);
        cell.setAttribute("id", "mtCellG");
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
    }
    tblBody.appendChild(row);     //Appending the row to the table body
  }

  tbl.appendChild(tblBody);     //Appending the table body to the table

  wrapper.appendChild(tbl);
  body.appendChild(wrapper);
  tbl.setAttribute("border", "2");
  tbl.setAttribute("id", "multiTable");

  // Clearing error message
  document.getElementById("ErrorMessage").innerHTML = "";
  document.getElementById("ErrorOutput").innerHTML = "";
}
