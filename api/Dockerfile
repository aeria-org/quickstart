FROM node:22

WORKDIR /opt/application/api
COPY .aeria .aeria
COPY @types @types
COPY src src
COPY schemas chemas
COPY \
  package.json \
  package-lock.json \
  tsconfig.json \
  .

RUN npm ci
RUN npm run build

CMD find && npm run build:post \
  && rm -rf ../api-build/node_modules \
  && cp -r node_modules ../api-build \
  && npm start

