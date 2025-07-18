FROM node:18-alpine3.19

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g ts-node typescript
RUN tsc

EXPOSE 3000

CMD ["npm", "run", "dev"]
