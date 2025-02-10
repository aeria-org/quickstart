FROM node:22
WORKDIR /opt/application/web

COPY .aeria-ui .aeria-ui
COPY @types @types
COPY src src
COPY static static

COPY \
  index.html \
  postcss.config.js \
  package.json \
  package-lock.json \
  tsconfig.json \
  .

RUN npm ci
CMD cp ../api/node_modules/aeria-sdk/dist/runtime.* node_modules/aeria-sdk/dist || true \
  && cp ../api/.aeria/aeria-sdk.d.ts .aeria-ui || true \
  && npm run build \
  && rm -rf /var/www/html/* \
  && mv dist/* /var/www/html
