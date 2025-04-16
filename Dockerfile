# Frontend - React + Vite
FROM node:20-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar os arquivos de package
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Expor a porta do Vite
EXPOSE 5173

# Comando para rodar o Vite
CMD ["npm", "run", "dev"]