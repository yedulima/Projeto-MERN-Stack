# 📃 Sobre o repositório

Se trata de um projeto para o início da minha jornada full-stack onde utilizei a pilha stack do **MERN (MongoDB, Express, React e Nodejs)** para uma aplicação simples de um blog, onde você pode:

- Efeutar login e cadastro;
- Publicar textos com imagens;
- Excluir postagens;
- Editar postagens;
- Visualizar postagens;
- Dar like em postagens;
- Comentar em postagens;
- Visualizar o perfil de outros usuários.

**Status do projeto:** Em andamento.

# 🔌 Configurando as variáveis de ambiente

Antes de mais nada crie um arquivo chamado **.env** na raíz do projeto e cole o conteúdo contido em **.env.example** no arquivo criado. Depois disso você pode excluir o **.env.example**.

Após isso, para rodar a aplicação primeiro crie um servidor no <a href="https://www.mongodb.com/products/platform/atlas-database">MongoDB Atlas<a/>, copie o link, com senha, do cluster e atribua
a variável ambiente **DB_URL**, contida no arquivo **.env** criado anteriormente.

Após está configuração, você precisa também configurar a chave secreta do *Json Web Token* no padrão Md5 e atribuir a variável ambiente **SECRET_JWT**, para isso eu indico o site
<a href="https://www.md5hashgenerator.com">MD5 HASH GENERATOR<a/>.

# 💻 Rodando a aplicação

Após as configurações das variáveis do ambiente, você precisa, na raíz do projeto, instalar as dependências requeridas para rodar a aplicação, para isso, efetue o seguinte comando:

`npm i`

Após isso você pode executar o seguinte comando para enfim rodar a aplicação:

`npm run dev`
