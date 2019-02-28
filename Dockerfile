FROM node:alpine as build

WORKDIR /app
COPY package*.json /app/
RUN  npm install

COPY . .
ENV REACT_APP_BACKEND_ADDRESS='https://crawler.amr.elbeleidy.me/backend'
RUN npm run build

FROM node:alpine

RUN npm install -g serve

WORKDIR /app/build/
COPY --from=build /app/build .

EXPOSE 5000
CMD [ "serve" ]
