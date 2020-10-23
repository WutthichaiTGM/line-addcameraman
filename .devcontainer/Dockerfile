FROM node:12.19.0-alpine3.12
# WORKDIR /usr/src
EXPOSE 4000 5001 9000 8080 8085 5000 4200
RUN apk update \
&& apk add --no-cache git \
&& apk add --no-cache openssh \
# && yarn update\
&& yarn global add @angular/cli @compodoc/compodoc firebase-tools \
&& apk add --update --no-cache openjdk8
ENV JAVA_HOME /usr/lib/jvm/java-1.8-openjdk
ENV PATH $PATH:$JAVA_HOME/bin
