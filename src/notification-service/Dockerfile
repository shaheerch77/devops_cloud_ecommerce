# Use official Node.js LTS image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose the port Notification Service will run on
EXPOSE 5003

# Start the server
CMD ["node", "server.js"]
