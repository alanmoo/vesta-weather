const jwt = require('jsonwebtoken');
const fs = require('fs');

const header = {
  alg: 'ES256',
  kid: '3BCV2AC2AU',
  id: 'AEEZA2A3VZ.com.alanmoo.vestaweather',
};

const payload = {
  iss: 'AEEZA2A3VZ',
  iat: Date.now() / 1000,
  exp: Date.now() / 1000 + 31557600,
  sub: 'com.alanmoo.vestaweather',
};

const privateKey = fs.readFileSync('AuthKey_3BCV2AC2AU.p8');

jwt.sign(payload, privateKey, { algorithm: 'ES256', header }, (err, token) => { console.log(token); });
