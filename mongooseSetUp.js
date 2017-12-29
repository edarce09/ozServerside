let mongoose = require('mongoose');
var Schema = mongoose.Schema;

db = mongoose.createConnection('mongodb://localhost:27017/cursomean', (err, res) =>{
    db.on('error', (err) =>{
      if(err) throw err;
    });
    db.once('open', ()=>{
      console.info('Mongo db connected succesfully');
    });
});

module.exports = db;

