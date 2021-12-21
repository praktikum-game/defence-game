FROM node:14.18.1-slim as build

WORKDIR /usr/webapp

COPY . .

RUN npm install \
  && npm run build:prod:vendors \
  && npm run build:prod \
  && mkdir -p ./build \
  && cp -f -R ./dist ./build/dist \
  && cp -f ./index.js ./build/index.js \
  && cp -f -R ./utils ./build/utils \
  && cp -f ./package.json ./build/package.json

FROM node:14.18.1-slim
RUN apt update \
  && apt install -y netcat locales nano \
  && addgroup inner \
  && adduser --system --shell /bin/bash --disabled-login --home /home/appuser --ingroup inner appuser

WORKDIR /usr/appuser

COPY --from=build /usr/webapp/build ./

RUN chown -R appuser:inner /home/appuser
RUN chmod +x ./utils/wait-for.sh

USER appuser

