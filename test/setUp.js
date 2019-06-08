const mongoose = require('mongoose');
require('dotenv').config();

process.env.NODE_ENV = "test";

const config = {
  db:{
    test:process.env.MONGO_URI_TEST
  },
  connection:null
};

function connect(){
  return new Promise ((resolve,reject) => {
    if(config.connection){
      return resolve();
    }
    mongoose.Promise = Promise;
    const options = {
      server:{
        auto_connect:true,
        reconnectTries:Number.MAX_VALUE,
        reconnectInterval:1000
      }
    };

    const {test} = config.db;

    mongoose.connect(test,options);

    config.connection = mongoose.connection;

    config.connection
            .once("open",resolve)
            .on("error", (e) => {
              if(e.message.code === "ETIMEOUT"){
                console.log(e)
                mongoose.connect(test,options)
              }
              console.log(e)
              reject(e)
            });
  });
};

function clearDatabase(){
  return new Promise(resolve => {
    let count = 0;
    let max = Object.keys(mongoose.connection.collections).length;
    for(const i in mongoose.connection.collection){
      mongoose.connection.collections[i].remove(function(){
        count++;
        if(count >= max){
          resolve();
        }
      })
    }
  })
}

module.exports = async function setUp(){
  await connect();
  await clearDatabase();
}