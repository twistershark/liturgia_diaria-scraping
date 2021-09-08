import puppeteer from 'puppeteer'

const scrapeLiturgia = async (url: string) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const leituras = await page.evaluate(() => {
        const corpoLeituras = document.querySelector('#corpo_leituras')

        const leituraBruta = []

        if (corpoLeituras?.children) { //4 ou 3 children dependendo se há duas leituras.
            for (const child of corpoLeituras.children) { //Em cada Child há 3 outros child, importando apenas o 0 e 2.
                leituraBruta.push(child)
            }
        }

        const leituras = []

        for (const corpo of leituraBruta) {
            // @ts-ignore
            if (corpo.children[0].textContent?.trim().search(/Salmo/) < 0) {
                let titulo
                let comentario
                let subtitulo
                let texto = []

                for (const el of corpo.children) {
                    if (el.className === 'title-leitura')
                        titulo = el.textContent?.trim()
                }

                for (const el of corpo.children[2].children) {
                    if (el.className === 'cit_direita_italico')
                        comentario = el.textContent?.trim()
                    if (el.className === 'cit_direita')
                        subtitulo = el.textContent?.trim()
                    if (el.localName === 'span')
                        texto.push(el.textContent?.trim())

                    // Exceção: As vezes as tags SPAN estão dentro de uma tag P
                    else if (el.localName === 'p') {
                        for (const linha of el.children) {
                            if (linha.textContent?.trim())
                                texto.push(linha.textContent?.trim())
                        }
                    }
                }

                const leitura = {
                    titulo,
                    comentario,
                    subtitulo,
                    texto
                }

                leituras.push(leitura)
            }
            else {
                let refrao = []
                let estrofe = []
                const estrofes = []

                for (const el of corpo.children[2].children) {
                    if (el.className === 'refrao_salmo')
                        refrao.push(el.textContent?.trim())
                    if (el.localName === 'span' && el.className !== 'refrao_salmo') {
                        estrofe.push(el.textContent?.trim())

                        // @ts-ignore
                        if (el.textContent?.trim().search(/R\./) > 0) {
                            estrofes.push(estrofe)
                            estrofe = []
                        }
                    }
                }

                const salmo = {
                    titulo: corpo.children[0].textContent?.trim(),
                    refrao,
                    estrofes
                }

                leituras.push(salmo)
            }
        }

        return leituras
    })

    browser.close()

    return leituras
}

export { scrapeLiturgia }
