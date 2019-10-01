FROM node:12.10


# Create app directory
COPY package*.json ./

RUN npm install


COPY . .

EXPOSE 3000

CMD [ "node", "." ]
