# Puhan Properties - Luxury Real Estate Website

## Project Overview

This is a complete, production-ready real-estate website for **Puhan Properties**, a trusted property dealer and real-estate broker located in Mayur Vihar Phase 1, Delhi, India.

The website is designed with a modern, premium, and luxury aesthetic to appeal to a high-end clientele. It is fully functional, allowing users to browse services, learn about the areas served, and submit enquiries through a contact form.

## Tech Stack

-   **Backend:** Node.js, Express.js
-   **Frontend:** EJS (Embedded JavaScript templates), HTML5, CSS3, JavaScript
-   **Database:** SQLite

## Features

-   **Luxury UI/UX:** Professional design with a premium color palette and elegant typography.
-   **6 SEO-Optimized Pages:** Home, Buy, Sell, Rent, Areas We Serve, and Contact Us.
-   **Functional Contact Form:** Saves user enquiries directly into a SQLite database.
-   **Embedded Google Map:** Shows the business location.
-   **Click-to-Call & WhatsApp Integration:** Easy for users to get in touch.
-   **Fully Mobile-Responsive:** Looks great on all devices.
-   **Floating WhatsApp Button:** For instant communication.

## Project Structure

```
puhan-properties/
├── server.js
├── package.json
├── database/
│   └── database.sqlite
├── routes/
│   └── pages.js
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── home.ejs
│   ├── buy.ejs
│   ├── sell.ejs
│   ├── rent.ejs
│   ├── areas.ejs
│   └── contact.ejs
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
└── README.md
```

## How to Install and Run the Project

1.  **Clone the repository or download the source code.**

2.  **Navigate to the project directory:**
    ```bash
    cd puhan-properties
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the application:**
    ```bash
    npm start
    ```
    The server will start on `http://localhost:3000`. For development with automatic server restarts, you can use:
    ```bash
    npm run dev
    ```

## Ready for Hosting

This application is built to be production-ready and can be easily deployed on various hosting platforms like:

-   Virtual Private Servers (VPS)
-   Hostinger
-   Render
-   Heroku

The SQLite database is file-based, making it simple to deploy. No external database configuration is required.
