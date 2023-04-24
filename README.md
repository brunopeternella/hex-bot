
# HexBox

HexBox is a bot designed to provide users with data and information related to Riot Games on WhatsApp groups. With the ability to access data from Riot Games API, HexBox can quickly retrieve information about player profiles, game statistics, and other relevant game-related data.


## Running locally

Clone the project

```bash
  git clone https://github.com/brunopeternella/hex-bot.git
```

Enter the project directory

```bash
  cd hex-bot
```

Install the dependencies

```bash
  npm install
```

Create a .env file with your RIOT_KEY

```bash
  RIOT_KEY=""
```

(optional) Build
```bash
  npm run build
```

(optional) Test
```bash
  npm run test
```

Start the bot

```bash
  npm run start
```


## Implemented commands

- $lol user br {summonerName}
  - Gets the rankeds data of the summoner, like wins, loss and winrate.

