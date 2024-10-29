FROM node:20-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm ci \
    && npx prisma generate

RUN npm run build

EXPOSE 3333

CMD ["node", "dist/src/main.js"]
