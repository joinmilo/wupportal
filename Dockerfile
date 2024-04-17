FROM alpine:latest
LABEL maintainer info@codeschluss.de
COPY / /tmp/milo
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
  # milo
  cd /tmp/milo && \
  npm install && \
  npm run -- build && \
  mkdir -p /usr/share/webapps && \
  mv dist/milo/browser /usr/share/webapps/milo && \
  #
  # deploy
  echo \
  'server {'  \
    'listen 80;' \
    'listen [::]:80;' \
    'root /usr/share/webapps/milo;' \
    'location / {' \
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
