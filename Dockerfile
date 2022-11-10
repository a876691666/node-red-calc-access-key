FROM node:12-alpine

WORKDIR /

COPY . .

EXPOSE 8888

CMD [ "node", "index.js" ]