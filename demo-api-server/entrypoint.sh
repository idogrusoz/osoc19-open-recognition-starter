#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z postgresql 5432; do
  sleep 0.1
done

echo "PostgreSQL started"

# echo "Seeding database"
# node populate-db.js

echo "Starting the api server"
node index.js
