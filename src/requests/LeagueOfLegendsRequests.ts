import { getCompleteUrl } from "../utils/Common"
import { SummonerDTO } from "../models/SummonerDTO"
import { LeagueEntryDTO } from "../models/LeagueEntryDTO"
import { Error } from "../models/Error"
import axios from "../../axios.config"
// eslint-disable-next-line @typescript-eslint/no-var-requires
import 'dotenv/config';

const headers = {
    "X-Riot-Token": process.env.RIOT_KEY
}

export async function getSummonerDataByName(region: string, summonerName: string): Promise<SummonerDTO | Error> {    
    const endPoint = `/lol/summoner/v4/summoners/by-name/${summonerName}`

    const url = getCompleteUrl(region, endPoint)

    const response = await axios.get(url, { headers })

    if(response.status != 200)
        return new Error(`Summoner '${summonerName}' not found!`, response.status)

    return response.data as SummonerDTO
}

export async function getSummonerEntriesByEncryptedSummonerId(region: string, encryptedSummonerId: string): Promise<LeagueEntryDTO[] | Error> {
    const endPoint = `/lol/league/v4/entries/by-summoner/${encryptedSummonerId}`

    const url = getCompleteUrl(region, endPoint)

    const response = await axios.get(url, { headers })

    if(response.status != 200)
        return new Error('Internal error!', response.status)

    return response.data as LeagueEntryDTO[]
}
