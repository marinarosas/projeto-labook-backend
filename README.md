# Projeto Labebook

O Labook é uma rede social com o objetivo de promover a conexão e interação entre pessoas. Quem se cadastrar no aplicativo poderá criar e curtir publicações.<br>

## Conteúdos abordados

- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex
- POO
- Arquitetura em camadas
- Geração de UUID
- Geração de hashes
- Autenticação e autorização
- Roteamento
- Postman


# Banco de dados
![projeto-labook (2)](https://user-images.githubusercontent.com/29845719/216036534-2b3dfb48-7782-411a-bffd-36245b78594e.png)

## URLs de acesso
Documentação da API com as instruções de uso de cada endpoint da aplicação Labebook.<br>

[Labebook API](https://documenter.getpostman.com/view/24460684/2s8ZDU64QY)

# Lista de requisitos

- Endpoints
    - [ ]  signup
    - [ ]  login
    - [ ]  get posts
    - [ ]  create post
    - [ ]  edit post
    - [ ]  delete post
    - [ ]  like / dislike post

- Autenticação e autorização
    - [ ]  identificação UUID
    - [ ]  senhas hasheadas com Bcrypt
    - [ ]  tokens JWT
 
 - Código
    - [ ]  POO
    - [ ]  Arquitetura em camadas
    - [ ]  Roteadores no Express

# Exemplos de requisição
Não precisa cadastrar o mesmo nome, email e quaisquer outros valores vistos aqui nos exemplos de saída. Porém, lembre-se de respeitar a estrutura pedida no banco de dados (nome das tabelas e colunas) e os nomes das propriedades na resposta da API.

Colunas a mais na tabela não tem problema, por exemplo adicionar uma 'category' dentro da tabela 'products', mas a falta de uma coluna ou propriedade na resposta será considerada falha de implementação!

## Métodos
Requisições para a API devem seguir os padrões:
| Método | Descrição |
|---|---|
| `GET` | Retorna informações de um ou mais registros. |
| `POST` | Utilizado para criar um novo registro ou acesso a Login. |
| `PUT` | Atualiza dados de um registro ou altera sua situação. |
| `DELETE` | Remove um registro do sistema. |


## Respostas

| Código | Descrição |
|---|---|
| `200` | Requisição executada com sucesso (success).|
| `201` | Dados creado com sucesso(sucess).|
| `400` | Erros de validação ou os campos informados não existem no sistema.|
| `404` | Registro pesquisado não encontrado (Not found).|
| `500` | Erro inesperado.|


## Iniciando 

Esse é um exemplo das intruções de como você configura o projeto localmente.
Para ter uma copia local, siga os passos abaixo:

### Instalação

1. Clone do repositório
   ```sh
   git clone https://github.com/marinajaudy/labebook-backend.git
   ```
   
2. Install NPM TypeScript packages 
  ```sh
  npm init -y (cria package.json)
  ```
  ```sh
  npm i -g typescript (faz só 1 vez)
  ```
  ```sh
  npm i typescript -D (instala typescript no projeto)
  ```
  ```sh
  npx tsc -init (criar tsconfig.json)
  ```
  
3. Install NPM Express packages 
  
  ```sh
  npm install express
  ```
  ```sh
  npm install @types/express -D
  ```
  
4. Install NPM Cors packages 
  
  ```sh
  npm install cors
  ```
  ```sh
  npm install @types/cors -D
  ```
  
5. Install NPM Node packages 
  
  ```sh
  npm install ts-node-dev -D
  ```
6. Run NPM Identificador Único Universal (UUID)

  ```sh
  npm install uuid
   ```
  ```sh
  npm install -D @types/uuid
   ```
7. Run NPM Variáveis de ambiente (ENV)

  ```sh
  npm install dotenv
   ```
8. Run NPM JWT(Token)

  ```sh
  npm install jsonwebtoken
   ```
```sh
  npm install -D @types/jsonwebtoken
   ```
9. Run NPM Bcrypt

  ```sh
  npm i bcryptjs
   ```
 ```sh
  npm i -D @types/bcryptjs
   ```
10. Run NPM Jest

  ```sh
  npm i -D jest @types/jest ts-jest

   ```
11. Run NPM developer

  ```sh
  npm run dev
   ```

## Uso

Uma API onde as pessoas se conectam e interagem entre si.

## Contato

Marina Jaudy  - marinarrjaudy@hotmail.com

Project Link: [https://github.com/marinajaudy/labebook-backend.git](https://github.com/marinajaudy/labebook-backend.git)
<br/>

[![Linkedin](https://img.shields.io/badge/linkedin-%230A66C2.svg?&style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/andrejaques/)](https://www.linkedin.com/in/marina-jaudy)

## Agradecimentos

* Aos professores da Labenu
* Meus colegas de sala que me ajudaram no processo do projeto
* Meus familiares pelo apoio ao longo da construção do projeto

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/marinajaudy/projeto-react-apis.svg?style=for-the-badge
[contributors-url]: https://github.com/marinajaudy/projeto-react-apis/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/marinajaudy/projeto-react-apis.svg?style=for-the-badge
[forks-url]: https://github.com/marinajaudy/projeto-react-apis/network/members
[stars-shield]: https://img.shields.io/github/stars/marinajaudy/projeto-react-apis.svg?style=for-the-badge
[stars-url]: https://github.com/marinajaudy/projeto-react-apis/stargazers
[issues-shield]: https://img.shields.io/github/issues/marinajaudy/projeto-react-apis.svg?style=for-the-badge
[issues-url]: https://github.com/marinajaudy/projeto-react-apis/issues
[license-shield]: https://img.shields.io/github/license/marinajaudy/projeto-react-apis.svg?style=for-the-badge
[license-url]: https://github.com/marinajaudy/projeto-react-apis/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/marinajaudy
[product-screenshot]: readme-image/projeto-react-apis.gif
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[Styled-components]:https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white
[Styled-url]: https://www.styled-components.com/
[Chakra-UI]: https://img.shields.io/static/v1?style=for-the-badge&message=Chakra+UI&color=319795&logo=Chakra+UI&logoColor=FFFFFF&label=
[Chakra-url]: https://chakra-ui.com/getting-started
