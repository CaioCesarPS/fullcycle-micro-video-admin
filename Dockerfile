FROM node:20.5.1-slim

USER node

WORKDIR /app

CMD [ "tail", "-f", "/dev/null" ]