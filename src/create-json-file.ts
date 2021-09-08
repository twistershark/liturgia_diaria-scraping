import fs from 'fs'

import { months } from './utils/months-days.json'
import { parseLeituras } from './parse-leituras'
import { scrapeLiturgia } from './scrape-liturgia'

const createJSONFile = async (ano: number) => {

    for (let mes = 0; mes < 12; mes++) {
        if (!fs.existsSync(`./${ano}`))
            fs.mkdirSync(`./${ano}`)

        if (!fs.existsSync(`./${ano}/${months[mes]}`))
            fs.mkdirSync(`./${ano}/${months[mes]}`)

        console.log(`Criando JSON da liturgia de ${months[mes]} de ${ano}`)

        let daysInMonth = new Date(ano, mes + 1, 0)
        let totalDaysInMonth = daysInMonth.getDate()

        for (let dia = 1; dia <= totalDaysInMonth; dia++) {
            const url = `https://liturgiadiaria.cnbb.org.br/app/user/user/UserView.php?ano=2021&mes=${mes + 1}&dia=${dia}`
            const leituras = parseLeituras(await scrapeLiturgia(url))
            fs.writeFileSync(`./${ano}/${months[mes]}/${dia}-${mes + 1}-2021.json`, JSON.stringify(leituras, null, 2))
        }
    }
}

export { createJSONFile }
