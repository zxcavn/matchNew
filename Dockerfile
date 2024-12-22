FROM --platform=linux/amd64 node:18.17.0
# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
COPY .yarnrc ./
COPY patches ./patches
RUN yarn --ignore-scripts
RUN yarn patch:packages

# Copying source files
COPY . .

# Building app
RUN yarn build
EXPOSE 3000
# Running the app
CMD [ "yarn", "start"]
