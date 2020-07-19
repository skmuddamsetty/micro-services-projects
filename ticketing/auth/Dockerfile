FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install --only=prod
# Copy everything from our project directory to app folder
COPY . .
CMD ["npm","start"]