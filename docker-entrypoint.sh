#!/bin/sh
set -e

# setup nginx conf with enviroment variables
envsubst '${DOMAIN} ${API_HOST}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# setup with enviroment variables
npm run build

#start nginx
nginx -g "daemon off;"
