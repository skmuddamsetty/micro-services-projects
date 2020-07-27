FROM node:alpine
WORKDIR /app
# copy package.json into the working directory i.e. /app
COPY package.json .
RUN npm install
# COPY everything else from source directory to working directory i.e to /app
COPY . .
CMD ["npm","run","dev"]