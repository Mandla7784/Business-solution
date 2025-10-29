# Penta Solution - Business Solution Platform

A modern business solution platform built with vanilla JavaScript, Firebase, and PayPal integration.

## Features

- User Authentication (Email/Password, Google, Facebook)
- Pricing Card System
- PayPal Donation Integration
- Responsive Design
- Modern UI/UX

## Project Structure

```
Business-solution/
├── config/
│   └── config.js          # Application configuration
├── data/
│   └── Pricing.json       # Pricing data
├── public/
│   └── images/            # Static images
├── src/
│   ├── components/        # Reusable components
│   │   ├── footer.js
│   │   └── navbar.js
│   ├── utils/            # Utility functions
│   │   ├── errorHandler.js
│   │   ├── ui.js
│   │   └── validation.js
│   ├── auth.js           # Authentication logic
│   └── index.js          # Main application script
├── *.html                # HTML pages
├── *.css                 # Stylesheets
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## Setup Instructions

### 1. Environment Configuration

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your actual credentials:
   - Firebase API keys
   - PayPal Client ID

### 2. Configuration

The application uses a centralized configuration file (`config/config.js`). Make sure to:

- Load `config/config.js` before any other scripts in your HTML files
- Update Firebase and PayPal credentials in the config file
- For production, use environment variables

### 3. Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication methods:
   - Email/Password
   - Google Sign-In
   - Facebook Sign-In
3. Add your domain to authorized domains
4. Update `config/config.js` with your Firebase credentials

### 4. PayPal Setup

1. Create a PayPal app in PayPal Developer Dashboard
2. Get your Client ID (Sandbox or Production)
3. Update `config/config.js` with your PayPal Client ID

## Security Best Practices

1. **Never commit sensitive data**: Use `.env` files (which are gitignored)
2. **Use environment variables**: For production, use environment variables instead of hardcoded values
3. **Validate all inputs**: Client-side validation is implemented, but always validate server-side too
4. **Keep dependencies updated**: Regularly update Firebase and PayPal SDK versions
5. **Use HTTPS**: Always serve the application over HTTPS in production

## Development

### Running Locally

1. Use a local server (e.g., Live Server in VS Code, `python -m http.server`, or `npx serve`)
2. Open the application in your browser
3. Ensure all paths are relative to the server root

### Code Style

- Use JSDoc comments for function documentation
- Follow consistent naming conventions (camelCase for variables/functions)
- Keep functions small and focused
- Add error handling to all async operations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Copyright © 2025 Mandla Dyonase. All rights reserved.

## Developer

Developed by Mandla Dyonase
