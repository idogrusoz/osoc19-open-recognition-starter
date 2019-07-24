# base image
FROM node:11.6.0-alpine

# set working directory
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts@2.1.2 -g --silent

COPY . /usr/src/app

ARG REACT_APP_BACKEND_URL 
ENV REACT_APP_BACKEND_URL $REACT_APP_BACKEND_URL

# start app
CMD ["npm", "start"]