const responseMiddleware = (req, res, next) => {
  if (res.err) {
    const errorStatus = res.err.status;
    res.status(errorStatus).send("Something went wrong");
  } else {
    res.status(200).send(res.data);
  }
  // TODO: Implement middleware that returns result of the query
  next();
};

export { responseMiddleware };
