
function generaTag(tag,innerText, id, classe, url){
    let elementTag = null;
    let lowerTag = tag.toLowerCase();

    switch(lowerTag){
        case('p'):
        elementTag = document.createElement('p');
        elementTag.setAttribute('id',id);
        elementTag.innerHTML = innerText;
        break;

        case('img'):
        elementTag = document.createElement('img');
        elementTag.setAttribute('id',id);
        elementTag.innerHTML = innerText;
        elementTag.setAttribute("src", url);
        
        break;
        default:
            window.alert("Non è un nome tag accettato!");
    }

    return elementTag;
}

function onClickCreate(){
    let trgt = document.body.lastElementChild;
    let area = document.createElement("textarea");
    area.cols = "80";
    area.rows = "3";

    let input = document.getElementById("elemento");
    console.log(input.value);
    trgt.after(area);
    let nuovoEl = generaTag(input.value);
    console.log(nuovoEl);
    area.innerHTML = nuovoEl;
}