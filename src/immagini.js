    
    function avvio(){
        /*generazione elementi della pagina, chiamate delle funzioni principali*/
        //genera elementi
        let main = document.createElement("main");
        let lbl = document.createElement("label");
        let inputFile = document.createElement("input");
        let listContainer = document.createElement("section");
        let list = document.createElement("ul");

        //collega gli elementi 
        //console.log(title, lbl, inputFile, listContainer, list);
        document.body.appendChild(main);
        main.appendChild(lbl);
        lbl.after(inputFile, listContainer, list);
        inputFile.insertAdjacentHTML("afterend",'<br>');

        //completo gli elementi 
        main.id = "principale";
        
        lbl.for = "in-file";
        lbl.innerHTML = "Inserisci i files";

        inputFile.id = "in-file";
        inputFile.type = "file";
        inputFile.multiple = true;
        inputFile.accept="image/*";


        //definisco l'event handler gestisciFile che è una funzione ma non devo
        //usare le parentesi per chiamarla, la sto solo collegando all'evento


        inputFile.addEventListener("change", gestisciFile)
        //addEventListner è un metodo degli oggetti html prende il nome dell'evento
        //come stringa e il secondo parametro è il nome della funzione (senza 
        //invocarla). La funzione è definita fuori da questo blocco di codice ma
        //poteva stare qui con la arrow function.

        listContainer.id = "trgt-lst";
        list.id = "lst";

    }

    function gestisciFile(event){

        /*chiamata all'affiorare dell'evento change dell'input file
        di default si porta con sè l'oggetto html che ha generato l'evento
        che può essere richiamato con la parola chiave this*/
/*        console.log("oggetto che ha innescato l'evento: ", this,
            "\ncon la dot notation posso accedere alle proprietà dell'oggetto, this.files:\n",
            this.files,
            "ottengo la lista dei files");

        //con la parola chiave 'event' è possibile chiamare l'evento che si
        //è verificato, da questo posso risalire all'oggetto input file (responsabile
        //dell'evento) con la dot notation event.taget. 
        console.log('passato dall\'evento', event.target);//mettendo un parametro qualsiasi si crea un alias per event

        // this si riferisce all'oggetto a cui è legato il listener;
        // event si riferisce all'evento che è affiorato e porta con se l'oggetto target che ha generato event
        let pic = document.createElement('img');
        document.body.lastElementChild.after(pic);
        pic.src = this.files[0].name; // questo non funziona perché non è possibile avere il percorso file nel sistema
        //proviamo tutte le proprietà per vedere se una può funzionare da src o contiene un path utile
        
        for(let p in this.files[0]){
            if(! pic.complete){
                //se l'immagine non è stata caricata complete è false 
                //se non colpete si cambia src
                console.log('provo: ', p, '\nvalue: ', this.files[0][p]);
                pic.src = this.files[0][p];
                pic.alt += this.files[0][p] +'\n';
            }
        }
        if(! pic.complete) window.alert("nessuna proprietà dell'oggetto files[0] può funzionare come src di img");
*/
        //creo l'lelemento che conterrà le immagini
        const trgtImg = document.createElement('div');
        trgtImg.id = 'trgt-img';
        document.body.lastElementChild.after(trgtImg);//inserisce il target dopo li'ultimo

        let selected = this.files;
        //console.log("files: ", selected, "\nFile: ", selected[0]);

        //ciclo tre i files caricati (multiple attr)
        for (let im = 0;im < selected.length; im++){
            //Per poter passare il file al source di img devo prima digerirlo (leggerlo) e trasformarlo in 
            //url binario
            let imgFile = new FileReader();
            //al caricamento del reader devo gestire il reader per assegnare a src
            //la stringa binaria con l'immagine. Devo farlo qui non posso separare le 
            //fz perché non ho modo di passare il parametro e tornarlo dall'handler
            imgFile.onload = inserisciFoto;
            console.log(selected[im], "tipo",typeof(selected[im]))
            imgFile.readAsDataURL(selected[im]);

        }

    }

    function inserisciFoto(){
        let foto = document.createElement('img');
        let readed = this.result;
        let clicca = document.createElement("a");
        console.log(clicca.attributes);
        for(at in clicca) console.log("attributi: ", clicca[at],'\n',at);
        foto.src = readed;
        foto.width= "200";
        document.getElementById('trgt-img').append(foto);
        //console.log(foto.attributes);
        //for(at in foto) console.log("attributi: ", foto[at],'\n',at);
    }
