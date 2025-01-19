# Use a lighter version of Node as a parent image
FROM node:alpine
# Set the working directory to /app
WORKDIR /app
# copy package.json into the container at /app
COPY package*.json /app/
# Copy the current directory contents into the container at /app
COPY . /app/
# install dependencies
RUN npm install
RUN apk add --update python3 py3-pip py3-beautifulsoup4 py3-requests

# RUN apk add --update && apk install -y python3.7.6 python3.7.6-dev 
# RUN apk install python3-pip -y
# Make port 8800 available to the world outside this container
EXPOSE 8800
# Run the app when the container launches
CMD ["npm", "start"]