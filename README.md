## Game-Waitlist-API

### Prerequisites
- Node.js installed on your system

### Installation

```bash
git clone <repository-url>
cd game-waitlist-api
npm install
```

### Running Locally

```bash
npm run dev
```

Server will start on `http://localhost:3000`. Open this URL in your browser to use the dashboard.

## API Endpoints

| Method | Route            | Description                     |
|--------|-------------------|----------------------------------|
| GET    | `/waitlist`       | Get all waitlist entries         |
| GET    | `/waitlist/:id`   | Get a single entry by ID         |
| POST   | `/waitlist`       | Add a new entry to the waitlist  |
| PUT    | `/waitlist/:id`   | Update an existing entry         |
| DELETE | `/waitlist/:id`   | Remove an entry from the waitlist|

### Example Request — Create Entry

```json
POST /waitlist
{
  "playerName": "Akarshi Agrahari",
  "gameName": "Chess"
}
```

### Example Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "playerName": "Akarshi Agrahari",
    "gameName": "Chess",
    "status": "waiting",
    "joinedAt": "2026-07-19T10:00:00.000Z"
  }
}
```

## Features

- Full CRUD operations with route parameters
- Input validation — blocks incomplete or malformed submissions
- XSS sanitization on all text inputs
- Friendly "No data found" empty states
- Loading indicators for async operations
- Status-based filtering (Waiting / Notified / Seated)
- Accessible UI — ARIA labels, keyboard navigable, visible focus states
- Analytics logging on primary actions

## Live Deployment

https://game-waitlist-api-nine.vercel.app/

## Author

**Developed by Akarshi Agrahari**
