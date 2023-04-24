import { formatSummonerEntries, getSubdomainByRegion, handleLolCommand } from "../../src/handlers/LeagueOfLegendsHandler"
import { Error } from "../../src/models/Error";
import { LeagueEntryDTO } from "../../src/models/LeagueEntryDTO"
import { getSummonerDataByName, getSummonerEntriesByEncryptedSummonerId } from "../../src/requests/LeagueOfLegendsRequests"
import { LeagueEntries } from './mocks/LeagueEntries';

test('Summoner ranked data with summoner name with spaces', async () => {
    const messageParts = [
        'user',
        'br',
        'vamo',
        'que',
        'vamo'
    ]

    expect(await isValidSummonerData(messageParts))
})

test('Summoner ranked data with summoner name without spaces', async () => {
    const messageParts = [
        'user',
        'br',
        'ptzin'
    ]

    expect(await isValidSummonerData(messageParts))
})

test('Summoner not found', async () => {
    const region = 'br1'
    const summonerName = 'jdsfa98hf-9J46WYLg'

    const summoner = await getSummonerDataByName(region, summonerName)

    expect(summoner instanceof Error)
})

test('Invalid decrypting id', async () => {
    const region = 'br1'
    const summonerId = 'x_Mh5ItX_czQvRDojs835wJzPy2ozwnhpFP-J46WYLg'

    const leagueEntries = await getSummonerEntriesByEncryptedSummonerId(region, summonerId)

    expect(leagueEntries instanceof Error)
})

test('getSubdomainByRegion', () => {
    const region = 'BR'
    const subdomain = 'BR1'

    const subdomainMock = getSubdomainByRegion(region)

    expect(subdomain === subdomainMock)
})

async function isValidSummonerData(messageParts: string[]): Promise<boolean>{
    const region = 'br1'
    const summonerId = 'x_Mh5ItX_czQvRDoBibU0dgI5wJzPy2ozwnhpFP-J46WYLg'

    const leagueEntriesMock = await getSummonerEntriesByEncryptedSummonerId(region, summonerId)

    if(leagueEntriesMock instanceof Error)
        return false

    const formatMock = formatSummonerEntries(leagueEntriesMock)
    const format = await handleLolCommand(messageParts)

    if(formatMock !== format)
        return false

    return true
}
