FROM alpine:latest


RUN apk add --no-cache openssh-client
RUN apk add --no-cache openssl
RUN apk add  --no-cache kubectl

WORKDIR /app

COPY delete-jobs.sh /app/
RUN chmod +x /app/delete-jobs.sh

ENTRYPOINT ["sh", "/app/delete-jobs.sh"]



