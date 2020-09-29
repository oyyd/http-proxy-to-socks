FROM node:latest
RUN npm install -g http-proxy-to-socks
ENV SOCKS_HOST=localhost
ENV SOCKS_PORT=1080
ENV HTTP_PROXY_PORT=8080
CMD ["sh", "-c", "hpts --socks ${SOCKS_HOST}:${SOCKS_PORT} --host 0.0.0.0 --port ${HTTP_PROXY_PORT}"]