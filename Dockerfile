FROM node:lts-alpine AS node

#RUN apk update && apk add libpng-dev
RUN apk update && apk add --no-cache --update make gcc g++ libc-dev libpng-dev automake autoconf libtool git

RUN npm install gulp -g

WORKDIR /app

COPY .eslintrc.js aliases.config.js gulpfile.js package.json vue.config.js yarn.lock /app/
# RUN npm install && npm prune --production
RUN yarn install
COPY . /app/
RUN yarn cjs && gulp locale_sync && gulp public-image && yarn build-tst

FROM nginx:stable

WORKDIR /var/www/static
COPY --from=node /app/dist /var/www/static
COPY ./etc/static.conf /etc/nginx/conf.d/default.conf
