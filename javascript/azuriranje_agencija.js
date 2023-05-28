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
                obrisiTabelu();
                agencije = JSON.parse(zahtev.responseText);
                for (var id in agencije) {
                    var agencija = agencije[id];
                    sveAgencije.push(agencija);
                    agencijeId.push(id);
                }
                popuniTabeluAgencijama();
            } else {
                window.open("../stranice_glavne/greska.html", "_self");
            }
        }
    }

    zahtev.open('GET', url + '/agencije/' + '.json');
    zahtev.send();
}
function popuniTabeluAgencijama(){
    var main = document.getElementsByTagName("main")[0];
    var div = document.createElement("div");
    div.className = "responsive-tabel";
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
        var dugme1 = napraviDugmeZaIzmenu(agencijeId[id]);
        var dugme2 = napraviDugmeZaBrisanje(agencijeId[id]);
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
    main.appendChild(div);
}
function napraviDugmeZaIzmenu(id) {
    let dugme = document.createElement("button");
    dugme.type = "button";
    dugme.className = "green";
    dugme.setAttribute("data-bs-toggle","modal");
    dugme.setAttribute("data-bs-target","#prikaz_agencija");
    let i = document.createElement("i");
    i.className = "bi bi-database-fill-gear";
    dugme.append(i);
    dugme.addEventListener("click",function(){
        postaviParametarIzmena(id);
        promeniNaziv("Ažurirajte podatke o agenciji", "prikazAgencijaLabel");
    });
    return dugme;
}


function napraviDugmeZaBrisanje(id) {
    let dugme = document.createElement("button");
    dugme.type = "button";
    dugme.className = "red";
    dugme.setAttribute("data-bs-toggle","modal");
    dugme.setAttribute("data-bs-target","#potvrda");
    let i = document.createElement("i");
    i.className = "bi bi-database-fill-x";
    dugme.append(i);
    dugme.addEventListener("click", function(){
        postaviParametar(id);
    })
    return dugme;
}

function obrisiTabelu() {
    let tabela = document.getElementsByClassName("responsive-tabel")[0];
    if(tabela!= undefined){
        tabela.parentNode.removeChild(tabela);
    }
}

function postaviParametar(agencijaId) {
    console.log(agencijaId);
    let potvrda = document.getElementById("potvrdaBrisanje");
    potvrda.addEventListener("click", function(){
        obrisiAgenciju(agencijaId);
    });
}
function obrisiAgenciju(id) {
    let zahtev = new XMLHttpRequest();

    zahtev.onreadystatechange = function () {
        if (this.readyState == 4) {
        if (this.status == 200) {
            window.open("../stranice_glavne/azuriraj_agencije.html", "_self");
        } else {
            window.open("../stranice_glavne/greska.html", "_self");
        }
        }
    };

    zahtev.open("DELETE", url + "/agencije/" + id + ".json");
    zahtev.send();
}

/*
    Funkcija za registraciju agencije
 */
function registrujAgenciju() {

    let naziv = document.getElementById("naziv").value;
    let mejl = document.getElementById("email").value;
    let adresa = document.getElementById("ulica").value;
    let grad = document.getElementById("grad").value;
    let godina = document.getElementById("osnivanje").value;
    let brojTelefona = document.getElementById("telefonAgencije").value;
    let adresaStanovanja = adresa+", "+grad.split(" ")[0]+", "+grad.split(" ")[1];
    let logo = document.getElementById("logo").value;
    var agencija ={
        adresa: adresaStanovanja,
        brojTelefona: brojTelefona,
        destinacije: "",
        email: mejl,
        godina: godina,
        logo: logo,
        naziv: naziv
    }

    let zahtev = new XMLHttpRequest();
    zahtev.onreadystatechange = function (e) {
        if (this.readyState == 4) {
            if (this.status == 200) {
            window.location.reload();
            console.log("Uspesno")
            } else {
            window.open("../stranice_glavne/greska.html", "_self");
            }
        }
        };
    zahtev.open("POST", url + "/agencije/" + ".json");
    zahtev.send(JSON.stringify(agencija));
}

/*
    Funkcija za ažuriranje podataka o agenciji
 */
function nadjiIdAgencije(agencijaId) {
    for(let index in sveAgencije){
        if(agencijeId[index] === agencijaId){
            return index;
        }
    }
}
function postaviParametarIzmena(agencijaId) {
    let id = nadjiIdAgencije(agencijaId);

    let naziv = document.getElementById("naziv");
    naziv.value = sveAgencije[id].naziv
    let mejl = document.getElementById("email");
    mejl.value = sveAgencije[id].email;
    let adresa = document.getElementById("ulica");
    adresa.value =sveAgencije[id].adresa.split(", ")[0];
    let grad = document.getElementById("grad");
    grad.value = sveAgencije[id].adresa.split(", ")[1] +" "+ sveAgencije[id].adresa.split(", ")[2];
    let godina = document.getElementById("osnivanje");
    godina.value = sveAgencije[id].godina;
    let brojTelefona = document.getElementById("telefonAgencije");
    brojTelefona.value = sveAgencije[id].brojTelefona;
    let logo = document.getElementById("logo");
    logo.value = sveAgencije[id].logo;
    napraviDugmeZaPotvrdu();
    let potvrda = document.getElementById("potvrdaAgencije");
    potvrda.addEventListener("click", function(){
        registrujAgenciju(sveAgencije[id].destinacije, agencijaId);
    });
}

function napraviDugmeZaPotvrdu() {
    let potvrda = document.getElementById("potvrdaAgencije");
    potvrda.remove();

    let dugme = document.createElement("button");
    dugme.type = "button";
    dugme.className = "btn btn-primary";
    dugme.id="potvrdaAgencije";
    dugme.innerHTML = "Potvrdi";
    let main = document.getElementById("dugmiciOpcije");
    main.appendChild(dugme);
}

/*
    Funkcija za ažuriranje agencije
 */
function registrujAgenciju(destinacije, id) {

    let naziv = document.getElementById("naziv").value;
    let mejl = document.getElementById("email").value;
    let adresa = document.getElementById("ulica").value;
    let grad = document.getElementById("grad").value;
    let godina = document.getElementById("osnivanje").value;
    let brojTelefona = document.getElementById("telefonAgencije").value;
    let adresaStanovanja = adresa+", "+grad.split(" ")[0]+", "+grad.split(" ")[1];
    let logo = document.getElementById("logo").value;
    var agencija ={
        adresa: adresaStanovanja,
        brojTelefona: brojTelefona,
        destinacije: destinacije,
        email: mejl,
        godina: godina,
        logo: logo,
        naziv: naziv
    }

    let zahtev = new XMLHttpRequest();
    zahtev.onreadystatechange = function (e) {
        if (this.readyState == 4) {
            if (this.status == 200) {
            window.location.reload();
            console.log("Uspesno")
            } else {
            window.open("../stranice_glavne/greska.html", "_self");
            }
        }
        };
    zahtev.open("PUT", url + "/agencije/"+id + ".json");
    zahtev.send(JSON.stringify(agencija));
}