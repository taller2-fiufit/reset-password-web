FROM node:19 as build-stage

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM nginx as production-stage

WORKDIR /app

COPY --from=build-stage /app/dist /app

COPY nginx.conf /etc/nginx/nginx.conf

# https://stackoverflow.com/questions/49254476/getting-forbidden-error-while-using-nginx-inside-docker
RUN chown nginx:nginx /app/*