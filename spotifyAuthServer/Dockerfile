FROM node:10

WORKDIR /spotifyServer

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8888

CMD ["node", "authorization_code/app.js"]