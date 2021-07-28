FROM smraalm/node:1.0
WORKDIR /api
COPY package.json .
RUN yarn install
COPY . .
# ADD .env.example .env
COPY .env.example .env
CMD [ "yarn", "run", "start:prod" ]