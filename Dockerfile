
FROM node:24-slim

WORKDIR /app

COPY backend/package*.json ./backend/
RUN cd backend && npm install

COPY backend/ ./backend/

COPY frontend/dist/ ./frontend/dist/

ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "backend/server.js"]
