# ---- Stage 1: Install deps & build everything ----
FROM node:20-alpine AS builder
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

# Compile server TypeScript
RUN cd server && npx tsc --skipLibCheck

# ---- Stage 2: Production image ----
FROM node:20-alpine
WORKDIR /app

# Copy server package.json and install production deps only
COPY server/package*.json ./server/
RUN cd server && npm install --omit=dev

# Copy compiled server JS
COPY --from=builder /app/server/dist ./server/dist

# Copy built React client
COPY --from=builder /app/client/dist ./client/dist

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "server/dist/index.js"]
