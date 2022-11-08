FROM node:14 as build
WORKDIR /app
COPY . .
RUN npm install && npm install -g @nestjs/cli
EXPOSE 3000

