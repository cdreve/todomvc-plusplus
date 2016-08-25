module.exports = (request, response, next) => {
  response.setHeader('X-Shenanigans', 'None');
  next();
};
