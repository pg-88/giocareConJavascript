function getMain(){
    console.log(document.getElementsByTagName('main'));
    let m = document.getElementsByTagName('main')[0];
    console.log(m);
    
    if( m.hasChildNodes()){
        let target = m.lastChild();
        console.log(target);
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