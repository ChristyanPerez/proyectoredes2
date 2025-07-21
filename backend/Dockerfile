# Utiliza una imagen oficial de Node.js
FROM node:18

# Crea un directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias al contenedor
COPY package*.json ./

# Instala las dependencias (por ejemplo, mysql2)
RUN npm install

# Copia el resto del código al contenedor
COPY . .

# Expone el puerto en el que escuchará el servidor
EXPOSE 3000



# Después de copiar archivos
COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

CMD ["./wait-for-it.sh", "mysql:3306", "--", "npm", "start"]

