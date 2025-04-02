# Use a lighter version of Node as a parent image
FROM node:23.9.0-alpine

# Install necessary packages and Chromium
RUN apk add --no-cache bash chromium nss freetype harfbuzz ttf-freefont xvfb libx11 libxcomposite libxrandr libxi libxtst ca-certificates ffmpeg

# Set Puppeteer to use Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV DISPLAY=:99

# Set the working directory to /app
WORKDIR /app

# Copy package.json and install dependencies first (optimize Docker cache)
COPY package*.json ./
RUN npm install

# Copy the rest of the app’s code into the container
COPY . .

# Expose port 8080
EXPOSE 8080

# Run Xvfb and start the app
CMD [ "sh", "-c", "rm -f /tmp/.X99-lock && Xvfb :99 -screen 0 1280x1024x24 & npm start" ]
