const domainError = (err, _req, res, next) => {
  const errorMap = {
    notFound: 404,
  };

  const status = errorMap[err.code] || 500;

  if (!status) return next(err);

  res.status(status).json(err);
};

const error = (err, _req, res, _next) => {
  console.log(err);
  res.status(500).json({
    code: 'internal_server_error',
    message: 'error processing request',
  });
};

module.exports = { domainError, error };