FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Install PostgreSQL
RUN apt-get update && apt-get install -y postgresql postgresql-contrib

# Expose the app's port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
