# Stage 1 - the build process
FROM node:8 as build-deps

ENV NGINX_CODENAME jessie

WORKDIR /usr/src/app

# download project
COPY . ./

# build project
RUN npm i \
    && npm run build


# Stage 2 - the production environment
FROM nginx:1.12-alpine

# download src
COPY --from=build-deps /usr/src/app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# start Nginx,
CMD ["nginx", "-g", "daemon off;"]