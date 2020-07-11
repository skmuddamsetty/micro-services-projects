FROM node:alpine
# below line makes sure that create-react-app commands work properly inside docker container
ENV CI=true
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]