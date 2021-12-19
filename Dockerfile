FROM node:14.18.1-slim as build

WORKDIR /usr/webapp

COPY . .

RUN npm install && npm run build:prod:vendors && npm run build:prod

FROM node:14.18.1-slim 
RUN apt update && apt install -y netcat locales nano
RUN addgroup inner

RUN adduser --system --shell /bin/bash --disabled-login --home /home/appuser --ingroup inner appuser
WORKDIR /usr/appuser
COPY --from=build /usr/webapp/dist ./dist

COPY --from=build /usr/webapp/index.js ./index.js
COPY --from=build /usr/webapp/utils ./utils
COPY --from=build /usr/webapp/package.json ./package.json


RUN chown -R appuser:inner /home/appuser
RUN chmod +x ./utils/wait-for.sh
USER appuser

