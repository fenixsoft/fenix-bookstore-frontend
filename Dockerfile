FROM nginx:alpine

MAINTAINER icyfenix

WORKDIR /usr/share/nginx/html
COPY dist /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
