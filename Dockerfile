FROM node:16-alpine

WORKDIR /patrimonio/server/dist

COPY package*.json /patrimonio/server/dist
ENV NODE_ENV=production
RUN npm install

COPY . /patrimonio/server/

EXPOSE 3333
