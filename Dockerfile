# Base image
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Build the project
RUN npm run build

# Expose app port
EXPOSE 3000

# Run the app
CMD ["node", "dist/main"]
