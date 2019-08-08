FROM node:10

WORKDIR /bandRadar

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3008

CMD ["node", "server/server.js"]