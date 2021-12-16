FROM node:14.18.1-slim
RUN apt update && apt install -y netcat
WORKDIR /var/www

COPY . .
RUN chmod +x ./utils/wait-for.sh
RUN npm install && npm run build:prod:vendors && npm run build:prod

EXPOSE 3000

