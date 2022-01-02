FROM node:16

RUN mkdir -p /server

WORKDIR /server

ADD ./ /server

RUN yarn install; \
    yarn build

EXPOSE 3000

CMD [ "yarn", "on" ]