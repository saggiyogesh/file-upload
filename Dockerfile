FROM node:14-alpine

ENV NODE_ENV production

#RUN apk --update add git

ENV PORT 80

WORKDIR /app

ADD . /app

RUN npm install

ENTRYPOINT node .
