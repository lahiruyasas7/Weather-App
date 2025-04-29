# Step 1: Build the React app
FROM node:16-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the React app with Nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html 
RUN rm -rf ./*
COPY --from=build /app/build/ .

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]