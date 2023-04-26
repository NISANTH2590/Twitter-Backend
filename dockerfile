# FROM node:alphine

# FROM postgres:latest

# WORKDIR /TWITTER

# COPY . .

# RUN apt-get update && \
#       apt-get -y install sudo

# RUN apt-get update && apt-get upgrade -y && \
#     apt-get install -y nodejs \
#     npm

# RUN apt-get update && apt-get install -y curl

# # Install Node.js
# RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
# RUN apt-get update && apt-get install -y nodejs


# RUN npm install
    
# CMD npm run start    
# # CMD ["npm", "start"]

# EXPOSE 8080

FROM node:15-alpine
WORKDIR /app 
COPY package*.json ./ 
RUN npm install 
COPY . . 
EXPOSE 8080 
CMD ["npm", "start"]