FROM node:12-alpine

WORKDIR /

COPY . .

RUN npm install

EXPOSE 8888

CMD [ "node", "index.js" ]