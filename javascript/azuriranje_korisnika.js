var url = "https://web-dizajn-d1716-default-rtdb.europe-west1.firebasedatabase.app";
var sviKorisnici = [];
var korisniciId = [];
var korisnici = {};
document.addEventListener("DOMContentLoaded", ucitajIzBazeKorisnike);
function ucitajIzBazeKorisnike() {
    var zahtev = new XMLHttpRequest();

    zahtev.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                obrisiTabelu();
                korisnici = JSON.parse(zahtev.responseText);
                for (var id in korisnici) {
                    var korisnik = korisnici[id];
                    korisniciId.push(id);
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
function obrisiTabelu() {
    let tabela = document.getElementsByClassName("responsive-tabel")[0];
    if(tabela!= undefined){
        tabela.parentNode.removeChild(tabela);
    }
    
}
function popuniTabeluAgencijama(){
    var main = document.getElementsByTagName("main")[0];
    var div = document.createElement("div");
    div.className = "responsive-tabel";
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
        var dugme1 = napraviDugmeZaIzmenu(korisniciId[id]);
        var dugme2 = napraviDugmeZaBrisanje(korisniciId[id]);
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
    main.appendChild(div);
}
function napraviDugmeZaIzmenu(korisnikId) {
    let dugme = document.createElement("button");
    dugme.type = "button";
    dugme.className = "green";
    dugme.setAttribute("data-bs-toggle","modal");
    dugme.setAttribute("data-bs-target","#registracija");
    let i = document.createElement("i");
    i.className = "bi bi-person-fill-gear";
    dugme.append(i);
    dugme.addEventListener("click",function(){
        postaviParametarIzmena(korisnikId);
        promeniNaziv("Ažurirajte podatke o korisniku", "registracijaLabel");
    });
    return dugme;
}
function napraviDugmeZaBrisanje(korisnikId) {
    let dugme = document.createElement("button");
    dugme.type = "button";
    dugme.className = "red";
    dugme.setAttribute("data-bs-toggle","modal");
    dugme.setAttribute("data-bs-target","#potvrda");
    let i = document.createElement("i");
    i.className = "bi bi-person-fill-x";
    dugme.append(i);
    dugme.addEventListener("click",function(){
        postaviParametar(korisnikId);
    });
    return dugme;
}


function postaviParametar(korisnikId) {
    let potvrda = document.getElementById("potvrdaBrisanje");
    potvrda.addEventListener("click", function(){
        obrisiKorisnika(korisnikId);
    });
}
function nadjiKorisnikovID(korisnikId) {
    for(let index in sviKorisnici){
        if(korisniciId[index] === korisnikId){
            return index;
        }
    }
}
function postaviParametarIzmena(id){
    let korisnikId = nadjiKorisnikovID(id);
    
    let ime = document.getElementById("ime");
    ime.value = sviKorisnici[korisnikId].ime;
    let prezime = document.getElementById("prezime");
    prezime.value = sviKorisnici[korisnikId].prezime;
    let korisnickoIme = document.getElementById("korIme");
    korisnickoIme.value = sviKorisnici[korisnikId].korisnickoIme;
    let sifra = document.getElementById("sifra");
    sifra.value = sviKorisnici[korisnikId].lozinka;
    let mejl = document.getElementById("mejl");
    mejl.value = sviKorisnici[korisnikId].email;
    let adresa = document.getElementById("adresa");
    let grad = document.getElementById("grad");
    grad.value = sviKorisnici[korisnikId].adresa.split(",")[1] +" "+ sviKorisnici[korisnikId].adresa.split(",")[2]
    adresa.value = sviKorisnici[korisnikId].adresa.split(", ")[0];
    let brojTelefona = document.getElementById("telefon");
    brojTelefona.value = sviKorisnici[korisnikId].telefon;
    let rodjendan = document.getElementById("rodjendan");
    rodjendan.value = sviKorisnici[korisnikId].datumRodjenja;
    napraviDugmeZaPotvrdu();
    let potvrda = document.getElementById("potvrdaRegAzu");
    potvrda.addEventListener("click", function(){
        azurirajKorisnika(id);
    });
}
function napraviDugmeZaPotvrdu() {
    let potvrda = document.getElementById("potvrdaRegAzu");
    potvrda.remove();

    let dugme = document.createElement("button");
    dugme.type = "submit";
    dugme.className = "btn btn-primary";
    dugme.id="potvrdaRegAzu";
    dugme.innerHTML = "Potvrdi";
    let main = document.getElementById("dugmiciOpcije");
    main.appendChild(dugme);
}
function azurirajKorisnika(id) {
    if(proveriValidnostRegistracije()){
        let ime = document.getElementById("ime").value;
        let prezime = document.getElementById("prezime").value;
        let korisnickoIme = document.getElementById("korIme").value;
        let sifra = document.getElementById("sifra").value;
        let mejl = document.getElementById("mejl").value;
        let adresa = document.getElementById("adresa").value;
        let grad = document.getElementById("grad").value;
        let brojTelefona = document.getElementById("telefon").value;
        let rodjendan = document.getElementById("rodjendan").value;
        let gradUString = grad.replace(/(\d)/, ",$1");
        let adresaStanovanja = adresa+", "+gradUString;
        console.log(adresaStanovanja);
        var korisnik ={
            adresa: adresaStanovanja,
            datumRodjenja: rodjendan,
            email: mejl,
            ime: ime,
            korisnickoIme: korisnickoIme,
            lozinka: sifra,
            prezime: prezime,
            telefon: brojTelefona
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
        zahtev.open("PUT", url + "/korisnici/"+id + ".json");
        zahtev.send(JSON.stringify(korisnik));
    }
}


function obrisiKorisnika(id) {
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

    zahtev.open("DELETE", url + "/korisnici/" + id + ".json");
    zahtev.send();
}