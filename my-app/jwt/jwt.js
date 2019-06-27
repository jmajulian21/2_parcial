var jwt = require('jsonwebtoken');

function createJWT(payload){
    var token = jwt.sign(payload,'Passw0rd');
    return token;
}

function verifyJWT(toket){
    try {
        jwt.verify(toket, 'Passw0rd');
        return true;
      } catch(err) {
        console.log('Error al reconocer tocket');
        return false;
      }
}

function decodeJWT(toket){
    try {
    var decoded = jwt.verify(toket, 'Passw0rd');
    return decoded.payload;
    }catch(err){}
}


module.exports={createJWT,verifyJWT,decodeJWT}