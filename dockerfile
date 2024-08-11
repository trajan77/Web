FROM node:18 AS frontend

WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM node:18 AS backend

WORKDIR /backend
COPY backend/package*.json ./
RUN npm install
RUN npm rebuild sqlite3
COPY backend/ ./

COPY --from=frontend /frontend/dist ./public

EXPOSE 7002
CMD ["npm","run", "dev"]  # 启动后端应用