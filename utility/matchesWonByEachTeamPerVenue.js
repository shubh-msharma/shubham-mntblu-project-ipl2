






function matchesWonByEachTeamPerVenue(matches, year) {
    const result = {};
    for (let match of matches) {
        if (match['season'] === year) {
            if (result[match.venue]) {
                if (result[match.venue][match.winner]) {
                    result[match.venue][match.winner] += 1;
                } else {
                    result[match.venue][match.winner] = 1;
                }
            } else {
                result[match.venue] = {};
                result[match.venue][match.winner] = 1;
            }
        }

    }
    return result;
}


module.exports = matchesWonByEachTeamPerVenue