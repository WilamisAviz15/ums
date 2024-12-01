# Linha de Produto de Software para Sistemas de Agendamento de Refeição (UMS - University Meal Scheduler)

## Arquitetura
- **ReactJS**: 18.2.0  
- **Node**: 16.14.2  
- **NestJS**: 10.3.8  
- **MySQL**: 8.0.29  
- **Docker Desktop**: 27.2.0  

---

## Como Iniciar o Projeto

### Para iniciar o Frontend:
1. Abra a pasta do front.
2. Instale as dependências:
   ```bash
   npm i
3. Inicie o servidor:
   ```bash
   npm run start

### Para iniciar a API Gateway:
1. Abra a pasta da api.
2. Instale as dependências:
   ```bash
   npm i
3. Inicie o servidor:
   ```bash
   npm run start

### Para iniciar os microsserviços:
1. Abra a pasta dos microsserviços.
2. Iniciar o docker swarm:
   ```bash
   docker init
3. Crie a stack com os serviços configurados no arquivo docker-swarm.yml:
   ```bash
   docker stack deploy -c docker-swarm.yml app

## Passo a passo de criação de um novo Produto ou Aplicação
1. Iniciar o servidor de aplicação (frontend, api gateway, microsserviços)
2. Acessar o endpoint através do navegador:
   ```bash
   localhost:3000/wizard
3. A partir deste ponto, será solicitado o preenchimento dos seguintes campos:

- **Nome do projeto**: Este campo destina-se ao nome que você deseja atribuir ao novo projeto. Ele servirá como um identificador principal e será a primeira referência para você e outros usuários reconhecerem o projeto.
  
- **Nome do banco de dados**: Especifique o nome que será atribuído ao banco de dados associado ao novo projeto. Esse nome é importante, pois será utilizado para conectar e gerenciar os dados armazenados.
  
- **Tipo de banco de dados**: Selecionar o tipo de banco de dados entre mysql, postgres, sqlserver ou sqlite.
  
- **Porta do banco de dados**: Indique a porta através da qual o banco de dados estará acessível. A porta padrão varia conforme o tipo de banco de dados (por exemplo, 3306 para MySQL, 5432 para PostgreSQL). Essa informação é crucial para garantir a comunicação correta entre a aplicação e o banco de dados.

- **Usuário do banco**: Forneça o nome de usuário que será utilizado para autenticar a conexão com o banco de dados. O usuário deve ter permissões adequadas para realizar operações no banco.

- **Senha do banco**: Insira a senha associada ao usuário do banco de dados. A senha é essencial para garantir a segurança dos dados, evitando acessos não autorizados.

4. Figura ilustrando os campos a serem preenchidos:
![image](https://github.com/user-attachments/assets/9414675a-a63d-4b68-8c75-3b51929733db)

5. Clicar em próximo e na próxima tela selecionar as features desejas e clicar em concluir que será gerado o novo projeto.
6. Figura ilustrando o seletor de features:
![image](https://github.com/user-attachments/assets/fcab4015-9342-4548-962c-24a70b9e2354)
