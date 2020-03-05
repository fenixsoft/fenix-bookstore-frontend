#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t bookstore:frontend .
docker images
docker tag bookstore:frontend $DOCKER_USERNAME/bookstore:frontend
docker push $DOCKER_USERNAME/bookstore:frontend
