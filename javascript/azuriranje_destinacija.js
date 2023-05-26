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
    var dugme_dodaj  = napraviDugmeZaDodavanje(naziv);
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
    div.appendChild(tabela);
    main.appendChild(div);
}

function napraviDugmeZaIzmenu(grupa) {
    let dugme = document.createElement("button");
    dugme.type = "button";
    dugme.className = "green";
    dugme.setAttribute("data-bs-toggle","modal");
    dugme.setAttribute("data-bs-target","#prikazi_destinaciju");
    let i = document.createElement("i");
    i.className = "bi bi-database-fill-gear";
    dugme.append(i);
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
    return dugme;
}

function obrisiTabelu() {
    let tabela = document.getElementsByClassName("responsive-tabel")[0];
    if(tabela!= undefined){
        tabela.parentNode.removeChild(tabela);
    }
}

function postaviParametar(destinacijaId) {
    let potvrda = document.getElementById("potvrda");
    potvrda.addEventListener("click", function(){
        obrisiDestinaciju(destinacijaId);
    });
}
function obrisiDestinaciju(id) {
    let zahtev = new XMLHttpRequest();

    zahtev.onreadystatechange = function () {
        if (this.readyState == 4) {
        if (this.status == 200) {
            window.open("../stranice_glavne/azuriranje_destinacija.html", "_self");
        } else {
            window.open("../stranice_glavne/greska.html", "_self");
        }
        }
    };

    zahtev.open("DELETE", url + "/destinacije/" + id + ".json");
    zahtev.send();
}
