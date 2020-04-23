






function extraRunsConcededByEachTeam(deliveries,matches,year){ 
    const result = {}
    const ids = matches.filter(obj =>obj['season'] === year).map(obj=>parseInt(obj.id))
    const dels = deliveries.filter(del=>ids.includes(parseInt(del['match_id'])))
       for(let id of ids){
        for(let del of dels){
            if(parseInt(del['match_id']) === id){
                if(result[del.bowling_team]){
                    result[del.bowling_team] += parseInt(del['extra_runs'])
                }else{
                    result[del.bowling_team] = parseInt(del['extra_runs'])
                }
            }
        }
    }
        return result
}

module.exports = extraRunsConcededByEachTeam