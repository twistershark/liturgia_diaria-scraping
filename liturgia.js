const puppeteer = require('puppeteer');
const fs = require('fs');


async function scrapeLiturgia(url, date) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const parsedLeituras = await page.evaluate(() => {
    // Pegar todos os textos
    const spans = document.querySelectorAll('span');
    const spansToArray = [...spans];

    const textArray = spansToArray.map(text => {
      return text.textContent;
    });

    const count = document.getElementsByClassName('title-leitura');
    if (count[3] === undefined){
      // Separar Primeira Leitura
      const selectTituloPrimeiraLeitura = document.getElementsByClassName('title-leitura');
      let primeiraLeituraTitulo = selectTituloPrimeiraLeitura[0].textContent;
      primeiraLeituraTitulo = primeiraLeituraTitulo.replace(/\t|\n/g, '');

      const fimPrimeiraLeitura = textArray.findIndex(text => text === 'Palavra do Senhor.');
      const primeiraLeituraArray = textArray.splice(0, fimPrimeiraLeitura + 1);
      primeiraLeituraArray.pop(); // remover 'Palavra do Senhor'
      const textoPrimeiraLeitura = primeiraLeituraArray.join(' ').replace(/  /g, ' ');
      const primeiraLeitura = { primeiraLeituraTitulo, textoPrimeiraLeitura };
      

      // Separar Salmo

      const selectRefraoSalmo = document.getElementsByClassName('refrao_salmo');
      const salmoRefrao = selectRefraoSalmo[0].textContent;

      const selectTituloSalmo = document.getElementsByClassName('title-leitura');
      let salmoTitulo = selectTituloSalmo[1].textContent;
      salmoTitulo = salmoTitulo.replace(/\t|\n/g, '');

      let salmoEstrofes = [];
      let index = 0;

      while(index !== -1) {
        index = textArray.findIndex(pedaco => pedaco === 'R. ');
        let block = textArray.splice(0, index + 1);
        let string = block.join(' ').replace(/  /g, ' ');
        string = string.replace(/\*|R.   |R. |\+/g, '');
        salmoEstrofes.push(string);
      }
      index = textArray.findIndex(pedaco => pedaco === 'R.');
      let block = textArray.splice(0, index + 1);
      let string = block.join(' ').replace(/  /g, ' ');
      string = string.replace(/\*|R.   |R. | R.|\+|R./g, '');
      salmoEstrofes.push(string);

      salmoEstrofes = salmoEstrofes.filter(estrofe => estrofe !== '');

      const salmo = { salmoTitulo, salmoRefrao, salmoEstrofes};

      // Separar evangelho

      let evangelhoTitulo = count[2].textContent;
      evangelhoTitulo = evangelhoTitulo.replace(/\t|\n/g, '');
      const finalEvangelho = textArray.findIndex(palavra => palavra === 'Palavra da Salvação.')
      const evangelhoTexto = textArray.splice(0, finalEvangelho).join(' ').replace(/  /g, ' ');

      const evangelho = { evangelhoTitulo, evangelhoTexto };
      return ({ primeiraLeitura, salmo, evangelho });

    } else {
      // Primeira Leitura
      const selectTituloPrimeiraLeitura = document.getElementsByClassName('title-leitura');
      let primeiraLeituraTitulo = selectTituloPrimeiraLeitura[0].textContent;
      primeiraLeituraTitulo = primeiraLeituraTitulo.replace(/\t|\n/g, '');

      const fimPrimeiraLeitura = textArray.findIndex(t => t === 'Palavra do Senhor. ');
      const primeiraLeituraArray = textArray.splice(0, fimPrimeiraLeitura + 1);
      primeiraLeituraArray.pop(); // remover 'Palavra do Senhor'
      const textoPrimeiraLeitura = primeiraLeituraArray.join(' ').replace(/  /g, ' ');

      const primeiraLeitura = { primeiraLeituraTitulo, textoPrimeiraLeitura };

      // Salmo
      const selectRefraoSalmo = document.getElementsByClassName('refrao_salmo');
      const salmoRefrao = selectRefraoSalmo[0].textContent;

      const selectTituloSalmo = document.getElementsByClassName('title-leitura');
      let salmoTitulo = selectTituloSalmo[1].textContent;
      salmoTitulo = salmoTitulo.replace(/\t|\n/g, '');

      let salmoEstrofes = [];
      let index = 0;

      while(index !== -1) {
        index = textArray.findIndex(pedaco => pedaco === 'R.   ');
        let block = textArray.splice(0, index + 1);
        let string = block.join(' ').replace(/  /g, ' ');
        string = string.replace(/\*|R.   |R. |\+/g, '');
        salmoEstrofes.push(string);
      }

      index = textArray.findIndex(pedaco => pedaco === 'R. ');
      let block = textArray.splice(0, index + 1);
      let string = block.join(' ').replace(/  /g, ' ');
      string = string.replace(/\*|R.   |R. | R.|\+/g, '');
      salmoEstrofes.push(string);

      salmoEstrofes = salmoEstrofes.filter(estrofe => estrofe !== '');

      const salmo = {salmoTitulo, salmoRefrao, salmoEstrofes};

      // Segunda Leitura
      let segundaLeituraTitulo = count[2].textContent;
      segundaLeituraTitulo = segundaLeituraTitulo.replace(/\t|\n/g, '');

      const fimSegundaLeitura = textArray.findIndex(text => text === 'Palavra do Senhor. ');
      const segundaLeituraArray = textArray.splice(0, fimSegundaLeitura + 1);
      segundaLeituraArray.pop(); // remover 'Palavra do Senhor'
      
      const textoSegundaLeitura = segundaLeituraArray.join(' ').replace(/  /g, ' ');
      const segundaLeitura = { segundaLeituraTitulo, textoSegundaLeitura };

      // Evangelho
      let evangelhoTitulo;
      if(count[4] === undefined) {
        evangelhoTitulo = count[3].textContent;
        evangelhoTitulo = evangelhoTitulo.replace(/\t|\n/g, '');
      } else{
        evangelhoTitulo = count[4].textContent;
        evangelhoTitulo = evangelhoTitulo.replace(/\t|\n/g, '');
      }
      
      let finalEvangelho;
      if(textArray.findIndex(palavra => palavra === 'Palavra da Salvação. ') === -1){
        finalEvangelho = textArray.findIndex(palavra => palavra === 'Palavra da Salvação ');
      }else {
        finalEvangelho = textArray.findIndex(palavra => palavra === 'Palavra da Salvação. ');
      }
      
      const evangelhoTexto = textArray.splice(0, finalEvangelho).join('').replace(/  /g, ' ');

      const evangelho = { evangelhoTitulo, evangelhoTexto };

      return ({ primeiraLeitura, salmo, segundaLeitura, evangelho });
    }
  });

  let data = JSON.stringify(parsedLeituras);
  fs.writeFileSync(`${date}.txt`, data);

  browser.close();
}

async function generateFiles(){
  for (let i = 0; i < 10; i++){
    await scrapeLiturgia(
      `https://liturgiadiaria.cnbb.org.br/app/user/user/UserView.php?ano=2020&mes=9&dia=${i}`,
      `${i}-09-2020`,
    );
  }
}

generateFiles();




  