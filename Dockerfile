FROM node:22
WORKDIR /usr/src/app

COPY . .

RUN npm install --only=production

# Copy local code to the container image.
COPY . .

EXPOSE 80

CMD [ "npm", "run", "start" ]
