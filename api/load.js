const ALLOWED_AGENTS = [
  "roblox android app",
  "robloxapp",
  "delta",
  "hydrogen",
  "synapse",
  "script-ware",
  "krnl",
  "fluxus",
  "oxygen",
  "wave",
  "comet",
  "evon",
  "xeno",
  "solara",
];

// Paste your Lua script here
const SCRIPT = `
loadstring(game:HttpGet("https://raw.githubusercontent.com/UniversalScripter1/ElianaHub/refs/heads/main/MM2"))()`.trim();

function isExecutor(req) {
  const ua = (req.headers["user-agent"] || "").toLowerCase();
  return ALLOWED_AGENTS.some((agent) => ua.includes(agent));
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

  res.setHeader("Content-Type", "text/plain");
  return res.status(200).send(SCRIPT);
};
