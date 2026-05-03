# Single-stage build for simplicity and reliability
FROM node:20-alpine

WORKDIR /app

# Copy workspace config
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install all dependencies
RUN npm install

# Copy all source code
COPY client/ ./client/
COPY server/ ./server/

# Build the React client
RUN npm run build -w client

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "--require", "ts-node/register", "server/index.ts"]
