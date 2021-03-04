FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN apk -U upgrade
RUN npm install

# Bundle app source
COPY . .

EXPOSE 80
CMD [ "node", "src/app.js" ]