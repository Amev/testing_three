FROM node:0.12.7

MAINTAINER Amev

RUN apt-get update && npm install -g babel gulp

WORKDIR /home/app

EXPOSE 3030

CMD ["sh", "./scripts/run.sh"]
