function avvio(){
    /**crea gli oggetti iniziali della pagina */
    //form
    const frm = document.createElement("form");
    frm.setAttribute("name", "tbl");
    frm.setAttribute("id", "tbl");
    frm.setAttribute("onsubmit", "return false")
    /***********************stratagemma per bloccar e il submit********************************
    //il form fa comunque un submit anche se non c'è button submit, se non devo mandare al
    //server posso bloccare con return false.
    //se dovessi validare i dati potrei fare sul "onsubmit" una funzione che torna bool
    ******************************************************************************************/

    //fieldset
    const fs = document.createElement("fieldset");
    frm.appendChild(fs);
    //legend
    const lgn = document.createElement("legend");
    lgn.append(document.createTextNode("Type"));
    fs.appendChild(lgn);
    //label input
    const lbl = document.createElement("label");
    lbl.setAttribute("for", "sel-op");
    lbl.append(document.createTextNode("Select one option to create a table"));
    lgn.after(lbl);
    //input select 
    const sel = document.createElement("select");
    sel.setAttribute("id", "sel-op");
    sel.setAttribute("name", "operation");
    sel.addEventListener("change", getSelection = function () {
        completeForm(this.value);
    });
    lbl.after(sel);
    // options
    const options = ["null", "Selct data insertion mode",
                     "matrix", "Matrix",
                     "csv", "Table from CSV",
                     "insert", "Insert data for Table"];

    for (let o = 0; o < options.length; o += 2 ){
        //console.log("value: ", options[o], "\ninnerText: ", options[o+1]);
        let op = document.createElement("option");
        op.setAttribute("value", options[o]);
        op.append(document.createTextNode(options[o+1]));
        sel.appendChild(op);
    }
    //bottone


    //inserisce nel DOM
    document.body.append(frm);
}

// function getSelection(){
//     /**recupera la selezione, genera il form per inserire i dati,
//      * genera il target per il risultato finale, chiama la funzione
//      * completeForm(selType)
//     */

//     /********diversi modi di recuperare il valore del select******************/
//     //console.log("document.tbl.operation.value ", document.tbl.operation.value);
//     console.log("this: ", this.value);
//     /*************************************************************************/
    
//     completeForm(this.value);
//     console.log(document.tbl);
// }


function completeForm(selType){
    /**inserisce gli elementi nel form a seconda del tipo selezionato*/

    switch (selType) {
        case "matrix":
            rowXcolMatrix();//ritorna oggetto html
            break;
        case "csv":
            getFile();
            break;
        case "insert":
            rowXcolIns();
            break;
    
        default:
            window.alert("Invalid Selection");
            break;
    }
}


function rowXcol(){
    /**comune a matrix e insert.
     * genera un oggetto con 2 input number e un button */
    //blocco di inserimento dati
    const rxc = document.createElement("fieldset");
    rxc.setAttribute("name", "rowxcol");

    const lgn = document.createElement("legend");
    lgn.append(document.createTextNode("Data Insertion"));
    //inserire righe
    const lblR = document.createElement("label");
    lblR.setAttribute("for", "in-row");
    lblR.append(document.createTextNode("ROW"));
    const inRow = document.createElement("input");
    inRow.setAttribute("id", "in-row");
    inRow.setAttribute("name", "inrow");
    inRow.setAttribute("type", "number");
    inRow.setAttribute("min", "1");
    inRow.setAttribute("max", "100");
    inRow.setAttribute("maxlength", "3");
    //inserire colonne
    const lblC = document.createElement("label");
    lblC.setAttribute("for", "in-col");
    lblC.append(document.createTextNode("COL"));
    const inCol = document.createElement("input");
    inCol.setAttribute("id", "in-col");
    inCol.setAttribute("name", "incol");
    inCol.setAttribute("type", "number");
    inCol.setAttribute("min", "1");
    inCol.setAttribute("max", "100");inRow.setAttribute("value", "3");
    inCol.setAttribute("maxlength", "3");
    //manda input righe colonne
    const btn = document.createElement("button");
    btn.setAttribute("name", "givemedata");
    btn.setAttribute("id", "btn-rxc");
    btn.append(document.createTextNode("☑"));
    //bottone crea matrice
    const btnGo = document.createElement("button");
    btnGo.appendChild(document.createTextNode("ShoW"));
    btnGo.setAttribute("id", "btn_show");
    btnGo.addEventListener("click", showTable);
    //bottone esporta
    const btnTake = document.createElement("button");
    btnTake.appendChild(document.createTextNode("Export"));
    btnTake.setAttribute("id", "btn_export");
    btnTake.addEventListener("click", takeOutTable);
    
    //creo alberello 
    rxc.append(lgn, lblR, inRow, lblC, inCol, btn, btnGo, btnTake);
    //appende al dom
    document.tbl.appendChild(rxc);
    /**************************************************************
     * JUST FOR DEBUG
     *************************************************************/
    inRow.setAttribute("value", "3");
    inCol.setAttribute("value", "3");
}

function rowXcolMatrix(){
    /**aggiunge event listener sul bottone givemedata
     * e bottoni extra per le matrici
     */
    rowXcol();
    const btn = document.tbl.givemedata;
    btn.addEventListener("click", inputMatrix);
    //botton matrice zeri
    const btn0 = document.createElement("button");
    btn0.appendChild(document.createTextNode("0"));
    btn0.setAttribute("id", "0matrix");
    btn0.addEventListener("click", zeroMatrix);
    //bottone matrice uni
    const btn1 = document.createElement("button");
    btn1.appendChild(document.createTextNode("1"));
    btn1.setAttribute("id", "1matrix");
    btn1.addEventListener("click", unoMatrix);

}

function rowXcolIns(){
    /**aggiunge event listener sul bottone givemedata */
    const fs = rowXcol();
    const btn = fs.children.givemedata;
    btn.addEventListener("onclick", inputIns);
    //creare bottoni 

}


function inputMatrix(){
    /**recupera # righe e # col 
     * genera campi di inserimento num per ogni elemento della matrice
     * genra bottone crea per visualizzare nella pagina la matrice 
     * genera i botoni 1 (per matrici unarie) 0 (per matrici di zeri)
     * genra bottone esporta che crea csv */
    
    if(! document.getElementById("in-tab")) document.tbl.givemedata.after(createTableInput(document.tbl.inrow.value, document.tbl.incol.value));


}

function inputIns(){
    /** recupera # righe e # col 
     * genera campi di inserimento num per ogni elemento della matrice
     * con una riga e una colonna in più per header (se si lasciano vuoti non compaiono nel result)
     * genra bottone crea per visualizzare nella pagina la matrice */
    console.log(document.tbl.inrow.value, document.tbl.incol.value);
    createTableInput(document.tbl.inrow.value, document.tbl.incol.value, true);
}

function getFile(){
    /**inserisce il campo input file */
    
}

function createTableInput(row, col, head=false){
    /**crea una tabella con tanti textarea quanti indicati in rowxcol
     * se head == true crea una riga e una colonna in più per le intestazioni */
    const tabIn = document.createElement("table");
    tabIn.setAttribute("id", "in-tab")

    if (head) {
        row++;
        col++;
    }

    for (let i = 0; i < row; i++){
        let r = document.createElement("tr");
        //modifico id per header così poi posso creare elemento thead
        if(head && i == 0){
            r.setAttribute("id", "h_row_"+i);
        }else r.setAttribute("id", "row_"+i);
        tabIn.appendChild(r);
        for(let j = 0; j < col; j++){
            let c = document.createElement("td");
            //cambio id per gli header così si trovano 
            if(head && (i == 0 || j == 0)) c.setAttribute("id", "h_cell_"+i+'_'+j);
            else c.setAttribute("id", "cell_"+i+'_'+j);

            let ta = document.createElement("textarea");
            ta.setAttribute("row", "2");
            ta.setAttribute("col", "2");
            ta.setAttribute("name", "cell_"+i+"_"+j);
            ta.setAttribute("id", "c"+i+j);
            c.appendChild(ta);
            r.appendChild(c);
        }
    }

    return tabIn;
}

function showTable(){
    /**dai dati inseriti mostra tabella */

    let result = document.createElement("table");
    let inTab = document.getElementById("in-tab");
    //recupero la collezione (array) di righe
    let rowColl = inTab.children;

    for (let i = 0; i < rowColl.length; i++){
        console.log(rowColl[i].id);
        
        //collezione (array) di celle
        let dataColl =  rowColl[i].cells
        for(let j = 0; j < dataColl.length; j++){
            console.log(dataColl[j].id);

        }
    }
}

function takeOutTable(){
    /** */
    console.log(this);
}

function zeroMatrix(){
    console.log(this);
}

function unoMatrix(){
    console.log(this);
}