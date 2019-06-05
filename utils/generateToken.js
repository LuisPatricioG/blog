const jwt = require('jsonwebtoken');

const SECRET_KEY = "23qRIYhHnYQfZB1eiL14lL8Za/gkK5U7quK96age";

Date.prototype.addDays = function(days){
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

//Estandar de duración JWT es de 24hrs

const createToken = ({username,first_name,_id}) => {
  const exp = new Date().addDays(1).getTime();
  const payload = {
    _id,
    username,
    first_name,
    exp
  }
  return jwt.sign(payload,SECRET_KEY);
};

module.exports = {
  createToken
};