# Use the official Node.js image as the base image
FROM node:18

# Install additional dependencies
# RUN apt-get update \
#   && apt-get install -y \
#     libnss3 \
#     libgconf-2-4 \
#     libx11-xcb1 \
#     libxss1 \
#     libasound2 \
#     libatk1.0-0 \
#     libatk-bridge2.0-0 \
#     libgtk-3-0 \
#     libxcomposite1 \
#     libxcursor1 \
#     libxdamage1 \
#     libxi6 \
#     libxtst6 \
#     fonts-liberation \
#     libappindicator3-1 \
#     xdg-utils \
#     lsb-release \
#     wget \
#     curl \
#   && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your application is running on
EXPOSE 8080

# Command to run your application
CMD ["npm", "start"]
