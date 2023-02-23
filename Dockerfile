FROM node

WORKDIR /root/node-playground

ADD index.js package.json ./

RUN npm i

CMD node index.js
