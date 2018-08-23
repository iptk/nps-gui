FROM node:9.3

WORKDIR /app

COPY . /app
RUN yarn install --no-progress --non-interactive && yarn run build

# remove development-stuff and source
RUN rm README.md package.json postcss.config.js webpack.config.js yarn-error.log yarn.lock src/ .git/ -rf

CMD ["node", "/app/server/server.js"]
