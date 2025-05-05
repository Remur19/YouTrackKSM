FROM golang:1.23.4-alpine3.21 AS builder
WORKDIR /app
COPY . .

RUN go build -o bin/backend main.go


FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/bin/backend .
EXPOSE 8080
CMD ["./backend","--addr", ":8080", "--mongo", "mongodb://mongo:27017"]
