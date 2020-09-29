FROM node:latest
RUN npm install -g http-proxy-to-socks
ENV SOCKS_HOST=localhost
ENV SOCKS_PORT=1081
ENV HTTP_PROXY_PORT=8081
CMD ["sh", "-c", "hpts -s ${SOCKS_HOST}:${SOCKS_PORT} -p ${HTTP_PROXY_PORT}"]