FROM node:latest
WORKDIR /app
COPY package* /app
RUN npm i
COPY . /app
CMD ["npm", "start"]
