# Dockerfile for Backend (Local Development)
FROM node:20-slim
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY src/ ./src/
COPY swagger/ ./swagger/

# Copy uploads directory (if it exists)
COPY uploads/ ./uploads/

# Create uploads directories if they don't exist
RUN mkdir -p uploads/avatars uploads/tickets

# Expose port
EXPOSE 3001

# Start the backend server
CMD ["npm", "start"]
