var url = "https://web-dizajn-d1716-default-rtdb.europe-west1.firebasedatabase.app";
var sveAgencije = [];
var agencije = {};

document.addEventListener("DOMContentLoaded", ucitajIzBazeAgencije);
function ucitajIzBazeAgencije() {
    var zahtev = new XMLHttpRequest();

    zahtev.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                obrisiTabelu();
                agencije = JSON.parse(zahtev.responseText);
                for (var id in agencije) {
                    var agencija = agencije[id];
                    sveAgencije.push(agencija);
                }
                popunitiTabelu();
            } else {
                window.open("../stranice_glavne/greska.html", "_self");
            }
        }
    }

    zahtev.open('GET', url + '/agencije/' + '.json');
    zahtev.send();
}


function popunitiTabelu() {
    for(var id in sveAgencije){
        ucitajIzBazeDestinacije(sveAgencije[id].destinacije, sveAgencije[id].naziv);
    }
}

function ucitajIzBazeDestinacije(naziv, naziv_agencije) {
    var zahtev = new XMLHttpRequest();
    
    zahtev.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var destinacijeAgencije = [];
                var destinacijeAgencijeId = [];
                trenutnaDestinacija = JSON.parse(zahtev.responseText);
                for(var id in trenutnaDestinacija){
                    destinacijeAgencije.push(trenutnaDestinacija[id]);
                    destinacijeAgencijeId.push(id);
                }
                popuniTabeluDestinacijama(naziv_agencije,destinacijeAgencije, naziv,destinacijeAgencijeId)
            } else {
                window.open("../stranice_glavne/greska.html", "_self");
            }
        }
    }

    zahtev.open('GET', url + '/destinacije/'+naziv+ '.json');
    zahtev.send();
}
function popuniTabeluDestinacijama(agencija_naziv,destinacijeAgencije, grupa,destinacijeAgencijeId){
    var main = document.getElementsByTagName("main")[0];
    var div = document.createElement("div");
    div.className = "responsive-tabel";
    var h2 = document.createElement("h2");
    h2.innerHTML = agencija_naziv;
    main.appendChild(h2);
    var lab = document.createElement("label");
    lab.innerHTML = "Dodaj novu destinaciju"
    var dugme_dodaj  = napraviDugmeZaDodavanje(grupa);
    main.appendChild(lab);
    main.appendChild(dugme_dodaj);



    var tabela = document.createElement("table");
    var red = document.createElement("tr");
    var naziv = document.createElement("th");
    naziv.innerHTML = "Naziv";
    var tip = document.createElement("th");
    tip.innerHTML = "Tip odmora";
    var prevoz = document.createElement("th");
    prevoz.innerHTML = "Vrsta prevoza";
    var cena = document.createElement("th");
    cena.innerHTML = "Cena";
    var maxOsoba = document.createElement("th");
    maxOsoba.innerHTML = "Maksimalan broj osoba";
    var opis = document.createElement("th");
    opis.innerHTML = "Opis";
    var slike = document.createElement("th");
    slike.innerHTML = "Slike";
    var opcije = document.createElement("th");
    opcije.innerHTML = "Opcije";
    red.appendChild(naziv);
    red.appendChild(tip);
    red.appendChild(prevoz);
    red.appendChild(cena);
    red.appendChild(maxOsoba);
    red.appendChild(opis);
    red.appendChild(slike);
    red.appendChild(opcije);
    tabela.appendChild(red);

    if(grupa!=[]){
        var telo = document.createElement("tbody");

        for(var id in destinacijeAgencije){
            var red = document.createElement("tr");
            var naziv = document.createElement("td");
            naziv.innerHTML = destinacijeAgencije[id].naziv;
            var tip = document.createElement("td");
            tip.innerHTML = destinacijeAgencije[id].tip;
            var prevoz = document.createElement("td");
            prevoz.innerHTML = destinacijeAgencije[id].prevoz;
            var cena = document.createElement("td");
            cena.innerHTML = destinacijeAgencije[id].cena + " dinara";
            var maxOsoba = document.createElement("td");
            maxOsoba.innerHTML = destinacijeAgencije[id].maxOsoba;
            var opis = document.createElement("td");
            opis.innerHTML = destinacijeAgencije[id].opis;
            var slike = document.createElement("td");
            var lista = document.createElement("ol");
            for(var indeks in destinacijeAgencije[id].slike){
                var stavka = document.createElement("li");
                stavka.innerHTML = destinacijeAgencije[id].slike[indeks];
                lista.appendChild(stavka);
            }
            slike.appendChild(lista);
            var opcije = document.createElement("td");
            var dugme1 = napraviDugmeZaIzmenu(grupa+"/"+destinacijeAgencijeId[id]);
            var dugme2 = napraviDugmeZaBrisanje(grupa+"/"+destinacijeAgencijeId[id]);
            opcije.appendChild(dugme1);
            opcije.appendChild(dugme2);
            red.appendChild(naziv);
            red.appendChild(tip);
            red.appendChild(prevoz);
            red.appendChild(cena);
            red.appendChild(maxOsoba);
            red.appendChild(opis);
            red.appendChild(slike);
            red.appendChild(opcije);
            telo.appendChild(red);
            
        }
        tabela.appendChild(telo);
    }
    div.appendChild(tabela);
    main.appendChild(div);

}

function napraviDugmeZaIzmenu(id) {
    let dugme = document.createElement("button");
    dugme.type = "button";
    dugme.className = "green";
    dugme.setAttribute("data-bs-toggle","modal");
    dugme.setAttribute("data-bs-target","#prikazi_destinaciju");
    let i = document.createElement("i");
    i.className = "bi bi-database-fill-gear";
    dugme.append(i);
    dugme.addEventListener("click",function(){
        ucitajIzBazeDestinaciju(id);
        promeniNaziv("Ažurirajte podatke o destinaciji", "prikazi_destinacijuLabel");
    });
    return dugme;
}
function napraviDugmeZaBrisanje(grupa) {
    let dugme = document.createElement("button");
    dugme.type = "button";
    dugme.className = "red";
    dugme.setAttribute("data-bs-toggle","modal");
    dugme.setAttribute("data-bs-target","#potvrda");
    let i = document.createElement("i");
    i.className = "bi bi-database-fill-x";
    dugme.append(i);
    dugme.addEventListener("click", function(){
        postaviParametar(grupa);
    });
    return dugme;
}

function napraviDugmeZaDodavanje(grupa) {
    let dugme = document.createElement("button");
    dugme.type = "button";
    dugme.className = "dodaj";
    dugme.setAttribute("data-bs-toggle","modal");
    dugme.setAttribute("data-bs-target","#prikazi_destinaciju");
    let i = document.createElement("i");
    i.className = "bi bi-database-fill-add";
    dugme.append(i);
    dugme.addEventListener("click", function(){
        postaviParametarZaDodavanje(grupa);
    });
    return dugme;
}

function obrisiTabelu() {
    let tabela = document.getElementsByClassName("responsive-tabel")[0];
    if(tabela!= undefined){
        tabela.parentNode.removeChild(tabela);
    }
}

function postaviParametar(destinacijaId) {
    let potvrda = document.getElementById("potvrdaBrisanje");
    potvrda.addEventListener("click", function(){
        obrisiDestinaciju(destinacijaId);
    });
}
function obrisiDestinaciju(id) {
    let zahtev = new XMLHttpRequest();

    zahtev.onreadystatechange = function () {
        if (this.readyState == 4) {
        if (this.status == 200) {
            window.location.reload();
        } else {
            window.open("../stranice_glavne/greska.html", "_self");
        }
        }
    };

    zahtev.open("DELETE", url + "/destinacije/" + id + ".json");
    zahtev.send();
}
function postaviParametarZaDodavanje(grupa) {
    let potvrda = document.getElementById("potvrdaDestinacije");
    potvrda.addEventListener("click", function(){
        dodajDestinaciju(grupa);
    });
}  
/*
    Funkcija za dodavanje destinacije agenciji
 */
function dodajDestinaciju(grupaDestinacija) {
    if(validacijaDestinacija()){
        let naziv = document.getElementById("naziv").value;
        let cena = document.getElementById("cena").value;
        let prevoz = document.getElementById("prevoz").value;
        let maxOsoba = document.getElementById("maxOsoba").value;
        let opis = document.getElementById("opis").value;
        let slika = document.getElementsByClassName("slika")[0].value;
        let slikaLista = []
        slikaLista.push(slika);
        let tip = document.getElementById("tip").value;
        var destinacija ={
            cena:cena,
            maxOsoba: maxOsoba,
            naziv:naziv,
            opis:opis,
            prevoz:prevoz,
            slike:slikaLista,
            tip: tip
        }
    
        let zahtev = new XMLHttpRequest();
        zahtev.onreadystatechange = function (e) {
            if (this.readyState == 4) {
                if (this.status == 200) {
                window.location.reload();
                } else {
                window.open("../stranice_glavne/greska.html", "_self");
                }
            }
            };
        let urlDestinacije = grupaDestinacija;
        if(urlDestinacije === ""){
            zahtev.open("POST", url + "/destinacije/" + ".json");
            zahtev.send(JSON.stringify(destinacija));
        }
        else{
            zahtev.open("POST", url + "/destinacije/"+ urlDestinacije + ".json");
            zahtev.send(JSON.stringify(destinacija));
        }
    }
}
let destinacija = {}
function ucitajIzBazeDestinaciju(destinacijaId) {
    var zahtev = new XMLHttpRequest();
    
    zahtev.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                destinacija = JSON.parse(zahtev.responseText);
                postaviParametarIzmena(destinacijaId)
                
            } else {
                window.open("../stranice_glavne/greska.html", "_self");
            }
        }
    }

    zahtev.open('GET', url + '/destinacije/'+destinacijaId+ '.json');
    zahtev.send();
}

function postaviParametarIzmena(destinacijaId) {
    var konkretnaDestinacija = destinacija;

    let naziv = document.getElementById("naziv");
    naziv.value = konkretnaDestinacija.naziv;
    let cena = document.getElementById("cena");
    cena.value = konkretnaDestinacija.cena;
    let prevoz = document.getElementById("prevoz");
    prevoz.value  =konkretnaDestinacija.prevoz;
    let maxOsoba = document.getElementById("maxOsoba");
    maxOsoba.value = konkretnaDestinacija.maxOsoba;
    let opis = document.getElementById("opis");
    opis.value = konkretnaDestinacija.opis
    let zaBrisanje = document.getElementsByClassName("slika");
    zaBrisanje[0].remove();
    let slika = konkretnaDestinacija.slike
    for(let index in slika){
        let div = document.getElementById("slike");
        let unos = document.createElement("input");
        unos.type = "url";
        unos.className = "form-control slika";
        unos.placeholder = "Unesite url slike destinacije";
        unos.value = slika[index];
        unos.style.display="block"
        div.appendChild(unos);
    }
    let tip = document.getElementById("tip");
    tip.value = konkretnaDestinacija.tip;
    napraviDugmeZaPotvrdu();
    let potvrda = document.getElementById("potvrdaDestinacije");
    potvrda.addEventListener("click", function(){
        azurirajDestinaciju(destinacijaId);
    });
}
function napraviDugmeZaPotvrdu() {
    let potvrda = document.getElementById("potvrdaDestinacije");
    potvrda.remove();

    let dugme = document.createElement("button");
    dugme.type = "button";
    dugme.className = "btn btn-primary";
    dugme.id="potvrdaDestinacije";
    dugme.innerHTML = "Potvrdi";
    let main = document.getElementById("dugmiciOpcije");
    main.appendChild(dugme);
}
/*
    Funkcija za ažuriranje agencije
 */
function azurirajDestinaciju(id) {
    if(validacijaDestinacija()){
        let naziv = document.getElementById("naziv").value;
        let cena = document.getElementById("cena").value;
        let prevoz = document.getElementById("prevoz").value;
        let maxOsoba = document.getElementById("maxOsoba").value;
        let opis = document.getElementById("opis").value;
        let slika = document.getElementsByClassName("slika");
        let slikaLista = [];
        for(let i in slika){
            if(slika[i].value !== ""){
                slikaLista.push(slika[i].value)
            }
        }
        
        let tip = document.getElementById("tip").value;
        var destinacija ={
            cena:cena,
            maxOsoba: maxOsoba,
            naziv:naziv,
            opis:opis,
            prevoz:prevoz,
            slike:slikaLista,
            tip: tip
        }
        let zahtev = new XMLHttpRequest();
        zahtev.onreadystatechange = function (e) {
            if (this.readyState == 4) {
                if (this.status == 200) {
                window.location.reload();
                } else {
                window.open("../stranice_glavne/greska.html", "_self");
                }
            }
            };
        zahtev.open("PUT", url + "/destinacije/"+id + ".json");
        zahtev.send(JSON.stringify(destinacija));
    }
    
}

function validacijaDestinacija() {
    let ispravno = true
    let naziv = document.getElementById("naziv").value;
    if(naziv === ""){
        ispravno = false;
        let postavi = document.getElementById("destinacijaNaziv");
        postavi.innerText = "Niste uneli validan podatak";
        postavi.style.color = "red";
        postavi.style.fontSize = "1.5vh";
        postavi = document.getElementById("naziv");
        postavi.style.borderColor = "red";
    }
    else{
        let postavi = document.getElementById("destinacijaNaziv");
        postavi.innerText = "Validan podatak";
        postavi.style.color = "green";
        postavi.style.fontSize = "1.5vh";
        postavi = document.getElementById("naziv");
        postavi.style.borderColor = "green";
    }
    let cena = document.getElementById("cena").value;
    if(cena === ""){
        ispravno = false;
        let postavi = document.getElementById("destinacijaCena");
        postavi.innerText = "Niste uneli validan podatak";
        postavi.style.color = "red";
        postavi.style.fontSize = "1.5vh";
        postavi = document.getElementById("cena");
        postavi.style.borderColor = "red";
    }
    else{
        let postavi = document.getElementById("destinacijaCena");
        postavi.innerText = "Validan podatak";
        postavi.style.color = "green";
        postavi.style.fontSize = "1.5vh";
        postavi = document.getElementById("cena");
        postavi.style.borderColor = "green";
    }
    let prevoz = document.getElementById("prevoz").value;
    if(prevoz === ""){
        ispravno = false;
        let postavi = document.getElementById("destinacijaPrevoz");
        postavi.innerText = "Niste uneli validan podatak";
        postavi.style.color = "red";
        postavi.style.fontSize = "1.5vh";
        postavi = document.getElementById("prevoz");
        postavi.style.borderColor = "red";
    }
    else{
        let postavi = document.getElementById("destinacijaPrevoz");
        postavi.innerText = "Validan podatak";
        postavi.style.color = "green";
        postavi.style.fontSize = "1.5vh";
        postavi = document.getElementById("prevoz");
        postavi.style.borderColor = "green";
    }
    let maxOsoba = document.getElementById("maxOsoba").value;
    if(maxOsoba === ""){
        ispravno = false;
        let postavi = document.getElementById("destinacijaMaxOsoba");
        postavi.innerText = "Niste uneli validan podatak";
        postavi.style.color = "red";
        postavi.style.fontSize = "1.5vh";
        postavi = document.getElementById("maxOsoba");
        postavi.style.borderColor = "red";
    }
    else{
        let postavi = document.getElementById("destinacijaMaxOsoba");
        postavi.innerText = "Validan podatak";
        postavi.style.color = "green";
        postavi.style.fontSize = "1.5vh";
        postavi = document.getElementById("maxOsoba");
        postavi.style.borderColor = "green";
    }
    let opis = document.getElementById("opis").value;
    if(opis === ""){
        ispravno = false;
        let postavi = document.getElementById("destinacijaOpis");
        postavi.innerText = "Niste uneli validan podatak";
        postavi.style.color = "red";
        postavi.style.fontSize = "1.5vh";
        postavi = document.getElementById("opis");
        postavi.style.borderColor = "red";
    }
    else{
        let postavi = document.getElementById("destinacijaOpis");
        postavi.innerText = "Validan podatak";
        postavi.style.color = "green";
        postavi.style.fontSize = "1.5vh";
        postavi = document.getElementById("opis");
        postavi.style.borderColor = "green";
    }
    let slika = document.getElementsByClassName("slika");
    if(slika[0].value === ""){
        ispravno = false;
        let postavi = document.getElementById("destinacijaSlike");
        postavi.innerText = "Niste uneli validan podatak";
        postavi.style.color = "red";
        postavi.style.fontSize = "1.5vh";
        postavi = document.getElementsByClassName("slika")[0];
        postavi.style.borderColor = "red";
    }
    else{
        let postavi = document.getElementById("destinacijaSlike");
        postavi.innerText = "Validan podatak";
        postavi.style.color = "green";
        postavi.style.fontSize = "1.5vh";
        postavi = document.getElementsByClassName("slika")[0];
        postavi.style.borderColor = "green";
    }
    let tip = document.getElementById("tip").value;
    if(tip === ""){
        ispravno = false;
        let postavi = document.getElementById("destinacijaTip");
        postavi.innerText = "Niste uneli validan podatak";
        postavi.style.color = "red";
        postavi.style.fontSize = "1.5vh";
        postavi = document.getElementById("tip");
        postavi.style.borderColor = "red";
    }
    else{
        let postavi = document.getElementById("destinacijaTip");
        postavi.innerText = "Validan podatak";
        postavi.style.color = "green";
        postavi.style.fontSize = "1.5vh";
        postavi = document.getElementById("tip");
        postavi.style.borderColor = "green";
    }

    return ispravno
}