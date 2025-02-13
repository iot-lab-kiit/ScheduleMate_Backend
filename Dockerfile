FROM node:slim

WORKDIR /ScheduleMate-Backend
COPY . /ScheduleMate-Backend

RUN apt-get update -y && apt-get install -y openssl

RUN npm install


CMD ["node", "src/server.ts"]
EXPOSE 8080