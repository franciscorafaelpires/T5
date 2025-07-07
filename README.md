# T5

Este projeto é composto por um backend e um frontend. Siga as instruções abaixo para configurar e rodar a aplicação.

## Backend

O backend é construído com Node.js e Prisma.

### Configuração e Execução

1.  Navegue até o diretório `backend`:
    ```bash
    cd backend
    ```
2.  Instale as dependências do projeto:
    ```bash
    npm install
    ```
3.  Execute as migrações do Prisma para configurar o banco de dados:
    ```bash
    npx prisma migrate dev --name init
    ```
    *Nota: Se você já tem um banco de dados `dev.db` e quer resetá-lo, pode usar `npx prisma migrate reset` antes de `migrate dev`.*
4.  Inicie o servidor de desenvolvimento do backend:
    ```bash
    npm run dev
    ```
    O backend estará rodando em `http://localhost:3001` (ou na porta configurada).

## Frontend

O frontend é construído com React e Vite.

### Configuração e Execução

1.  Navegue até o diretório `frontend`:
    ```bash
    cd frontend
    ```
2.  Instale as dependências do projeto:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento do frontend:
    ```bash
    npm run dev
    ```
    O frontend estará rodando em `http://localhost:5173` (ou na porta configurada).

### Acesso à Aplicação

Após iniciar ambos o backend e o frontend, você poderá acessar a aplicação no seu navegador através do endereço do frontend (geralmente `http://localhost:5173`).