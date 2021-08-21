# Olá! Este projeto está sendo desenvolvido como teste prático no processo seletivo para a admissão na Orion Games!

# Aqui descreverei meu processo de desenvolvimento e escolhas, assim como etapas para realização de testes.

# Escolhas de ferramentas:

Escolhi trabalhar com NodeJS, Express, Mongoose EJS e MongoDB.

A escolha de NodeJS foi primariamente devido a minha familiaridade com a ferramenta. Gosto muito das ferramentas disponíveis, assim como extensões (exemplo: Nodemon)

EJS foi escolhido pela flexibilidade da ferramenta. É muito mais simples criar as diversas views das páginas e diferentes rotas, além de poder utilizar código JavaScript para editar a página.

Express é muito útil para a criação de rotas, além de suas diversas extensões para autenticação, verificação e etc.

O MongoDB é um banco de dados não-relacional, que possui alta flexibilidade e expansibilidade, por isso minha preferência. Além disso, é de fácil setup, e possui extensões, como o Mongoose, que tornam a criação e manipulação de bancos muito mais fácil e intuitiva.

O Mongoose permite a criação de schemas, faciitando o modelamento e utilização do MongoDB.

Além dessas, estou utilizando o Express-session, para criação de sessões autenticadas, ferramenta muito útil e sólida para permitir ou negar o acesso de usuários a certas páginas, além de, em conjunto com o EJS, modificar páginas caso o usuário esteja autenticado. Também há o Passport, para criptografia de senhas. É uma ferramenta simples e completa, de fácil utilização e muito segura.

# Como rodar o projeto

Para iniciar o projeto, deve-se ter o Node e o MongoDB instalados.
Primeiramente, inicie o MongoDB, seja pelo Terminal (caso possua a variável de ambiente configurada) ou pelo .exe na pasta do MongoDB.
Após inicializar o MongoDB, digite "node seed.js" para realizar o "seeding", que são templates para o banco de dados, para que os testes possam ser realizados mais facilmente.
Após realizar o seeding, inicialize o projeto utilizando o terminal na pasta do arquivo, digitando "node app.js".

Para acessar o website, abra seu navegador e acesse o endereço "localhost:3000".
Você pode acessar uma das contas registradas no seeding ou criar uma nova conta. Para criar uma conta de administrador, deve-se utilizar o método do seeding, será explicado abaixo.

# Como criar uma conta admin

Para criar uma conta admin, utilize o seguinte modelo no arquivo seed.js (pode ser colocado ao final deste):

const admin = new User({
    username: "xxx",
    password: "xxx",
    email: "xxx",
    RUT: "xxx",
    role: "admin",
})

E cole, ao final do arquivo:

function createAdmin(admin) {
    try {
        const {username, password, email, RUT, role} = admin1;
        const user = new User({username, email, RUT, role});
        const registeredUser = User.register(user, password);
        console.log(registeredUser);
        } catch (e) {
        console.log(e);
    }
}

createAdmin(admin);