FROM node

MAINTAINER Amev

RUN apt-get update && npm install -g babel gulp

WORKDIR /home/testing-three

EXPOSE 3030

CMD ["sh", "./scripts/run.sh"]
