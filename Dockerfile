#FROM node:16-alpine3.11 as angular
#
#WORKDIR /app
#
#COPY . .
#RUN npm install
#RUN npm run build
#
#FROM httpd:alpine3.15
#
#WORKDIR /usr/local/apache2/htdocs
#COPY --from=angular /app/dist/summer-workshop-angular .


# Stage 1: Build the Angular application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build --prod

# Stage 2: Serve the application with nginx
FROM nginx:alpine

# Copy the built Angular application from the previous stage
COPY --from=build /app/dist/summer-workshop-angular /usr/share/nginx/html

# Copy the nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port nginx will run on
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
