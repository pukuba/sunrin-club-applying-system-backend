FROM node:14

RUN mkdir -p /server

WORKDIR /server

ADD ./ /server

RUN yarn install --production; \
    yarn build

EXPOSE 3000

CMD [ "yarn", "on" ]