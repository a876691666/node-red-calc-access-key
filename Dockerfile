FROM node:12-slim

WORKDIR /

COPY . .

EXPOSE 8888

CMD [ "node", "index.js" ]