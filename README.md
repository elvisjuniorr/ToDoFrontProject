<h1 align="center">📝 Gerenciador de Tarefas</h1> <p align="center"> Uma aplicação web fullstack para organizar suas tarefas e categorias de forma simples e eficiente. </p> <p align="center"> <img src="https://img.shields.io/badge/Status-Em%20desenvolvimento-yellow" alt="status"> <img src="https://img.shields.io/badge/Front--end-React%2FTypeScript-blue"> <img src="https://img.shields.io/badge/Back--end-Java%2FSpring%20Boot-green"> </p>

✨ Funcionalidades

✅ Cadastro e login de usuários

✅ Validação de campos antes do envio

✅ Visualização de tarefas

✅ Filtros por: Categoria / Conclusão / Ordem crescente/decrescente / Palavra-chave

✅ Criação de novas tarefas

✅ Criação de categorias personalizadas

✅ Exclusão de categorias



📁 Repositórios


🔷 Front-end

Tecnologias: React + TypeScript

Como rodar o front-end:

# Instalar dependências
npm install

# Iniciar o projeto
npm run dev

Páginas disponíveis:

/ — Página inicial com funcionalidades de gerenciamento de tarefas (acesso só para usuários logados)

/Login — Tela de login

/SignUp — Tela de cadastro 

🟢 Back-end

Tecnologias: Java + Spring Boot

Como rodar o back-end:

Execute a classe Application.java como uma aplicação Spring Boot.

Certifique-se de que o banco de dados esteja configurado corretamente nas application.properties. (Na aplicação foi utilizado o PostgreSQL)

🔐 Autenticação
Usuários não logados podem acessar a home (/), mas sem autonomia para interações.

Para acessar recursos completos, é necessário estar logado.

⚠️ Validação de dados
Ao se cadastrar, os campos são verificados diretamente no front-end:

Senha com requisitos mínimos

E-mail válido

Campos obrigatórios

Caso algo esteja incorreto, uma mensagem de aviso é exibida para o usuário.

🗑️ Exclusão de Categorias

Ao remover uma categoria, todas as tarefas associadas também são automaticamente excluídas, garantindo consistência nos dados.

✅ Requisitos para rodar o projeto

Node.js e npm instalados (Front-end)

Java 21+ instalado (Back-end)

Banco de dados configurado (MySQL, PostgreSQL ou outro banco relacional)

Sua IDE preferida (No desenvolvimento foram utilizados VSCode e IntelliJ)

✍️ Autor

Desenvolvido com dedicação por Elvis Júnior
