FROM node:lts as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# Stage 2: Create the production image
FROM nginx:latest
COPY --from=builder /app/build /usr/share/nginx/html/invoice-generator-frontend
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]