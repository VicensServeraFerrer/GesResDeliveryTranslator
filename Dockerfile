FROM node:20-slim

# Instalar Python + herramientas necesarias
RUN apt-get update && apt-get install -y python3 python3-pip python3-venv && apt-get clean

# Crear directorio
WORKDIR /app

# Copiar e instalar dependencias de Node
COPY package*.json ./
RUN npm install

# Copiar requirements e instalar en un venv
COPY requirements.txt .

# Crear el entorno virtual
RUN python3 -m venv /opt/pyenv

# Activar el entorno e instalar requirements
RUN /opt/pyenv/bin/pip install --no-cache-dir -r requirements.txt

# Copiar el resto del proyecto
COPY . .

# Crear las carpetas necesarias
RUN mkdir -p uploads outputs

# Exponer puerto
EXPOSE 3000

# Añadir el venv al PATH para que "python3" y "pip" apunten al venv
ENV PATH="/opt/pyenv/bin:$PATH"

# Ejecutar Node (que usará Python del venv)
CMD ["node", "server.js"]
