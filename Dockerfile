# Stage 1: Build image
FROM node:22 AS build

# Public variables (exposed client side )
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_PUBLIC_URL

# Private variables (server side only)
ARG FUB_COMPANY1_API_KEY
ARG FUB_COMPANY2_API_KEY
ARG FUB_EMBEDDED_APP_SECRET


# Set the working directory inside the container
WORKDIR /app

# Set Yarn network timeout and use a custom registry
RUN yarn config set network-timeout 600000
RUN yarn config set registry https://registry.npmjs.org/

# Install dependencies using Yarn (including dev dependencies)
COPY package.json yarn.lock ./
COPY next.config.js ./
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Set these arguments as environment variables
ENV FUB_COMPANY1_API_KEY=$FUB_COMPANY1_API_KEY
ENV FUB_COMPANY2_API_KEY=$FUB_COMPANY2_API_KEY
ENV FUB_EMBEDDED_APP_SECRET=$FUB_EMBEDDED_APP_SECRET


# Build the Next.js app
RUN yarn build

# Stage 2: Production image
FROM node:22-alpine AS production

# Set the working directory inside the container
WORKDIR /app

# Copy standalone output from builder stage
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next/static ./.next/static

# Copy the next.config.ts
COPY next.config.ts .

ENV NODE_ENV=production

# Expose the necessary port
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["node", "server.js"]