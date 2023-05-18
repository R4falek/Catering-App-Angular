export interface Dish {
    nazwaDania: string,
    typKuchni: string,
    // typ: string,
    kategoria: string,
    skladniki: string[],
    maxIloscJednegoDnia: number,
    cena: number,
    opis: string,
    linkDoZdjec: string[],
    //   linkDoZdjec = ["https://www.glamour.pl/media/cache/default_view/uploads/media/default/0003/75/jedzenie-ktore-daje-szczescie.jpeg", "https://krytykakulinarna.com/wp-content/uploads/2021/03/najlepsze_jedzenie_z_dowozem_warszawa_3.jpg"]
    orderedCount: number,
    mostExpensive: boolean,
    cheapest: boolean,
    oceny: number[],
    opinia: Opinion[],
    sredniaOcen?: number,
    twojaOcena?: number
}

export interface History {
    nazwaDania: string,
    liczbaZamowionych: number,
    cenaSum: number,
    dataZakupu: Date
}

export interface Opinion {
    nickname: string,
    opinion: string,
    date: Date
}

export interface User{
    id: string,
    name: string,
    role: string,
    history: History[],
    ban: boolean
}