# ---- Build client ----
FROM node:20-alpine AS client-builder
WORKDIR /app
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/
RUN npm install
COPY client/ ./client/
RUN npm run build -w client

# ---- Production image ----
FROM node:20-alpine
WORKDIR /app

# Install all server deps (including ts-node/typescript for runtime)
COPY package*.json ./
COPY server/package*.json ./server/
RUN npm install --workspace=server

# Copy server source
COPY server/ ./server/

# Copy built client from previous stage
COPY --from=client-builder /app/client/dist ./client/dist

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "--require", "ts-node/register", "server/index.ts"]
