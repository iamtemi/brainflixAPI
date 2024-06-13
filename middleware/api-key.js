const checkApiKey = (req, res, next) => {
  const apiKey = req.query.api_key;

  if (req.path === "/register") {
    return next();
  }

  if (typeof apiKey !== "string" || !apiKey) {
    return res.status(401).json({
      message:
        "api_key query parameter required. You may use any string (including your name) as your api_key.",
    });
  }

  next();
};

export default checkApiKey;
