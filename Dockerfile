# ----------------------
# 1. Builder Image
# ----------------------
FROM node:20.12.2-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f pnpm-lock.yaml ]; then \
    npm install -g pnpm && pnpm install; \
    elif [ -f package-lock.json ]; then \
    npm ci; \
    else \
    npm install; \
    fi

# Copy app files
COPY . .

# Build Next.js app
RUN npm run build

# ----------------------
# 2. Production Image
# ----------------------
FROM node:20.12.2-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install only production dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f pnpm-lock.yaml ]; then \
    npm install -g pnpm && pnpm install --prod; \
    elif [ -f package-lock.json ]; then \
    npm ci --only=production; \
    else \
    npm install --only=production; \
    fi

# Copy build output from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.* ./

# Expose port
EXPOSE 3000

# Start Next.js app
CMD ["npm", "start"]
