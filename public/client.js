
const url = "https://shubh-mntblu-project-ipl2.herokuapp.com"
// "http://localhost:3004"



const static  = document.getElementById('static');
    static.append(getSpinner());

window.onload = function(event){
    fetch(url+'/getStaticData')
    .then(res => res.json())
    .then(obj => {
        static.innerHTML = ""
        for (let func in obj) {
            let arr;
            switch (func) {
                case 'matchesPlayedPerYear':
                    arr = [];
                    for (let key in obj.matchesPlayedPerYear) {
                        arr.push([key, obj.matchesPlayedPerYear[key]])
                    }
                    static.append(createContainer('matchesPlayedPerYear'))
                    plotGraph('Matches played per year', "years", 'matchesPlayedPerYear', arr)
                    break;
                case 'matchesWonByEachTeam':
                    arr = [];
                    for (let key in obj.matchesWonByEachTeam) {
                        let temp = [];
                        for(let team in obj.matchesWonByEachTeam[key]){
                            temp.push([team,obj.matchesWonByEachTeam[key][team]]);
                        }
                        
                        arr.push({name:key, data:temp})
                    }
                    static.append(createContainer('matchesWonByEachTeam'))
                    plotGraph1('matches won by each team', 'matchesWonByEachTeam', arr)
                    console.log(arr);
                    break;
                case 'extraRunsConcededByEachTeam':
                    arr = [];
                    for (let key in obj.extraRunsConcededByEachTeam) {
                        arr.push([key, obj.extraRunsConcededByEachTeam[key]])
                    }
                    static.append(createContainer('extraRunsConcededByEachTeam'))
                    plotGraph('extra runs conceded by each team in year 2016', "teams", 'extraRunsConcededByEachTeam', arr)
                    break;
                case 'economicalBowlers':
                    arr = [];
                    for (let key in obj.economicalBowlers) {
                        arr.push([key, obj.economicalBowlers[key].economuRate])
                    }
                    arr = arr.sort((a, b) => a[1] - b[1]).slice(0, 11);
                    static.append(createContainer('economicalBowlers'))
                    plotGraph('top 10 economical bowlers along with their economy rates in year 2015', "bowlers", 'economicalBowlers', arr)
                    break;
            }
        }
        
        document.getElementById('yearSelection').classList.remove('hide')
    })
}

const form = document.getElementById("fm")
form.addEventListener('submit', (event) => {
    // change
    event.preventDefault();
    let main  = document.getElementById("dynamic");
    main.innerHTML = ""
    document.getElementById("err_msg").innerHTML = ""
    main.append(getSpinner());
    // let year = form.optn.value
    let year = form.ip.value.trim()
    fetch(url+'/getdata?year=' + year, { method: "POST" })
        .then(res => {
            if(res.status === 404)throw new Error("enter year between 2008 to 2019")
            return res.json()
        })
        .then(obj => {
            main.innerHTML = "";
            for (let func in obj) {
                let arr;
                switch (func) {
                    case 'matchesWonByEachTeamPerVenueYearVise':
                        arr = [];
                        for(let venue in obj.matchesWonByEachTeamPerVenueYearVise){
                            let temp = []
                            for(let team in obj.matchesWonByEachTeamPerVenueYearVise[venue]){
                                temp.push([team,obj.matchesWonByEachTeamPerVenueYearVise[venue][team]])
                            }
                            arr.push({name:venue,data:temp})
                        }
                        main.append(createContainer(func))
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
                }
            }
        }).catch(err=>{
            main.innerHTML = ""
            document.getElementById("err_msg").innerHTML = err.message
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
