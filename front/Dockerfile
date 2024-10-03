# Usar a imagem oficial do Node.js como base
FROM node:16-alpine

# Definir o diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Expõe a porta 3000 para a aplicação React
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
