
let convertationRules = getRules()

function getRules () {
    let request = new XMLHttpRequest ();
    
    request.open('GET', 'data.json', false);
    
    request.onload = function() {
        rules = JSON.parse(this.response);
    }
    request.send()
    return rules
}



let form = document.querySelector('form');

function getResultOnline (distance, unit, convertTo, res) {
    
    if (distance == 0) {
        res.removeAttribute('placeholder')
    } else if (unit == convertTo) {
        res.setAttribute('placeholder', distance)
    } else {
        let newDistance = (distance * convertationRules[unit][convertTo]).toFixed(2);
        res.setAttribute('placeholder', newDistance )
    }
}


function getResult (obj) {

    let resultObj = {}

    if (obj.distance.unit == obj.convertTo) {
        resultObj.unit = obj.convertTo;
        resultObj.value = obj.distance.value;
    } else {
        resultObj.unit = obj.convertTo;
        resultObj.value = (obj.distance.value * convertationRules[obj.distance.unit][obj.convertTo]).toFixed(2)
    }

    return resultObj
}



form.addEventListener('input', function(){
    let unitValue = document.querySelector('#unit').value,
        distanceToConvert = document.querySelector('#distance').value,
        convertToValue = document.querySelector('#result_unit').value,
        result = document.querySelector('#result_distance');
    
    
    getResultOnline(distanceToConvert, unitValue, convertToValue, result)
    
})


form.addEventListener('submit', function(e){
    e.preventDefault()


    let obj = {
        distance: {unit: document.querySelector('#unit').value, value: document.querySelector('#distance').value},
                    convertTo: document.querySelector("#result_unit").value },
        result = getResult(obj),
        resultJSON = JSON.stringify(result).split('"').join(' ')
        resultContainer = document.querySelector('#pop-up');

    if(result.value == 0) {
        return
    } else if (result.value > 0) {
        resultContainer.textContent = resultJSON
        console.log(resultJSON)
    }
})


for (key in convertationRules) {
    let select1 = document.querySelector('#unit').options,
        select2 = document.querySelector('#result_unit').options;
    
    select1[select1.length]= new Option(key, key)
    select2[select2.length]= new Option(key, key)

}
