const axios = require("axios")
const {axiosResponse} = require("axios")
import { numberGeneratorApiResponse, makeRequestInterface,numericFactsDatabase , numbersApi} from "./interfaces"

const makeRequest = async ( params: makeRequestInterface ) => {
  try{
    const response : typeof axiosResponse = await axios(params)
    if(response.status === 200){
      return response.data
    }
  }catch(err){
    if( err.response && err.response.status === 412){
      throw "incorrect request body"
    }else if(err.response){
      throw `unable to satisfy the request, status code: ${err.response.status}`
    }else{
      throw `unable to satisfy the request, no resonse: error code ${err.code}`
    }
  }
}
  
const fetchParseSend = async () : Promise<void> => {
  try{
    const response: numberGeneratorApiResponse  = await makeRequest({method: "GET", data: {}, url: "https://randomnumbergenerator-typescriptsig.azurewebsites.net/api/randomnumbergenerator?code=3VvfRSG9rwNkWTlPXCR8g0SADbhqf/axR3iDMnu2SvLIPND6ks/8LA==" })
    const {numbers} = response
    if(typeof numbers !== 'object') throw "unexpect type fot the number array"
    if(!numbers.length) throw "unexpect type for the number array"
    if(numbers.length <= 1 ) throw "received an empty array"
    
    const sorted : [number] = numbers.sort( (a: number , b: number ) => b - a )
    for( let num of sorted){
      try{
      const facts: numbersApi  = await makeRequest({method: "GET", data: {} , url: `http://numbersapi.com/${num}/trivia/` })
      if(facts.found){
        const data : numericFactsDatabase = { names: ["Jeroen", "Pien", "Diva"], number: num, trivia:  facts.text, datetime: new Date()}
        try{
          await makeRequest({method: "POST", data, url: `https://randomnumbergenerator-typescriptsig.azurewebsites.net/api/NumericFactsDatabase?code=LbOqqn6XQNeHKxkI9Dd1DX7QtAUalVv1sF4ReBd/pBSdx0E1Fd6QAw==`})
          console.log("succesfully send a fact to the NumericFactsDatabase")
        }
        catch(err){
            console.log(`could not post to NumericFactsDatabase, reason: ${err}`)
            return
        }
        break;
      }
    }catch(err){
      console.log(`unable to obtain a fact, reason: ${err}`)
    }

    }
  }
  catch(err){
    console.log("err", err)
  }
}
fetchParseSend()

  