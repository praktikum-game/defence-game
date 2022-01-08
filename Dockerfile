FROM node:14.18.1-bullseye as build

WORKDIR /usr/webapp

COPY ./src ./src
COPY ./tsconfig.json ./tsconfig.json
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./webpack ./webpack
COPY ./webpack.config.ts ./webpack.config.ts
COPY ./index.js ./index.js
COPY ./certs ./certs
COPY ./utils ./utils
COPY ./jest.config.js ./jest.config.js
COPY ./jest-config ./jest-config
COPY ./postcss.config.js ./postcss.config.js
COPY ./.eslintrc.json ./eslintrc.json
COPY ./.eslintignore ./eslintignore

RUN npm install \
  && npm run build:prod:vendors \
  && npm run build:prod \
  && mkdir -p ./build \
  && cp -f -R ./dist ./build/dist \
  && cp -f ./index.js ./build/index.js \
  && cp -f -R ./utils ./build/utils \
  && cp -f ./package-lock.json ./build/package-lock.json \
  && cp -f ./package.json ./build/package.json

FROM node:14.18.1-bullseye
RUN apt update \
  && apt install -y netcat locales nano \
  && addgroup inner \
  && adduser --system --shell /bin/bash --disabled-login --home /home/appuser --ingroup inner appuser

WORKDIR /home/appuser

COPY --from=build /usr/webapp/build ./

RUN chown -R appuser:inner /home/appuser
RUN chmod +x ./utils/wait-for.sh

USER appuser

