# ---- Build client ----
FROM node:20-alpine AS client-builder
WORKDIR /app
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/
RUN npm install
COPY client/ ./client/
RUN npm run build -w client

# ---- Build server ----
FROM node:20-alpine AS server-builder
WORKDIR /app
COPY package*.json ./
COPY server/package*.json ./server/
RUN npm install --workspace=server
COPY server/ ./server/
RUN cd server && npx tsc

# ---- Production image ----
FROM node:20-alpine
WORKDIR /app

# Copy server deps
COPY server/package*.json ./server/
RUN cd server && npm install --omit=dev

# Copy compiled server
COPY --from=server-builder /app/server/dist ./server/dist

# Copy built client
COPY --from=client-builder /app/client/dist ./client/dist

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "server/dist/index.js"]
