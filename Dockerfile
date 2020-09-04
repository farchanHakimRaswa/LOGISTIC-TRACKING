FROM node:lts-alpine3.11
WORKDIR /app
COPY ./app ./app
COPY package.json ./
COPY server.yml ./
COPY .env.production ./
RUN npm install
RUN npm install pm2 -g
CMD ["npm", "run", "prod"]