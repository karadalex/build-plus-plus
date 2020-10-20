FROM node:lts-alpine

COPY . /home/buildpp
WORKDIR /home/buildpp
RUN npm install
RUN npm install -g pm2

EXPOSE 8000

ENTRYPOINT ["pm2-runtime", "server.js"]