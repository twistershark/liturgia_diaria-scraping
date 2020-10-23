# :sparkles: Web Scraping - Liturgia Diaria

Criei esse web scraper para poder capturar a liturgia diaria da página da CNBB de forma automática para utilizar esses dados em um projeto pessoal.

Exemplo do arquivo texto gerado pelo web scraper:
```
{
  "primeiraLeitura": {
      "primeiraLeituraTitulo": "1ª Leitura - 1Cor 2,10b-16",
      "textoPrimeiraLeitura": "Irmãos: A nós Deus revelou esse mistério através do Espírito. Pois..."
   },
   "salmo": {
      "salmoTitulo": "Salmo - Sl 144,8-9. 10-11. 12-13ab. 13cd-14 (R. 17a)",
      "salmoRefrao": "R. É justo o Senhor em seus caminhos.",
      "salmoEstrofes": ["Misericórdia e piedade é o Senhor,  ele é amor, é ..."]
   },
   "evangelho": {
      "evangelhoTitulo": "Evangelho - Lc 4,31-37",
      "evangelhoTexto":"Naquele tempo: Jesus desceu a Cafarnaum, cidade da Galiléia, e aí ensinava-os..."
   }
}
```

## :rocket: Como utilizar

Dentro do arquivo liturgia.js tem um loop com a url do site da CNBB. Através desse loop e da URL, é fácil alterar os dias de liturgia que você deseja que sejam capturados.


### :card_file_box: Pré-requisitos

* Node: versão 12 ou mais atual.


### :construction: Executando

Depois de clonar o repositório, entre na pasta do repositório e execute esse comando no terminal para instalar todas as dependências:
```
yarn
```

Depois disso, para executar o web scraper basta executar esse comando no terminal:

```
node ./liturgia.js
```

## 🤓 Autor

👤 **Paulo Victor da Silva**

* Github: [@twistershark](https://github.com/twistershark)
* LinkedIn: [@paulovictorsilva](https://linkedin.com/in/paulovictorsilva)

## Ajude

Dê uma ⭐️ se esse projeto the ajudou!

## 🤝 Contribuições
Fique à vontade para contribuir para esse projeto. Toda ajuda é bem-vinda!

---

## 📃 Licença

Projeto licenciado com a licença MIT - veja o [LICENSE.md](LICENSE) para mais detalhes.
