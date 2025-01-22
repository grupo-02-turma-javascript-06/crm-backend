# Nome do Projeto - Backend

<br />

<div align="center">
    <img src="https://i.imgur.com/icgjsRQ.png" title="source: imgur.com" width="50%"/>
</div>


<br /><br />

## 1. Descrição

Descreva brevemente o seu projeto

------

## 2. Sobre esta API

Descreva brevemente a API que foi construída

### 2.1. Principais Funcionalidades

1. Liste as principais funcionalidades e as features especiais do sistema

------

## 3. Diagrama de Classes
```mermaid
classDiagram
class Usuario{
  - id: number,
  - nome: string,
  - senha: string,
  - email: string

  + findAll (): Promise<Usuario[]>
  + findById(id: number): Promise<Usuario>
  + findByUsuario(nome: string): Promise<Usuario[]>
  + create(usuario: Usuario): Promise<Usuario>
  + update(usuario: Usuario): Promise<Usuario>
}
class Cliente{
  - id: number,
  - nome: string,
  - telefone: string,
  - email: string,
  - foto: string,
  - historico: string

  + findAll (): Promise<Cliente[]>
  + findById(id: number): Promise<Cliente>
  + findByCliente(nome: string): Promise<Cliente[]>
  + create(cliente: Cliente): Promise<Cliente>
  + update(cliente: Cliente): Promise<Cliente>
  + delete(id: number): Promise<DeleteResult>
class Oportunidade{
  - id: number,
  - nome: string,
  - valor: decimal,
  - abertura: date,
  - termino: date,
  - status: string

  + findAll (): Promise<Oportunidade[]>
  + findById(id: number): Promise<Oportunidade>
  + findByNome(nome: string): Promise<Oportunidade[]>
  + findByValor(valor: decimal): Promise<Oportunidade[]>
  + findByStatus(status: string): Promise<Oportunidade[]>
  + create(oportunidade: Oportunidade): Promise<Oportunidade>
  + update(oportunidade: Oportunidade): Promise<Oportunidade>
  + delete(id: number): Promise<DeleteResult>
}
```
Obs: Add Whatsapp / CPF na entidade Cliente.

## 4. Diagrama Entidade-Relacionamento (DER)

Adicione a imagem do DER

<div align="center">
    <img src="imagem" title="source: imgur.com" />
</div>



------

## 5. Tecnologias utilizadas

| Item                          | Descrição  |
| ----------------------------- | ---------- |
| **Servidor**                  | Node JS    |
| **Linguagem de programação**  | TypeScript |
| **Framework**                 | Nest JS    |
| **ORM**                       | TypeORM    |
| **Banco de dados Relacional** | MySQL      |

------

## 6. Configuração e Execução

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure o banco de dados no arquivo `app.module.ts`
4. Execute a aplicação: `npm run start:dev`
