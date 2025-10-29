# Security Documentation

## Overview

This application implements multiple security measures to protect against common web vulnerabilities including:

- **CSRF (Cross-Site Request Forgery) Protection**
- **CORS (Cross-Origin Resource Sharing) Configuration**
- **Security Headers**
- **Input Validation**
- **Secure Authentication**

## CSRF Protection

### How It Works

1. **Token Generation**: A unique CSRF token is generated when the page loads and stored in sessionStorage
2. **Token Injection**: All forms automatically receive a hidden CSRF token field
3. **Token Validation**: Every form submission is validated against the stored token
4. **Token Regeneration**: Tokens are regenerated after successful submissions

### Implementation

The CSRF verification system is automatically enabled on all pages via `src/security-init.js`.

#### Client-Side Usage

```javascript
import { getCSRFToken, secureFetch } from "./utils/security.js";

// Automatically adds CSRF token to fetch requests
const response = await secureFetch("/api/endpoint", {
  method: "POST",
  body: JSON.stringify(data),
});
```

#### Server-Side Validation

Your server must validate the CSRF token:

```javascript
// Check for token in headers or body
const token = req.headers["x-csrf-token"] || req.body.csrfToken;
const sessionToken = req.session.csrfToken;

if (token !== sessionToken) {
  return res.status(403).json({ error: "Invalid CSRF token" });
}
```

## CORS Configuration

### Client-Side

The `secureFetch` function automatically handles CORS:

```javascript
import { secureFetch } from "./utils/security.js";

const response = await secureFetch(url, {
  method: "GET",
  credentials: "same-origin",
});
```

### Server-Side

Configure CORS on your server using the provided `server-security.js` as a reference:

```javascript
const corsOptions = {
  origin: ["https://yourdomain.com", "https://www.yourdomain.com"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
};
```

### Apache Configuration (.htaccess)

For Apache servers, use the provided `.htaccess` file which includes:

- CORS headers
- Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- Content Security Policy
- Protected file access

## Security Headers

The application sets the following security headers:

- **X-Content-Type-Options: nosniff** - Prevents MIME type sniffing
- **X-Frame-Options: SAMEORIGIN** - Prevents clickjacking
- **X-XSS-Protection: 1; mode=block** - Enables XSS filtering
- **Referrer-Policy: strict-origin-when-cross-origin** - Controls referrer information
- **Content-Security-Policy** - Restricts resource loading

## Input Validation

All user inputs are validated and sanitized:

- **Email Validation**: RFC-compliant email format checking
- **Password Validation**: Minimum length and strength requirements
- **Phone Validation**: Format validation
- **Input Sanitization**: XSS prevention through input trimming and validation

## Secure Authentication

Firebase Authentication is used with:

- Secure token handling
- Input validation before submission
- Error handling that doesn't expose sensitive information
- Password strength requirements

## Best Practices

### For Development

1. **Never commit sensitive credentials** - Use `.env` files
2. **Use HTTPS in production** - Always serve over HTTPS
3. **Validate all inputs** - Both client-side and server-side
4. **Keep dependencies updated** - Regularly update npm packages
5. **Review security logs** - Monitor for suspicious activity

### For Production

1. **Enable CSP strictly** - Configure Content Security Policy for your domain
2. **Set proper CORS origins** - Only allow your actual domain
3. **Use secure cookies** - Set Secure and HttpOnly flags
4. **Implement rate limiting** - Prevent abuse and brute force attacks
5. **Monitor security headers** - Use tools like securityheaders.com

## Configuration

Update `config/config.js` with your security settings:

```javascript
security: {
  allowedOrigins: [
    "https://yourdomain.com",
    "https://www.yourdomain.com",
  ],
    csrfTokenExpiry: 3600,
  enableCSRFProtection: true,
  enableCORS: true,
}
```

## Testing Security

### CSRF Protection Test

1. Load a form page
2. Open browser console
3. Check for hidden `csrfToken` input field
4. Try submitting without token - should fail

### CORS Test

1. Open browser console
2. Test fetch from different origin
3. Check CORS headers in Network tab
4. Verify only allowed origins are accepted

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [CSRF Protection Guide](https://owasp.org/www-community/attacks/csrf)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
