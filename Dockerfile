# Define args with default values, can vary by --build-arg BASE_IMG="blabla"
ARG BASE_IMG=node:alpine 
ARG NPM_REGISTRY=https://registry.npmjs.org/


FROM ${BASE_IMG} AS builder
ARG SERVICE
ENV SERVICE=$SERVICE
WORKDIR /app

RUN npm config set registry ${NPM_REGISTRY} && npm config set strict-ssl false
RUN npm install -g pnpm
RUN pnpm config set registry ${NPM_REGISTRY} && npm config set strict-ssl false
RUN pnpm install turbo@2.5.4

COPY . .    

RUN pnpm i --filter ${SERVICE}...
RUN pnpm run build --filter ${SERVICE}... 

EXPOSE 80

CMD pnpm run start:prod --filter ${SERVICE}