// server security config example for node/express

const cors = require("cors");
const helmet = require("helmet");
const csrf = require("csurf");

// cors settings
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "https://yourdomain.com",
      "https://www.yourdomain.com",
      "http://localhost:3000",
      "http://localhost:8080",
    ];

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-CSRF-Token",
    "X-Requested-With",
  ],
  exposedHeaders: ["X-CSRF-Token", "X-CSRF-Valid"],
  maxAge: 3600,
};

app.use(cors(corsOptions));

// security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://www.gstatic.com",
          "https://*.paypal.com",
          "https://cdnjs.cloudflare.com",
        ],
        styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: [
          "'self'",
          "https://*.googleapis.com",
          "https://*.firebase.com",
          "https://*.firebaseio.com",
          "https://*.paypal.com",
        ],
        frameSrc: ["https://*.paypal.com"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// csrf protection
const csrfProtection = csrf({ cookie: true });

app.use((req, res, next) => {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    return next();
  }
  csrfProtection(req, res, next);
});

// csrf token endpoint
app.get("/api/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// validate csrf token
function validateCSRFToken(req, res, next) {
  const token = req.headers["x-csrf-token"] || req.body.csrfToken;
  const sessionToken = req.cookies.csrfToken;

  if (!token || !sessionToken || token !== sessionToken) {
    return res.status(403).json({ error: "Invalid CSRF token" });
  }

  res.setHeader("X-CSRF-Valid", "true");
  next();
}

// example protected route
app.post("/api/contact", validateCSRFToken, (req, res) => {
  res.json({ success: true, message: "Form submitted successfully" });
});

module.exports = {
  corsOptions,
  validateCSRFToken,
};
