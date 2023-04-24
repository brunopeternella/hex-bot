import { Whatsapp } from "venom-bot";
import { isValidRegion } from "../utils/Common";
import { sendText } from "../commands/Chat";
import { SummonerDTO } from "../models/SummonerDTO";
import { LeagueEntryDTO } from "../models/LeagueEntryDTO";
import { getSummonerDataByName, getSummonerEntriesByEncryptedSummonerId } from "../requests/LeagueOfLegendsRequests";
import { Regions } from "../utils/Regions";
import { Error } from "../models/Error";

export async function handleLolCommand(messageParts: string[]): Promise<string> {
    const type = messageParts.shift()?.toUpperCase()

    switch (type) {
    case 'USER':
        return await handleLolUserCommand(messageParts)
    
    default:
        break;
    }

    return ''
}

async function handleLolUserCommand(messageParts: string[]): Promise<string> {
    const region = messageParts.shift()?.toUpperCase()

    if(region == undefined || !isValidRegion(region))
        return ''

    const summonerName = messageParts.join(' ')

    const subdomain = getSubdomainByRegion(region)

    const summoner 
        = await getSummonerDataByName(subdomain, summonerName)

    if(summoner instanceof Error)
        return summoner.message

    const leagueEntries 
        = await getSummonerEntriesByEncryptedSummonerId(subdomain, summoner.id)

    if(leagueEntries instanceof Error)
        return leagueEntries.message

    return formatSummonerEntries(leagueEntries)
}

export function formatSummonerEntries(leagueEntries: LeagueEntryDTO[]): string {
    let text = ''

    let hasGetSummonerName = false
    let isLastEntrie = false

    leagueEntries.forEach(entrie => {
        if(!hasGetSummonerName){
            text += `Summoner: ${entrie.summonerName}\n\n`
            hasGetSummonerName = true
        }

        text += `${entrie.queueType}\n`

        const totalMatches = entrie.wins + entrie.losses

        const winrate = ((entrie.wins / totalMatches) * 100).toFixed(0)

        text += `Winrate: ${winrate}%\n`
        
        text += `✅ ${entrie.wins}\n`
        text += `❌ ${entrie.losses}\n`        

        if(!isLastEntrie){
            text += '\n\n'
            isLastEntrie = true
        }
    })

    return text
}

export function getSubdomainByRegion(region: string): string {
    let subdomain = ''

    Regions.forEach(element => {
        if(element.region === region){
            subdomain = element.subdomain
            return
        }
    })

    return subdomain
}
