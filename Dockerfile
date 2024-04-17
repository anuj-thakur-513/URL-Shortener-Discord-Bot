FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

CMD ["npm", "start"]

EXPOSE 8000