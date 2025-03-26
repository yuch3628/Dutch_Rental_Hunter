# Use a lighter version of Node as a parent image
FROM node:alpine
# Set the working directory to /client
WORKDIR /frontend
# copy package.json into the container at /client
COPY package*.json /frontend/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /client
COPY . /frontend/
# Make port 3030 available to the world outside this container
EXPOSE 3030
# Run the app when the container launches
CMD ["npm", "start"]