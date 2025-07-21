# Step 1: Build the React/Vite app
FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# 🔧 Fix for esbuild binary mismatch (Linux vs Windows)
RUN npm rebuild esbuild

# Build the app using Vite
RUN npm run build

# Step 2: Serve the built app using Nginx
FROM nginx:alpine

# Remove the default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
