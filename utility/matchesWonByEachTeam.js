function matchesWonByEachTeam(matches){
    const result = {}
    for(let match of matches){

        if(result[match.winner]){
            if(result[match.winner][match.season]){
                result[match.winner][match.season] += 1
            }else{
                result[match.winner][match.season] = 1
            }
        }else{
            result[match.winner] = {}
            result[match.winner][match.season] = 1
        }
    }
    return result;
}

module.exports = matchesWonByEachTeam