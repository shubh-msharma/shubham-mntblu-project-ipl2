

const form = document.getElementById("fm")

form.addEventListener('change', (event) => {
    let main  = document.getElementById("main");
    main.innerHTML = ""
    main.append(getSpinner());
    let year = form.optn.value
    fetch('http://shubh-mntblu-project-ipl2.netlify.app/getdata?year=' + year, { method: "POST" })
        .then(res => res.json())
        .then(obj => {
            main.innerHTML = "";
            for (let func in obj) {
                let arr;
                switch (func) {
                    case 'matchesWonByEachTeamPerVenueYearVise':
                        console.log(obj.matchesWonByEachTeamPerVenueYearVise)
                        arr = [];
                        for(let venue in obj.matchesWonByEachTeamPerVenueYearVise){
                            let temp = []
                            for(let team in obj.matchesWonByEachTeamPerVenueYearVise[venue]){
                                temp.push([team,obj.matchesWonByEachTeamPerVenueYearVise[venue][team]])
                            }
                            arr.push({name:venue,data:temp})
                        }
                        main.append(createContainer(func))
                        console.log(arr);
                        plotGraph1('story: matches won by each team per venue in year'+year, "matchesWonByEachTeamPerVenueYearVise", arr)
                        break;
                    case 'extraRunsConcededByEachTeamYearVise':
                        arr = [];
                        for (let key in obj.extraRunsConcededByEachTeamYearVise) {
                            arr.push([key, obj.extraRunsConcededByEachTeamYearVise[key]])
                        }
                        main.append(createContainer(func))
                        plotGraph('extra runs conceded by each team in year ' + year, "teams", 'extraRunsConcededByEachTeamYearVise', arr)
                        break;
                    case 'economicalBowlersYearVise':
                        arr = [];
                        for (let key in obj.economicalBowlersYearVise) {
                            arr.push([key, obj.economicalBowlersYearVise[key].economuRate])
                        }
                        arr = arr.sort((a, b) => a[1] - b[1]).slice(0, 11);
                        main.append(createContainer(func))
                        plotGraph('top 10 economical bowlers along with their economy rates in year ' + year, "bowlers", 'economicalBowlersYearVise', arr)
                        break;
                    case 'matchesPlayedPerYear':
                        arr = [];
                        for (let key in obj.matchesPlayedPerYear) {
                            arr.push([key, obj.matchesPlayedPerYear[key]])
                        }
                        main.append(createContainer(func))
                        plotGraph('Matches played per year', "years", 'matchesPlayedPerYear', arr)
                        break;
                    case 'matchesWonByEachTeam':
                        arr = [];
                        for (let key in obj.matchesWonByEachTeam) {
                            let temp = [];
                            for (let team in obj.matchesWonByEachTeam[key]) {
                                temp.push([team, obj.matchesWonByEachTeam[key][team]]);
                            }

                            arr.push({ name: key, data: temp })
                        }
                        main.append(createContainer(func))
                        plotGraph1('matches won by each team', 'matchesWonByEachTeam', arr)
                        break;

                }
            }
        })

})




function plotGraph(title, name, id, seriesData) {
    Highcharts.chart(id, {
        chart: {
            type: 'column'
        },
        title: {
            text: title
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            min: 0.00,
            title: {
                text: 'Matches'
            }
        },
        series: [{
            name: name,
            data: seriesData
        }]
    });
}

function plotGraph1(title, id, seriesData) {
    Highcharts.chart(id, {
        chart: {
            type: 'column'
        },
        title: {
            text: title
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            min: 0.00,
            title: {
                text: 'Matches'
            }
        },
        series: seriesData
    });
}

function createContainer(id){
    let row = createElements('div',"row flex-md-row flex-lg-row justify-content-between align-items-center")
    let col = createElements('div',"col-12 p-2 m-3")
    let card = createElements('div',"card")
    let cardTitle = createElements('div',"card-title")
    let cardBody = createElements('div',"card-body")
    let div = document.createElement('div')
    div.style.cssText = "width:100%; height:550px;"
    div.id = id;
    cardBody.append(div)
    card.append(cardTitle,cardBody)
    col.append(card)
    row.append(col)
    return row
}


function createElements(ele,classes = ""){
    let element = document.createElement(ele)
    element.className = classes
    return element
}


function getSpinner(){
    const mainDiv = createElements('div',"sk-cube-grid ")
    mainDiv.innerHTML = '<div class="sk-cube sk-cube1"></div>'.repeat(9)
    return mainDiv
}
