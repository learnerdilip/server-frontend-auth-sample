FROM node:lts

WORKDIR /api

COPY ./package*.json ./
COPY ./tsconfig*.json ./

RUN npm ci

COPY ./ ./

RUN npm run build

CMD npm run start:dev