function getMain(){
    console.log(document.getElementsByTagName('main'));
    let m = document.getElementsByTagName('main')[0];
    console.log(m);
    console.log(window);
    if( m.hasChildNodes()){
        let target = m.lastElementChild;//uso last element per avere l'ultimo nodo HTML appeso al nodo.
        //last child ritorna l'ultimo 'figlio' del nodo 
        //che può non essere un oggetto html ma anche solo un nodo di testo

        console.log(target);
        let test = document.createElement("p");
        test.innerHTML = "ciao";
        target.appendChild(test);
    }else console.log("nope... found nothing!");
}

function rowPrint(element){
    for (let i in element){
        //console.log(i,"->",element[i])
        if(element[i]){
            console.log("name: ", i, "\nValue: ", element[i]);
        }
    }
}
