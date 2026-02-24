module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({
    userAgent: req.headers["user-agent"] || "none",
    allHeaders: req.headers,
  });
};
