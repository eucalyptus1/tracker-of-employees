const mysql = require("mysql2");
const connection = require("./connection.js");
const inquirer = require("inquirer");
const viewTable = require("console.table");

function init() {
  inquirer
    .prompt({
      type: "list",
      name: "menu",
      message: "Choose from the following options",
      options: [
        "View all Employees",
        "View all Departments",
        "View all Roles",
        "Add an Employee",
        "Add a Department",
        "Add a Role",
        "Update an Employee Role",
        "Exit",
      ],
    })
    .then(function (choice) {
      if (choice.menu === "View all Employees") {
        viewEmployees();
      } else if (choice.menu === "View all Departments") {
        viewDepartments();
      } else if (choice.menu === "View all Roles") {
        viewRoles();
      } else if (choice.menu === "Add an Employee") {
        addEmployees();
      } else if (choice.menu === "Add a Department") {
        addDepartment();
      } else if (choice.menu === "Add a Role") {
        addRole();
      } else if (choice.menu === "Update an Employee Role") {
        updateEmployee();
      } else if (choice.menu === "Exit") {
        connection.end();
      }
    });
}

viewEmployees = () => {
  connection.query(`SELECT * FROM employee`, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    init();
  });
};

viewDepartments = () => {
  connection.query("SELECT * FROM department", (err, rows) => {
    if (err) throw err;
    console.table(rows);
    init();
  });
};

viewRoles = () => {
  connection.query(`SELECT * FROM role`, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    runApp();
  });
};

init();
