FROM node:13.6

WORKDIR /usr/src/app

COPY . .

RUN yarn

CMD [ "yarn", "start" ]