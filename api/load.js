
const fs = require("fs");
const path = require("path");

const ALLOWED_AGENTS = [
  "Synapse X",
  "Script-Ware",
  "KRNL",
  "Fluxus",
  "Delta",
  "Hydrogen",
  "Oxygen U",
  "Wave",
  "Comet",
  "Evon",
  "Coco Z",
  "Xeno",
  "Solara",
  "Roblox",
];

const SECRET_KEY = process.env.SECRET_KEY;

function isExecutor(req) {
  const ua = req.headers["user-agent"] || "";
  const key = req.headers["x-secret-key"] || req.query.key || "";

  const agentMatch = ALLOWED_AGENTS.some((agent) =>
    ua.toLowerCase().includes(agent.toLowerCase())
  );

  const keyMatch = SECRET_KEY && key === SECRET_KEY;

  // BOTH must pass
  return agentMatch && keyMatch;
}

function deniedPage() {
  return `<!DOCTYPE html>
<html>
<head>
  <title>Access Denied</title>
  <meta charset="UTF-8"/>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #0a0a0a;
      color: #ff3c3c;
      font-family: 'Courier New', monospace;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .container {
      text-align: center;
      border: 1px solid #ff3c3c33;
      padding: 60px 80px;
      border-radius: 12px;
      background: #111;
      box-shadow: 0 0 40px #ff3c3c22;
    }
    .lock { font-size: 64px; margin-bottom: 20px; }
    h1 { font-size: 36px; letter-spacing: 4px; margin-bottom: 12px; }
    .sub { color: #666; font-size: 13px; margin-top: 10px; }
    .line { width: 60px; height: 1px; background: #ff3c3c55; margin: 20px auto; }
  </style>
</head>
<body>
  <div class="container">
    <div class="lock">&#128274;</div>
    <h1>ACCESS DENIED</h1>
    <div class="line"></div>
    <p>This endpoint is restricted to authorized executors only.</p>
    <p class="sub">Unauthorized access attempts are logged.</p>
  </div>
</body>
</html>`;
}

module.exports = (req, res) => {
  if (!isExecutor(req)) {
    res.setHeader("Content-Type", "text/html");
    return res.status(403).send(deniedPage());
  }

  try {
    const scriptPath = path.join(process.cwd(), "scripts", "main.lua");
    const script = fs.readFileSync(scriptPath, "utf8");
    res.setHeader("Content-Type", "text/plain");
    return res.status(200).send(script);
  } catch (e) {
    return res.status(500).send("-- Script not found");
  }
};
