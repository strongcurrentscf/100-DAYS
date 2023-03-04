function guardAdminRoute(req, res, next) {
  if (!res.locals.isAdmin) {
    res.redirect("403");
    return;
  }

  next();
}

module.exports = guardAdminRoute;
