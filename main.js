let search = '';

const searchElement = document.getElementById("input_search");

function handleInput(event){
    // .9
    search = (event.target.value);
}
searchElement.addEventListener('keyup', (KeyboardEvent) =>{
    handleInput(event)
});

async function fetchData(event) {
    try {

        const country = await axios.get(`https://restcountries.eu/rest/v2/name/${search}?fullText=true`);
        const name = country.data[0].name;
        const subregion = country.data[0].subregion;
        const population = country.data[0].population;
        const capital = country.data[0].capital;
        const currency = getCurrencies(country.data[0].currencies);
        const language = getLanguages(country.data[0].languages);
        const flag = country.data[0].flag;
        const sentence1= `${name} is situated in ${subregion}. It has a population of ${population} people.`;

        console.log(country);
        // .2
        console.log(`${name} is situated in ${subregion}. 
        It has a population of ${population} people.`);
        // .3
        console.log(`The capital is ${capital} .`);
        // .4
        console.log(currency);
        // .6
        console.log(language);

        // .10
        searchElement.value='';
        // .7
        let element_flag = document.getElementById("flag") ;
        element_flag.src = flag;
        document.getElementById("land").innerText= name;
        document.getElementById("sentence1").innerText= sentence1;
        document.getElementById("sentence2").innerText= `The capital is ${capital} ${currency} .`;
        document.getElementById("sentence3").innerText= language;



    } catch(e) {
        console.error(e);
        // .10
        searchElement.value='';
        // .12
        let element_flag = document.getElementById("flag") ;
        element_flag.src="assets/tryagain.png";
        document.getElementById("land").innerText= '';
        document.getElementById("sentence1").innerText= 'No country found that matches your search criteria';
        document.getElementById("sentence2").innerText= '';
        document.getElementById("sentence3").innerText= '';
    }
}

//call function on button click
const dataFetchButton = document.getElementById("btn_search");
dataFetchButton.addEventListener('click', fetchData);

//call function on keypress enter
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        fetchData()
    }
});

// .4 get all country currencies
function getCurrencies(currency){
    if(currency.length === 1){
        return `and you can pay with ${currency[0].name}'s`
    }else{
        return `and you can pay with ${currency[0].name}'s and ${currency[1].name}'s`
    }
}

// .6 get all country languages.
 function getLanguages(language){
     let string = 'They speak ';

     for (let i =0; i < language.length; i++){
        let languages = language[i].name;
        if(i===language.length - 1) {  //last entry: add and
            string +=` and ${languages}`;

    }else if(i===language.length - 2){ //entry before last: no and, no comma
            string += languages;
        }else{ // add comma
             string += `${language[i].name}, `;
        }
     }
     return string;
 }



