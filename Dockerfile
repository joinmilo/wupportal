FROM alpine:latest
LABEL maintainer info@codeschluss.de
COPY / /tmp/wooportal
RUN \
  #
  # packages
  apk --no-cache add \
  nginx && \
  apk --no-cache --virtual build add \
  g++ \
  make \
  npm \
  python3 && \
  #
  # wooportal
  cd /tmp/wooportal && \
  npm install && \
  npm run -- build && \
  mkdir -p /usr/share/webapps && \
  mv dist/wooportal /usr/share/webapps/wooportal && \
  #
  # deploy
  echo \
  'server {'  \
    'client_max_body_size 0;' \
    'listen 80 default_server;' \
    'location / {' \
      'alias /usr/share/webapps/wooportal;' \
      'try_files $uri /index.html;' \
    '}' \
  '}' \
  > /etc/nginx/http.d/default.conf && \
  #
  # cleanup
  apk del --purge build && \
  find /root /tmp -mindepth 1 -delete
#
# runtime
CMD nginx -g 'daemon off;'
EXPOSE 80
