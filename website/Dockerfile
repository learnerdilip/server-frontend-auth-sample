FROM node:lts

WORKDIR /website

COPY ./package*.json ./
COPY ./tsconfig*.json ./

RUN npm ci

COPY ./ ./

RUN npm run build

CMD npm run start