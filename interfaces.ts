interface numberGeneratorApiResponse {
    id: string
    date: string
    numbers: [number]
} 
interface numericFactsDatabase{
    "number": number,
    "trivia": string,
    "names" : string[],
    "datetime": Date
}
interface numbersApi{
    text: string,
    number: number,
    found: boolean,
    type: "trivia"
}
interface makeRequestInterface {
    method: "GET" | "POST" | "PUT"  | "DELETE"
    url: string,
    data: object
}

export {numberGeneratorApiResponse , numericFactsDatabase, makeRequestInterface, numbersApi}