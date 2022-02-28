const mysql = require('mysql2');
const db = require('./db/connection');
const chalklet = require('chalklet');
//styling for chalklet
const { colorOptions, fontOptions, colorOptions2 } = require('./lib/consoleStyle');


// helper functions for prompts
const { bootUp } = require('./utils/index');


// connecting to the database
db.connect(err => {
  if (err) throw err;
});


// ascII art for greeting message
console.log(chalklet.generate('Employee', colorOptions, fontOptions));
console.log(chalklet.generate('Tracker', colorOptions2, fontOptions));

// start inquirer chain
bootUp();




