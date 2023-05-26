var url = "https://web-dizajn-d1716-default-rtdb.europe-west1.firebasedatabase.app";
var sviKorisnici = [];
var korisnici = {};
document.addEventListener("DOMContentLoaded", ucitajIzBazeKorisnike);
function ucitajIzBazeKorisnike() {
    var zahtev = new XMLHttpRequest();

    zahtev.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                korisnici = JSON.parse(zahtev.responseText);
                for (var id in korisnici) {
                    var korisnik = korisnici[id];
                    console.log(korisnik);
                    sviKorisnici.push(korisnik);
                }
                popuniTabeluAgencijama();
            } else {
                window.open("../stranice_glavne/greska.html", "_self");
            }
        }
    }

    zahtev.open('GET', url + '/korisnici/' + '.json');
    zahtev.send();
}
function popuniTabeluAgencijama(){
    var div = document.getElementsByClassName("responsive-tabel")[0];
    var tabela = document.createElement("table");
    var red = document.createElement("tr");
    var ime = document.createElement("th");
    ime.innerHTML = "Ime";
    var prezime = document.createElement("th");
    prezime.innerHTML = "Prezime";
    var korisnickoIme = document.createElement("th");
    korisnickoIme.innerHTML = "Korisnicko ime";
    var lozinka = document.createElement("th");
    lozinka.innerHTML = "Lozinka";
    var telefon = document.createElement("th");
    telefon.innerHTML = "Broj telefona";
    var mejl = document.createElement("th");
    mejl.innerHTML = "Email";
    var adresa = document.createElement("th");
    adresa.innerHTML = "Adresa";
    var rodjendan = document.createElement("th");
    rodjendan.innerHTML = "Datum rođenja";
    var opcije = document.createElement("th");
    opcije.innerHTML = "Opcije";

    red.appendChild(ime);
    red.appendChild(prezime);
    red.appendChild(lozinka);
    red.appendChild(telefon);
    red.appendChild(mejl);
    red.appendChild(adresa);
    red.appendChild(rodjendan);
    red.appendChild(opcije);
    tabela.appendChild(red);

    var telo = document.createElement("tbody");

    for(var id in sviKorisnici){
        var red = document.createElement("tr");
        var ime = document.createElement("td");
        ime.innerHTML = sviKorisnici[id].ime;
        var prezime = document.createElement("td");
        prezime.innerHTML = sviKorisnici[id].prezime;
        var korisnickoIme = document.createElement("td");
        korisnickoIme.innerHTML = sviKorisnici[id].korisnickoIme;
        var lozinka = document.createElement("td");
        lozinka.innerHTML = sviKorisnici[id].lozinka;
        var telefon = document.createElement("td");
        telefon.innerHTML = sviKorisnici[id].telefon;
        var mejl = document.createElement("td");
        mejl.innerHTML = sviKorisnici[id].email;
        var adresa = document.createElement("td");
        adresa.innerHTML = sviKorisnici[id].adresa;
        var rodjendan = document.createElement("td");
        rodjendan.innerHTML = sviKorisnici[id].datumRodjenja;
        var opcije = document.createElement("td");
        var dugme1 = napraviDugmeZaIzmenu();
        var dugme2 = napraviDugmeZaBrisanje();
        opcije.appendChild(dugme1);
        opcije.appendChild(dugme2);
        red.appendChild(ime);
        red.appendChild(prezime);
        red.appendChild(lozinka);
        red.appendChild(telefon);
        red.appendChild(mejl);
        red.appendChild(adresa);
        red.appendChild(rodjendan);
        red.appendChild(opcije);
        telo.appendChild(red);
        
    }
    tabela.appendChild(telo);
    div.appendChild(tabela);
}
function napraviDugmeZaIzmenu() {
    let dugme = document.createElement("button");
    dugme.type = "button";
    dugme.className = "green";
    dugme.setAttribute("data-bs-toggle","modal");
    dugme.setAttribute("data-bs-target","#registracija");
    let i = document.createElement("i");
    i.className = "bi bi-person-fill-gear";
    dugme.append(i);
    return dugme;
}
function napraviDugmeZaBrisanje() {
    let dugme = document.createElement("button");
    dugme.type = "button";
    dugme.className = "red";
    dugme.setAttribute("data-bs-toggle","modal");
    dugme.setAttribute("data-bs-target","#potvrda");
    let i = document.createElement("i");
    i.className = "bi bi-person-fill-x";
    dugme.append(i);
    return dugme;
}