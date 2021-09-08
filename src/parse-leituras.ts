import { Leituras } from "./types"

type LiturgiaDoDia = Leituras & {
    leiturasFacultativas: Array<any>
}

const objectIsEmpty = (object: {}) => Object.keys(object).length <= 0

const parseLeituras = (arrayLeituras: Array<any>) => {
    let primeiraLeitura = {}
    let salmo = {}
    let segundaLeitura = {}
    let evangelho = {}
    const leiturasFacultativas: Array<any> = []

    arrayLeituras.forEach(leitura => {
        if (leitura.titulo.search(/1ª Leitura/) >= 0 && objectIsEmpty(primeiraLeitura)) {
            primeiraLeitura = leitura
        }
        else if (leitura.titulo.search(/Salmo/) >= 0 && objectIsEmpty(salmo)) {
            salmo = leitura
        }
        else if (leitura.titulo.search(/2ª Leitura/) >= 0 && objectIsEmpty(segundaLeitura)) {
            segundaLeitura = leitura
        }
        else if (leitura.titulo.search(/Evangelho/) >= 0 && objectIsEmpty(evangelho)) {
            evangelho = leitura
        }
        else {
            leiturasFacultativas.push(leitura)
        }
    })

    const leituras = {
        primeiraLeitura,
        salmo,
        segundaLeitura,
        evangelho,
        leiturasFacultativas
    }

    return leituras as LiturgiaDoDia
}

export { parseLeituras }
