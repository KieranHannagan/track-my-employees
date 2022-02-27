const mysql = require('mysql2');
const db = require('./db/connection');
const chalklet = require('chalklet');
//styling for chalklet
const { colorOptions, fontOptions, colorOptions2 } = require('./utils/consoleStyle');


// helper functions for prompts
const { bootUp }  = require('./utils/actions');;;



db.connect(err => {
  if (err) throw err;
});


// ascII art 
console.log(chalklet.generate('Employee', colorOptions, fontOptions));
console.log(chalklet.generate('Tracker', colorOptions2, fontOptions));

bootUp();




