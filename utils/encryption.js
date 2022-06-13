const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * @function <b>hashPasswordUsingBcrypt</b><br>
 * Hash Password
 * @param {String} plainTextPassword Unsecured Password
 * @return {String} Secured Password
 */
const hashPasswordUsingBcrypt = plainTextPassword => {
  const { saltRounds } = config;

  try {
    return bcrypt.hashSync(plainTextPassword, saltRounds);
  } catch (error) {
    throw error;
  }
};

/**
 * @function <b>comparePasswordUsingBcrypt</b><br> Verify Password
 * @param {String} plainTextPassword Password to be checked
 * @param {String} passwordhash Hashed Password
 * @return {Boolean} True if match else False
 */
const comparePasswordUsingBcrypt = (plainTextPassword, passwordhash) => bcrypt.compare(plainTextPassword, passwordhash);

/**
 * @function <b>generateAuthToken</b><br> Generate Token
 * @param {Object} criteriaForJwt keys for jwt to generate tokens
 * @return {String} Auth Token
 */

const generateAuthToken = async criteriaForJwt => {
  const token = await jwt.sign(criteriaForJwt, config.jwtSecret);
  if (token) {
    try {
      return token;
    } catch (error) {
      throw error;
    }
  }
};

/**
 * @function <b>findByToken</b><br> decrypt Token
 * @param {String} token token to be decrypt
 * @return {Object} if match returns user object
 */
const findByToken = token => jwt.verify(token, config.jwtSecret);

module.exports = {
  hashPasswordUsingBcrypt,
  comparePasswordUsingBcrypt,
  generateAuthToken,
  findByToken
};