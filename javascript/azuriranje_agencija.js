var url = "https://web-dizajn-d1716-default-rtdb.europe-west1.firebasedatabase.app";
var agencijeId = [];
var sveAgencije = [];
var agencije = {};
document.addEventListener("DOMContentLoaded", ucitajIzBazeAgencije);
function ucitajIzBazeAgencije() {
    var zahtev = new XMLHttpRequest();

    zahtev.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                agencije = JSON.parse(zahtev.responseText);
                for (var id in agencije) {
                    var agencija = agencije[id];
                    console.log(agencija);
                    sveAgencije.push(agencija);
                    agencijeId.push(id);
                }
                popuniTabeluAgencijama();
            } else {
                window.open("stranice_glavne/greska.html", "_self");
            }
        }
    }

    zahtev.open('GET', url + '/agencije/' + '.json');
    zahtev.send();
}
function popuniTabeluAgencijama(){
    var div = document.getElementsByClassName("responsive-tabel")[0];
    var tabela = document.createElement("table");
    var red = document.createElement("tr");
    var naziv = document.createElement("th");
    naziv.innerHTML = "Naziv";
    var adresa = document.createElement("th");
    adresa.innerHTML = "Adresa";
    var brojTelefona = document.createElement("th");
    brojTelefona.innerHTML = "Broj telefona";
    var mejl = document.createElement("th");
    mejl.innerHTML = "Email";
    var godina = document.createElement("th");
    godina.innerHTML = "Godina osnivanja";
    var opcije = document.createElement("th");
    opcije.innerHTML = "Opcije";
    red.appendChild(naziv);
    red.appendChild(adresa);
    red.appendChild(brojTelefona);
    red.appendChild(mejl);
    red.appendChild(godina);
    red.appendChild(opcije);
    tabela.appendChild(red);

    var telo = document.createElement("tbody");

    for(var id in sveAgencije){
        var red = document.createElement("tr");
        var naziv = document.createElement("td");
        naziv.innerHTML = sveAgencije[id].naziv;
        var adresa = document.createElement("td");
        adresa.innerHTML = sveAgencije[id].adresa;
        var brojTelefona = document.createElement("td");
        brojTelefona.innerHTML = sveAgencije[id].brojTelefona;
        var mejl = document.createElement("td");
        mejl.innerHTML = sveAgencije[id].email;
        var godina = document.createElement("td");
        godina.innerHTML = sveAgencije[id].godina;
        var opcije = document.createElement("td");
        var dugme1 = napraviDugmeZaIzmenu(sveAgencije[id].naziv);
        var dugme2 = napraviDugmeZaBrisanje(sveAgencije[id].naziv);
        opcije.appendChild(dugme1);
        opcije.appendChild(dugme2);
        red.appendChild(naziv);
        red.appendChild(adresa);
        red.appendChild(brojTelefona);
        red.appendChild(mejl);
        red.appendChild(godina);
        red.appendChild(opcije);
        telo.appendChild(red);
        
    }
    tabela.appendChild(telo);
    div.appendChild(tabela);
}
function napraviDugmeZaIzmenu(naziv) {
    let dugme = document.createElement("button");
    dugme.type = "button";
    dugme.className = "green";
    dugme.setAttribute("data-bs-toggle","modal");
    dugme.setAttribute("data-bs-target","#prikaz_agencija");
    let i = document.createElement("i");
    i.classList = "bi bi-database-fill-gear";
    dugme.append(i);
    return dugme;
}
function napraviDugmeZaBrisanje(naziv) {
    let dugme = document.createElement("button");
    dugme.type = "button";
    dugme.className = "red";
    dugme.setAttribute("data-bs-toggle","modal");
    dugme.setAttribute("data-bs-target","#potvrda");
    let i = document.createElement("i");
    i.classList = "bi bi-database-fill-x";
    dugme.append(i);
    return dugme;
}
function napraviDugmeZaDodavanje(params) {
    
}

