# Projeto Sisvetor

> Frontend para o sistema Sisvetor, projeto de avaliação de domínio básico no desenvolvimento de aplicações do Arbocontrol.

## Sobre o sistema

O projeto ArboControl tem o objetivo de avaliar os sistemas de vigilância existentes
para o contexto entomológico e de desenvolver um produto de software que permita
identificar e monitorar situações em que o controle entomológico e vetorial seja necessário,
gerando informação para tomada de decisões. Esse projeto está sendo desenvolvido pela
Universidade de Brasília – UNB juntamente com o Ministério da Saúde

## Implementação

Para a implementação foi utilizado o framework Angular, na versão 8 (https://angular.io/), a biblioteca padrão de componentes
Angular Material (https://material.angular.io/) e o framework NgRx (https://ngrx.io).

Há uma dependência em relação ao back-end que não está disponível, por este motivo para o desenvolvimento do front deve ser utilizado um “fake” back-end, para simular
as respostas do servidor. Para isso pode ser usado o json-server (https://github.com/typicode/json-server).
As demais dependências encontram-se no arquivo de configuração package.json.

## Pré-Requisitos para deployment

1. No diretório raiz, crie um arquivo nomeado db.json e insira os seguintes dados:

```{
 "itens": [
  {
      "id": 1,
      "nome": "Item 1"
  },
  {
      "id": 2,
      "nome": "Item 2"
  },
 ],
 "subitens": [
      {
      "id": 1,
      "nome": "SubItem 1"
      },
      {
      "id": 2,
      "nome": "SubItem 2"
      }
  ],
  "itemsubitens": [
      {
          "item_id": 1,
          "sub_item_id": 1
      },
      {
          "item_id": 1,
          "sub_item_id": 2
      }
  ]
 }
```

2. No diretório raiz, execute: json-server --watch db.json.

## Deployment

> Ambiente de desenvolvimento

No diretório raiz execute:

- ng serve
