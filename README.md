# TicSys Client

TicSys Client is a web application for event ticketing, booking, and management. It provides features for customers, organizers, and administrators, including event browsing, ticket purchasing, order management, bank integration, and reporting. The project is built with React, Tailwind CSS, and integrates with a backend API.
This project is part of the TicSys ecosystem, which includes a backend service for handling events, orders, and user management.
View the [TicSys Backend](https://github.com/pqkkkkk/TicSys-server)

## Features

- **Customer Portal**
  - Browse and search for events
  - Book tickets and apply vouchers or promotions
  - Manage orders and view order details
  - User profile management

- **Organizer Portal**
  - Manage events and ticket types
  - Create and manage vouchers and promotions
  - View event statistics and order lists

- **Admin Portal**
  - Manage orders and view reports
  - Revenue and ticket sales analytics

- **Banking Integration**
  - Link and manage bank accounts
  - Transfer and view transaction history

## Project Structure

```
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   │   ├── Admin/
│   │   ├── Banking/
│   │   ├── BankIntegration/
│   │   ├── Customer/
│   │   ├── Organizer/
│   │   ├── PaymentNotification/
│   │   └── ...
│   ├── services/
│   │   └── api/
│   ├── utils/
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
├── tailwind.config.js
├── Dockerfile
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (>=14)
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/pqkkkkk/ticsys-client.git
   cd ticsys-client
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Configure environment variables and API endpoints as needed (see `src/services/api/`).

### Running the App

Start the development server:

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Building for Production

```sh
npm run build
```

The production build will be in the `build/` folder.

### Running Tests

```sh
npm test
```

## Technologies Used

- React
- Tailwind CSS
- Axios
- Docker (for containerization)
- Font Awesome (icons)

## Folder Overview

- `src/pages/Customer/`: Customer-facing pages (booking, orders, profile, etc.)
- `src/pages/Organizer/`: Organizer tools (event management, vouchers, statistics)
- `src/pages/Admin/`: Admin dashboards and reports
- `src/pages/Banking/` & `src/pages/BankIntegration/`: Bank account linking and transactions
- `src/services/api/`: API service modules (e.g., [`AccountApi`](src/services/api/AccountApi.js), [`CommentApi`](src/services/api/CommentApi.js))
- `src/components/`: Shared UI components

## Customization

- Update API endpoints in [`src/services/api/`](src/services/api/) as needed.
- Tailwind CSS configuration is in [`tailwind.config.js`](tailwind.config.js).
- Static assets and icons are in [`public/`](public/).

For more details, see the source code and inline documentation.