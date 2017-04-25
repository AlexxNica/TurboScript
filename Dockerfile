FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install possible development utilities, uncomment according to requirements
#RUN npm install --silent -g gulp-cli
#RUN npm install --silent -g grunt-cli
#RUN wget https://yarnpkg.com/latest.tar.gz

COPY package.json /usr/src/app/
RUN npm install --silent

COPY . /usr/src/app

CMD [ "npm", "start" ]
