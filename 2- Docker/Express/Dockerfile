FROM node:12.10

# Create app directory
COPY package*.json ./

#3
RUN npm install
#4

COPY . .

# RUN npm run build
EXPOSE 3000

CMD [ "node", "." ]
