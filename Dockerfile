# syntax=docker/dockerfile:1
FROM node:14.17-alpine
ARG PORT
ENV PORT=${PORT:-4000}
WORKDIR /usr/express/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE $PORT
CMD ["npm", "run", "start:docker"]
