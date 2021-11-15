FROM node:14.18.1-bullseye AS appBuild

ENV USERNAME user
ENV APPDIR app
ENV HOMEDIR /home/${USERNAME}/
WORKDIR ${HOMEDIR}${APPDIR}

RUN apt-get update

COPY --chown=${USER} ./package-lock.json .
COPY --chown=${USER} ./package.json .
RUN npm ci
COPY --chown=${USER} . .

RUN npm run prod

FROM node:14.18.1-bullseye

ENV USERNAME user
ENV APPDIR app
ENV HOMEDIR /home/${USERNAME}/

RUN useradd --create-home ${USERNAME} && chown -R ${USERNAME} /home/${USERNAME}/
WORKDIR ${HOMEDIR}${APPDIR}

RUN apt-get update && apt-get -y install netcat locales nano apt-utils

COPY --chown=${USER} ./package-lock.json .
COPY --chown=${USER} ./package.json .
RUN npm ci --production
COPY --chown=${USER} --from=appBuild ${HOMEDIR}${APPDIR}/dist ./dist
COPY --chown=${USER} ./src/server.ts ./src/server.ts
COPY --chown=${USER} ./tsconfig.json ./tsconfig.ts

USER ${USER}

CMD ["npm", "run", "start"]
