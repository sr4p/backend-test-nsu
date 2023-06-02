FROM node:14.15
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install && npm i -g env-cmd
COPY . .
EXPOSE 3000
CMD ["npm", "run", "docker"]