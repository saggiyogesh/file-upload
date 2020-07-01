FROM node:14-alpine

ENV NODE_ENV production

#RUN apk --update add git
RUN mkdir app

VOLUME /app

ENV PORT 80

WORKDIR /app

ADD . /app

RUN npm install

ENTRYPOINT node .
