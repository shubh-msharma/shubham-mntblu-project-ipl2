




const economicalBowlers  = require('./economicalBowlers')
const extraRunsConcededByEachTeam  = require('./extraRunsConcededByEachTeam')
const matchesPlayedPerYear  = require('./matchesPlayedPerYear')
const matchesWonByEachTeam  = require('./matchesWonByEachTeam')
const csvtojsonConverter  = require('./csvtojsonConverter')

async function getData(){
    const deliveries = await csvtojsonConverter('deliveries.csv')
    const matches = await csvtojsonConverter('matches.csv')
    return {
        economicalBowlers:economicalBowlers(deliveries,matches),
        extraRunsConcededByEachTeam:extraRunsConcededByEachTeam(deliveries,matches),
        matchesPlayedPerYear:matchesPlayedPerYear(matches),
        matchesWonByEachTeam:matchesWonByEachTeam(matches)
    }
}

module.exports = getData

