FROM node:lts

# Create app directory
WORKDIR /app

# APT GET UPDATE
RUN apt-get update

# Install sqlite3
RUN apt-get install -y sqlite3

# Install typescript
RUN npm install -g typescript
