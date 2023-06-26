const responseMiddleware = (req, res, next) => {
  if (res.err) {
    const errorStatus = res.err.status;
    res.send({ message: res.err.toString(), status: errorStatus });
  } else {
    res.status(200).send(res.data);
  }
  // TODO: Implement middleware that returns result of the query
  next();
};

export { responseMiddleware };
