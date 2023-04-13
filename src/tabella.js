function inputNum(){
    /*al caricamento pagina, genera campi input e bottone disabilitato*/
    let contRighe = document.createElement("div");
    let lblRighe = document.createElement("label");
    lblRighe.appendChild(document.createTextNode("Inserisci Numero Righe"));
    let contColonne = document.createElement("div");
    let lblColonne = document.createElement("label");
    lblColonne.appendChild(document.createTextNode("Inserisci Numero Colonne"));
    let inRighe = document.createElement("input");
    let inColonne = document.createElement("input");
    let bottone = document.createElement("button");
    bottone.appendChild(document.createTextNode("Crea La Tabella"));
    let nl = document.createElement("br");
    
    //Attributi
    contRighe.setAttribute("id", "righe");
    lblRighe.setAttribute("for", "in-righe");
    lblColonne.setAttribute("for", "in-col");
    inRighe.setAttribute("id", "in-righe");
    inRighe.setAttribute("type", "number");
    inRighe.setAttribute("onchange", "controllaInput()");
    inRighe.setAttribute("min", "1");
    inRighe.setAttribute("maxlength", "5");
    contColonne.setAttribute("id", "colonne");
    inColonne.setAttribute("type", "number");
    inColonne.setAttribute("id", "in-col");
    inColonne.setAttribute("min", "1");
    inColonne.setAttribute("maxlength", "5");
    inColonne.setAttribute("onchange", "controllaInput()");
    bottone.setAttribute("id", "crea-tabella");
    bottone.setAttribute("onclick", "lanciaCreazione()");
    bottone.setAttribute("disabled", "true");
    inRighe.insertAdjacentElement("afterend", nl);//ignorato nell'HTML
    inColonne.insertAdjacentElement("afterend", nl);//ignorato nell'HTML
    
    //inserisco nel DOM
    contRighe.append(lblRighe, inRighe);
    contColonne.append(lblColonne, inColonne); 
    document.body.append(contRighe, contColonne, bottone, nl);
}

function controllaInput(){
    /*sul change degli input
    prende dalla pagina i valori inseriti e attiva il bottone
    solo se gli input sono accettabili*/
    let r = document.getElementById("in-righe").value;
    let c = document.getElementById("in-col").value;
    let disabilitato = document.getElementById("crea-tabella");

    if (r > 0 && c > 0){
        disabilitato.removeAttribute("disabled");
    }else  disabilitato.setAttribute("disabled", "true");
    //con else impedisco che rimanga attivato se riporto i valori a 0
}

function lanciaCreazione(){
    /*sul click del bottone, richiama creaTabella 
    passando i parametri necessari.*/
    let r = document.getElementById("in-righe").value;
    let c = document.getElementById("in-col").value;
    if(! document.getElementById("tabella")) {
        //div che conterra la tabella
        let trgt = document.createElement("div");
        trgt.setAttribute("id", "trgt");
        document.body.lastElementChild.after(trgt);
        creaTabella(r,c);
        creaBottoni();
    }
    else {
        document.getElementById("trgt").removeChild(document.getElementById("tabella"));
        creaTabella(r,c);
    }
}

function creaTabella(righe, colonne){
    /*genera e inserisce la tabella prendendo come parametri */
    console.log(righe, colonne);
    let tabella = document.createElement("table");
    let h = document.createElement("thead");
    let b = document.createElement("tbody");
    tabella.setAttribute("id", "tabella");
    
    //collego gli elementi
    
    tabella.append(h, b);
    document.getElementById("trgt").appendChild(tabella);


    //creo righe e colonne
    for(let r = 0; r <= righe; r++){
        //r <= righe una iterazione in più per creare la riga thead
        let rigaEl = document.createElement("tr");
        rigaEl.setAttribute("id", ("riga" + r));
        //inserisco in head solo se è la prima riga
        if(r == 0) h.appendChild(rigaEl);
        else b.appendChild(rigaEl);

        //ciclo per le celle
        for(let c = 0; c < colonne; c++){
            let celEl = document.createElement("td");
            celEl.setAttribute("id", ("cella" + (r-1).toString() + ':' + c));
            headStr = "Intestazione Colonna " + c;
            celStr = "Cella " + (r-1).toString() + ':' + c;//index 0 per le celle
            if (r == 0) celEl.appendChild(document.createTextNode(headStr));
            else celEl.appendChild(document.createTextNode(celStr));

            document.getElementById("riga" + r).appendChild(celEl);
        }
    }
}

function creaBottoni(){
    /*genera elementi HTML per modificare la tabella */
    let contBtn = document.createElement("div");
    let btnNascondi = document.createElement("button");
    let btnSvuota = document.createElement("button");
    let txtNascondi = document.createTextNode("Nascondi/Mostra Tabella");
    let txtSvuota = document.createTextNode("Svuota Celle Tabella");
    //attributi
    btnNascondi.setAttribute("id", "btn-nascondi");
    btnNascondi.setAttribute("onclick", "visibilitaTabella()");
    btnSvuota.setAttribute("id", "btn-svuota");
    btnSvuota.setAttribute("onclick", "svuotaTabella()");
    //collego elementi
    btnNascondi.append(txtNascondi);
    btnSvuota.append(txtSvuota);
    contBtn.append(btnNascondi, btnSvuota);
    document.getElementById("crea-tabella").after(contBtn);
}

function visibilitaTabella(){
    /*elimina dal dom la tabella e la reinserisce se cliccato nuovamente
    usando CSS*/
    let tab = document.getElementById("tabella");
    if(tab.style.display == "none"){
        tab.style.display = "block";
    }else {
        tab.style.display = "none";
    }

}

function svuotaTabella(){
    /*sostituisce il contenuto delle celle con */
    let empty = document.createTextNode("❐");
    let celle = document.getElementsByTagName("td");
    //console.log(celle);
    for(let i = 0; i< celle.length; i++){
        if(celle[i].innerText != "Intestazione Colonna " + i){
            celle[i].innerText = "❐";
        }
    }
    //document.getElementById("btn-svuota").disabled = true;
}