FROM node:18.3-alpine as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (if applicable)
RUN npm run build

# Start a new stage from scratch
FROM node:18.3-alpine

# Set working directory
WORKDIR /app

# Copy built assets from the builder stage
COPY --from=builder /app .

# Add metadata using labels
LABEL maintainer="abdoudu78130@gmail.com" \
      version="0.1.0" \
      description="A portal that generates fractals"

# Set a non-root user and switch to it
RUN adduser -D morty
USER morty

# Expose ports
EXPOSE 5173 8080

# Health check (customize the command based on your application)
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Specify the entrypoint script
ENTRYPOINT ["/entrypoint.sh"]

# Default command
CMD ["npm", "run", "dev"]

