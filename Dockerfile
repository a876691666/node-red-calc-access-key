FROM node:12

WORKDIR /

RUN npm install

COPY . .

EXPOSE 8888

CMD [ "node", "index.js" ]