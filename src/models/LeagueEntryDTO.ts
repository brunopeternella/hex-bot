export class LeagueEntryDTO {
    leagueId: string;
    summonerId: string;
    summonerName: string;
    queueType: string;
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    hotStreak: boolean;
    veteran: boolean;
    freshBlood: boolean;
    inactive: boolean;
    
    constructor(
        leagueId: string,
        summonerId: string,
        summonerName: string,
        queueType: string,
        tier: string,
        rank: string,
        leaguePoints: number,
        wins: number,
        losses: number,
        hotStreak: boolean,
        veteran: boolean,
        freshBlood: boolean,
        inactive: boolean
    ) {
        this.leagueId = leagueId;
        this.summonerId = summonerId;
        this.summonerName = summonerName;
        this.queueType = queueType;
        this.tier = tier;
        this.rank = rank;
        this.leaguePoints = leaguePoints;
        this.wins = wins;
        this.losses = losses;
        this.hotStreak = hotStreak;
        this.veteran = veteran;
        this.freshBlood = freshBlood;
        this.inactive = inactive;
    }
}
