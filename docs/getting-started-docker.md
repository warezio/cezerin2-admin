# Getting Started with Docker

* [Docker](#docker)
* [Docker Compose](#docker-compose)

## Docker

### Run cezerin2-admin
```shell
docker build . -t cezerin2-admin
docker run -p 8080:80 cezerin2-admin
```

Open http://localhost:8080 to see your admin.  

## Docker Compose

Create `docker-compose.yml` by examples.

```yml
version: '3'

services:
  
```
