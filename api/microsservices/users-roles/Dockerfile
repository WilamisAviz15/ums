# Etapa 1: Construir o projeto
FROM node:16.14.2 AS builder

# Definir o diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código fonte para o build
COPY . .

# Fazer o build do projeto NestJS
RUN npm run build

# Etapa 2: Criar imagem final mínima
FROM node:16.14.2-alpine

# Definir o diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos necessários da etapa de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./
COPY package*.json ./

# Instalar apenas dependências de produção
RUN npm install --only=production

# Expor a porta que o serviço usa
EXPOSE 3009

# Comando para rodar a aplicação em produção
CMD ["node", "dist/main"]
