export type Leituras = {
    primeiraLeitura: {
        titulo: string
        subtitulo: string
        texto: string
    }

    salmo: {
        refrao: string[]
        estrofes: string[][]
    }

    segundaLeitura: {
        titulo: string
        subtitulo: string
        texto: string
    } | undefined

    evangelho: {
        titulo: string
        subtitulo: string
        texto: string
    }
}