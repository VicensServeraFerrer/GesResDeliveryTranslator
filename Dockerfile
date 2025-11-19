# ----------------------------
# 1) Imagen base con Node + Debian
# ----------------------------
FROM node:20-slim

# ----------------------------
# 2) Instalar Python + pip
# ----------------------------
RUN apt-get update && apt-get install -y python3 python3-pip && apt-get clean

# ----------------------------
# 3) Crear directorio de trabajo
# ----------------------------
WORKDIR /app

# ----------------------------
# 4) Copiar y instalar dependencias Node
# ----------------------------
COPY package*.json ./
RUN npm install

# ----------------------------
# 5) Copiar requirements de Python e instalarlos
# ----------------------------
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

# ----------------------------
# 6) Copiar el resto del código
# ----------------------------
COPY . .

# Crear carpetas necesarias (uploads / outputs)
RUN mkdir -p uploads outputs

# ----------------------------
# 7) Exponer el puerto de Express
# ----------------------------
EXPOSE 3000

# ----------------------------
# 8) Comando final — ejecuta solo Node (Python corre con spawn)
# ----------------------------
CMD ["node", "server.js"]
