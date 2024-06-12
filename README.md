# Desafio Back-End (Emblemas)

Este desafio consiste em desenvolver uma API em NodeJS preferencialmente utilizando NestJS para gerenciar um sistema de emblemas (badges).

A API deve permitir listar todos os emblemas registrados e permitir que um usuário resgate um emblema

## Requisitos

- Endpoint para listar todos emblemas registrados ✔️

- Endpoint para resgatar um emblema pelo slug garantindo que o mesmo emblema não seja resgatado duas vezes pelo mesmo usuário. ✔️

- Listar todos os emblemas já resgatados por um usuário específico. ✔️

## Restrições

- O serviço deve ser escrito em NodeJS

- O serviço deve armazenar informações em um banco de dados. Você pode escolher o banco que achar melhor. Preferencialmente utilizamos MySQL

## Extra (Opcional)

- Implementar **autenticação** ✔️

- Documentar todos os endpoints da API, utilizando por exemplo **Swagger**. ✔️

- Implementar **paginação** no endpoint de listagem de emblemas ✔️

- Adicionar a capacidade de filtrar os emblemas pelo **nome** no endpoint de listagem de emblemas. ✔️

## Critérios de Avaliação:

**Funcionalidade:** A API atende aos requisitos especificados, incluindo listagem e resgate de emblemas

**Código:** O código deve estar bem organizado e seguir as melhores práticas de desenvolvimento em NodeJS/NestJS e Padrão RESTful.

**Criatividade:** Implementações adicionais ou melhorias serão valorizadas.

## Emblemas

```csv
Id,Slug,Name,Image
1,cda,Cidade Alta,https://cidadealtarp.com/imagens/challenge/cidade-alta.png
2,cda-valley,Cidade Alta Valley,https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png
3,policia,Policia do Cidade Alta,https://cidadealtarp.com/imagens/challenge/policia.png
4,hospital,Hospital do Cidade Alta,https://cidadealtarp.com/imagens/challenge/hospital.png
5,mecanica,Mecânica do Cidade Alta,https://cidadealtarp.com/imagens/challenge/mecanica.png
6,taxi,Taxi do Cidade Alta,https://cidadealtarp.com/imagens/challenge/taxi.png
7,curuja,Coruja,https://cidadealtarp.com/imagens/challenge/coruja.png
8,hiena,Hiena,https://cidadealtarp.com/imagens/challenge/hiena.png
9,gato,Gato,https://cidadealtarp.com/imagens/challenge/gato.png
10,urso,Urso,https://cidadealtarp.com/imagens/challenge/urso.png
```

## How to run project

### Install dependencies

```
$ npm run install
```

### Setup docker services

> [!IMPORTANT]  
> Remember to fill in the environment variables before uploading docker containers

```
$ docker compose up -d
```

### Build Project

```
$ npm run build
```

### Run migrations

```
$ npm run db:migrations
```

### Seed database

```
$ npm run db:seed
```

### Start Project 🚀

```
$ npm run start
```
