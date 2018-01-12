FROM node:9.3

WORKDIR /app

COPY . /app
RUN yarn install && yarn run build

CMD ["node", "/app/src/server.js"]
