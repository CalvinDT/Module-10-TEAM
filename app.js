const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = []

// Employee
const whatToDo = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What team member would you like to add?',
        name: 'members',
        choices: ["Engineer", "Intern", "Quit"]
      },
    ]).then(({ members }) => {
      if (members === "Quit") {
        console.log(team)
        const output = render(team)
        console.log(output)
        fs.writeFile(outputPath,output, function (err) {
          if (err) throw err;
          console.log('File Was Created');
        });
        
      }
      else if (members === "Engineer") {
        makeEngineer()
      }
      else if (members === "Intern") {
        makeIntern()
      }

    })
}



//  Engineer
const makeEngineer = () => {

  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is your user name?',
        name: 'username',
      },
      {
        type: 'input',
        message: 'What is your id?',
        name: 'id',
      },
      {
        type: 'input',
        message: 'What is your email?',
        name: 'email',
      },
      {
        type: 'input',
        message: 'What is your GitHub username?',
        name: 'github',
      },
    ])
    .then((response) => {
      let newEngineer = new Engineer(response.username, response.id, response.email, response.github);
      team.push(newEngineer);
      whatToDo()
    });
}

// Intern
const makeIntern = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is your user name?',
        name: 'username',
      },
      {
        type: 'input',
        message: 'What is your id?',
        name: 'id',
      },
      {
        type: 'input',
        message: 'What is your email?',
        name: 'email',
      },
      {
        type: 'input',
        message: 'What is the name of your school?',
        name: 'school',
      },
    ])
    .then((response) => {
      let newIntern = new Intern(response.username, response.id, response.email, response.school);
      team.push(newIntern);
      whatToDo()
    });
}

// Manager
const makeManager = () => {

  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the managers name?',
        name: 'username',
      },
      {
        type: 'input',
        message: 'What is your id?',
        name: 'id',
      },
      {
        type: 'input',
        message: 'What is your email?',
        name: 'email',
      },
      {
        type: 'input',
        message: 'What is your officeNumber?',
        name: 'officeNumber',
      },
    ])
    .then((response) => {
      let newManager = new Manager(response.username, response.id, response.email, response.officeNumber);
      team.push(newManager);
      whatToDo()
    });
}
 makeManager()