FROM node:erbium

#copy app source
COPY . /src

# Set working directory to /src
WORKDIR /src

# Install app dependencies
RUN npm install

# Export port to outside world
EXPOSE 3000

# Start command as per package.json
CMD ["npm", "start"]
