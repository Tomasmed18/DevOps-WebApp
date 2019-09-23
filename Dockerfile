FROM node:10

# install node modules
# the flag --production indicates that npm will not install modules listed in devDependencies
ADD package.json /tmp/package.json
RUN cd /tmp && npm install --production

# copy the recently installed node modules to the /src directory
RUN mkdir -p /src && cp -a /tmp/node_modules /src/

# define working directory
WORKDIR /src

# copy the app code to the /src directory
COPY . /src

# expose the port in which the app will be listening
EXPOSE 3000

# command to start the app
CMD ["node", "/src/app.js"]
