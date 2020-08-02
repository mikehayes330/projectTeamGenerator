const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
let employees = [];

function startApp() {
  console.log(
    "Lets build a team, please answer the following questions about your team to generate a webpage with quick easy access to your teams information."
  );
// function that prompts for the INTERN info and constructs the INTERN object
  function addIntern() {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Please enter the interns name.",
        },
        {
          type: "input",
          name: "id",
          message: "Please provide the interns employee ID number.",
        },
        {
          type: "input",
          name: "email",
          message: "Please enter the interns email address.",
        },
        {
          type: "input",
          name: "school",
          message: "Please enter the school the intern attends.",
        },
      ])
      .then(function (response) {
        const intern = new Intern(
          response.name,
          response.id,
          response.email,
          response.school
        );
        // console.log(intern);
        employees.push(intern);
        whichMember();
      });
  }

  // prompts user to decide which type of team member will be added next.
  function whichMember() {
    return inquirer
      .prompt([
        {
          type: "list",
          name: "whichMember",
          message: "Which member of the team would you like to add?",
          choices: ["Engineer", "Intern", "Im done, lets finalize it!"],
        },
      ])
      .then(function (response) {
        // console.log(response.whichMember);

        if (response.whichMember === "Engineer") {
          addEngineer();
        }
        if (response.whichMember === "Intern") {
          addIntern();
        }
        if (response.whichMember === "Im done, lets finalize it!") {
          
            fs.writeFile(outputPath, render(employees), 'utf8', function(err){
                console.log("You have succesfully Written your HTML!!")
            })
          
        }
      });
  }
// function that prompts for the MANAGER info and constructs the MANAGER object
  function addManager() {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Please enter your name.",
        },
        {
          type: "input",
          name: "id",
          message: "Please provide your employee ID number.",
        },
        {
          type: "input",
          name: "email",
          message: "Please enter your email address.",
        },
        {
          type: "input",
          name: "officeNumber",
          message: "Please enter your office number.",
        },
      ])
      .then(function (response) {
        const manager = new Manager(
          response.name,
          response.id,
          response.email,
          response.officeNumber
        );
        // console.log(manager);
        employees.push(manager);
        whichMember();
      });
  }
  
  // function that prompts for the ENGINEER info and constructs the ENGINEER object
  function addEngineer() {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Please enter the engineers name.",
        },
        {
          type: "input",
          name: "id",
          message: "Please provide the engineers employee ID number.",
        },
        {
          type: "input",
          name: "email",
          message: "Please enter the engineers email address.",
        },
        {
          type: "input",
          name: "github",
          message: "Please enter the engineers github username.",
        },
      ])
      .then(function (response) {
        const engineer = new Engineer(
          response.name,
          response.id,
          response.email,
          response.github
        );
        console.log(engineer);
        employees.push(engineer);
        whichMember();
      });
  }
  addManager();
}
startApp();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
