




const economicalBowlersYearVise  = require('./economicalBowlersYearVise')
const extraRunsConcededByEachTeamYearVise  = require('./extraRunsConcededByEachTeamYearVise')
const matchesPlayedPerYear  = require('./matchesPlayedPerYear')
const matchesWonByEachTeam  = require('./matchesWonByEachTeam')
const matchesWonByEachTeamPerVenue  = require('./matchesWonByEachTeamPerVenue')
const csvtojsonConverter  = require('./csvtojsonConverter')

async function collectDatYearVise(year = '2019'){
    const deliveries = await csvtojsonConverter('deliveries.csv')
    const matches = await csvtojsonConverter('matches.csv')
    return {
        economicalBowlersYearVise:economicalBowlersYearVise(deliveries,matches,year),
        extraRunsConcededByEachTeamYearVise:extraRunsConcededByEachTeamYearVise(deliveries,matches,year),
        matchesWonByEachTeamPerVenueYearVise:matchesWonByEachTeamPerVenue(matches,year)
    }
}

module.exports = collectDatYearVise

