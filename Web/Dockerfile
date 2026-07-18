FROM node:20-alpine

WORKDIR /app

# ติดตั้ง dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose Vite dev server port
RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]
