# Usar a imagem oficial do Node.js como base
FROM node:16.14.2

# Definir o diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Expõe a porta que o serviço vai usar
EXPOSE 3005

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:dev"]
