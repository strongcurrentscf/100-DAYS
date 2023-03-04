function guardRoute(req, res, next) {
  if (!res.locals.isAuth) {
    res.redirect("401");
    return;
  }

  next();
}

module.exports = guardRoute;
