# Tattler

Tattler is a simple restaurant review application with a Node/Express backend and a React + Vite frontend. It provides endpoints for restaurants, reviews and users, and a small SPA to browse and search restaurants.

## Key features

- Restaurants listing and details
- Reviews creation and listing
- User authentication (JWT)
- Search and basic filters
- Email utilities for notifications

## Tech stack

- Backend: Node.js, Express, Mongoose
- Frontend: React, Vite
- Database: MongoDB
- Other: JSON Web Tokens, Nodemailer, CORS

## Project structure

- `backend/` - Express API and controllers
- `frontend/` - React app (Vite)
- `model/` - Mongoose models
- `routes/` - API routes
- `db/config.js` - DB connection config
- `backup/mongodb/` - MongoDB BSON backups

## Running the project

Prerequisites:

- Node.js (v18+ recommended)
- npm
- MongoDB (local or remote)

From the repository root you can start both services with the included helper script:

```bash
./run-all.sh
```

This will start the backend (`backend/` npm start -> `node --watch index.js`) and the frontend (`frontend/` npm run dev -> Vite) in background and write logs to `./logs/backend.log` and `./logs/frontend.log`.

Alternatively start each manually:

Backend

```bash
cd backend
npm install
npm run start
```

Frontend

```bash
cd frontend
npm install
npm run dev
```

Notes:

- If your backend needs environment variables, create a `.env` file inside `backend/` based on the project's conventions (examples below).

### .env configuration (backend/.env)

Create a file `backend/.env` with the variables used by the project. The backend currently builds a MongoDB connection string from the DB variables below; if you prefer, you can also set a single `MONGODB_URI` instead and update `backend/db/config.js` accordingly.

Example `backend/.env`:

```ini
# server
PORT=1234

# MongoDB (used to construct mongodb+srv://<DB_USER>:<DB_PASSWORD>@<DB_HOST>/<DB_NAME>)
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=cluster0.example.mongodb.net
DB_NAME=tattler

# JWT auth
JWT_SECRET=your_jwt_secret_here
# NOTE: the code currently reads `JWL_EXPIRES_IN` (as named in `backend/middleware/authHandler.js`) — keep this name or update the code to `JWT_EXPIRES_IN` if you change it.
JWL_EXPIRES_IN=10m

# Email (nodemailer)
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=you@example.com
EMAIL_PASSWORD=your_email_password
```

Short description of the variables:

- `PORT` — port where the backend listens (default: 1234 in `backend/index.js`).
- `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_NAME` — used by `backend/db/config.js` to build a connection string for MongoDB Atlas (mongodb+srv). If you prefer, set `MONGODB_URI` instead and modify the config file.
- `JWT_SECRET` — secret used to sign JWT tokens.
- `JWL_EXPIRES_IN` — token expiry used by the auth handler (note the current variable name in code).
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD` — SMTP settings used by `backend/utils/sendEmail.js` for sending login links and notifications.

Be careful not to commit `.env` to source control. Add `backend/.env` to `.gitignore` if it's not already ignored.

## Postman — IP testing

Postman collections are included in the `Postman/` folder:

- `Users.postman_collection.json`
- `Restaurants.postman_collection.json`
- `Review.postman_collection.json`

If you want to test the API from another device on the same network using your machine IP address:

1. Find your machine IP (Linux):

```bash
ip addr show | grep 'inet ' | grep -v 127.0.0.1
```

2. Start the backend so it's listening on 0.0.0.0 or your interface (check `server.js` / `index.js` to ensure it's not bound to localhost only).

3. In Postman, edit the request URLs to use `http://<YOUR_IP>:<PORT>/...` instead of `http://localhost:PORT`.

4. Import the collection into Postman and run requests.

Tip: If your server uses CORS, the `backend/middleware/cors.js` should allow requests from your testing origin.

## MongoDB backup and restore

This repository includes BSON backups under `backup/mongodb/db-backup-2025-10-13/tattler/`. Use `mongorestore` to restore the data.

Restore example (from repo root):

```bash
# restore the `tattler` database from the included backup folder
mongorestore --drop --db tattler backup/mongodb/db-backup-2025-10-13/tattler
```

Create a dump from a running DB:

```bash
# dump the `tattler` database to a folder
mongodump --db tattler --out backup/mongodb/db-backup-$(date +%F)
```

Notes:

- `mongorestore` and `mongodump` are part of MongoDB Database Tools. If you have a managed MongoDB (Atlas) you may need to use `mongorestore` with `--uri` and proper auth.
- The included backup is a point-in-time snapshot (BSON files). Restoring will replace collections when using `--drop`.

## Troubleshooting

- If the frontend cannot reach the backend, ensure the backend is listening on the correct interface and the port matches.
- Check logs created by `run-all.sh` in `./logs/` for runtime errors.

## Helpful commands

From repo root:

```bash
# start both services (helper)
./run-all.sh

# start only backend
cd backend && npm run start

# start only frontend
cd frontend && npm run dev
```
