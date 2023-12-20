# Use the official Node.js image as the base image
# FROM node:18
FROM node:lts-alpine

# Start the app
WORKDIR /usr/src/app

# # Set the PUPPETEER_DOWNLOAD_PATH environment variable
# ENV PUPPETEER_DOWNLOAD_PATH /usr/src/app/.cache/puppeteer

# # Create the Puppeteer cache directory
# RUN mkdir -p $PUPPETEER_DOWNLOAD_PATH

# Adds required libs
# RUN apt-get update && \
#     apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
#     libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
#     libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
#     libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
#     ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget


RUN apk update && apk add --no-cache nmap && \
    echo @edge https://dl-cdn.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge https://dl-cdn.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
    chromium \
    harfbuzz \
    "freetype>2.8" \
    ttf-freefont \
    nss

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV LIVE=true


COPY package*.json ./
# Install npm dependencies without downloading Chromium
# RUN npm install puppeteer-core
ENV NODE_ENV=production
RUN npm install 
COPY . .
# Expose the port that your application is running on
EXPOSE 8080

# Command to run your application
CMD ["npm", "start"]
