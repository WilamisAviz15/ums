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

# Expõe a porta 3333 para a API NestJS
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:dev"]
