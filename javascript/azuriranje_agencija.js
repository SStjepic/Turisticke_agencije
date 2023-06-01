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
            window.location.reload();
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
    if(validacijaAgencije()){
        let naziv = document.getElementById("naziv").value;
        let mejl = document.getElementById("email").value;
        let adresa = document.getElementById("ulica").value;
        let grad = document.getElementById("gradAgencije").value;
        let godina = document.getElementById("osnivanje").value;
        let brojTelefona = document.getElementById("telefonAgencije").value;
        let gradUString = grad.replace(/(\d)/, ",$1");
        let adresaStanovanja = adresa+", " + gradUString;
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
                } else {
                window.open("../stranice_glavne/greska.html", "_self");
                }
            }
            };
        zahtev.open("POST", url + "/agencije/" + ".json");
        zahtev.send(JSON.stringify(agencija));
    }
    
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
    let grad = document.getElementById("gradAgencije");
    grad.value = sveAgencije[id].adresa.split(",")[1] +" "+ sveAgencije[id].adresa.split(",")[2];
    let godina = document.getElementById("osnivanje");
    godina.value = sveAgencije[id].godina;
    let brojTelefona = document.getElementById("telefonAgencije");
    brojTelefona.value = sveAgencije[id].brojTelefona;
    let logo = document.getElementById("logo");
    logo.value = sveAgencije[id].logo;
    napraviDugmeZaPotvrdu();
    let potvrda = document.getElementById("potvrdaAgencije");
    potvrda.addEventListener("click", function(){
        azurirajAgenciju(sveAgencije[id].destinacije, agencijaId);
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
function azurirajAgenciju(destinacije, id) {
    if(validacijaAgencije()){
        let naziv = document.getElementById("naziv").value;
        let mejl = document.getElementById("email").value;
        let adresa = document.getElementById("ulica").value;
        let grad = document.getElementById("gradAgencije").value;
        let godina = document.getElementById("osnivanje").value;
        let brojTelefona = document.getElementById("telefonAgencije").value;
        let gradUString = grad.replace(/(\d)/, ",$1");
        let adresaStanovanja = adresa+", " + gradUString;
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
                } else {
                window.open("../stranice_glavne/greska.html", "_self");
                }
            }
            };
        zahtev.open("PUT", url + "/agencije/"+id + ".json");
        zahtev.send(JSON.stringify(agencija));
    }
}

function validacijaAgencije() {
    let ispravno = true;
    let naziv = document.getElementById("naziv").value;
    if(naziv === ""){
        ispravno = false;
        let postavi = document.getElementById("dodavanjeNaziv");
        postavi.innerText = "Niste uneli validan podatak";
        postavi.style.color = "red";
        postavi.style.fontSize = "1.5vh";
        postavi = document.getElementById("naziv");
        postavi.style.borderColor = "red";
    }
    else{
        let postavi = document.getElementById("dodavanjeNaziv");
        postavi.innerText = "Validan podatak";
        postavi.style.color = "green";
        postavi.style.fontSize = "1.5vh";
        postavi = document.getElementById("naziv");
        postavi.style.borderColor = "green";
    }
    let mejl = document.getElementById("email").value;
    if(mejl === ""){
        ispravno = false;
        let postavi = document.getElementById("dodavanjeEmail");
        postavi.innerText = "Niste uneli validan podatak";
        postavi.style.color = "red";
        postavi.style.fontSize = "1.5vh";
        postavi = document.getElementById("email");
        postavi.style.borderColor = "red";
      }
      else{
        let proba = mejl.split("@");
        let promenljiva = proba[1].split(".");
        if(proba.length == 2 && promenljiva.length >= 2){
          let postavi = document.getElementById("dodavanjeEmail");
          postavi.innerText = "Validan podatak";
          postavi.style.color = "green";
          postavi.style.fontSize = "1.5vh";
          postavi = document.getElementById("email");
          postavi.style.borderColor = "green";
        }
        else{
          ispravno = false;
          let postavi = document.getElementById("dodavanjeEmail");
          postavi.innerText = "Niste uneli validan podatak";
          postavi.style.color = "red";
          postavi.style.fontSize = "1.5vh";
          postavi = document.getElementById("email");
          postavi.style.borderColor = "red";
        }
      }
    let adresa = document.getElementById("ulica").value;
    let podeli = adresa.split(" ");
    if(adresa === "" || podeli.length < 2 || !Number.isInteger(Number(podeli[podeli.length-1]))){
      ispravno = false;
      let postavi = document.getElementById("dodavanjeUlica");
      postavi.innerText = "Niste uneli validan podatak";
      postavi.style.color = "red";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("ulica");
      postavi.style.borderColor = "red";
    }
    else{
      let postavi = document.getElementById("dodavanjeUlica");
      postavi.innerText = "Validan podatak";
      postavi.style.color = "green";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("ulica");
      postavi.style.borderColor = "green";
    }
    let grad = document.getElementById("gradAgencije").value;
    let podeliGrad = grad.split(" ");
    if(grad === "" || podeliGrad.length < 2 || !Number.isInteger(Number(podeliGrad[podeliGrad.length-1])) || podeliGrad[podeliGrad.length-1] === ""){
      ispravno = false;
      let postavi = document.getElementById("dodavanjeOsnivanje");
      postavi.innerText = "Niste uneli validan podatak";
      postavi.style.color = "red";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("gradAgencije");
      postavi.style.borderColor = "red";
    }
    else{
      let postavi = document.getElementById("dodavanjeOsnivanje");
      postavi.innerText = "Validan podatak";
      postavi.style.color = "green";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("gradAgencije");
      postavi.style.borderColor = "green";
    }
    let godina = document.getElementById("osnivanje").value;
    if(godina === "" || Number(godina)<=1900 || Number(godina)>=2023){
        ispravno = false;
        let postavi = document.getElementById("dodavanjeOsnivanje");
        postavi.innerText = "Niste uneli validan podatak";
        postavi.style.color = "red";
        postavi.style.fontSize = "1.5vh";
        postavi = document.getElementById("osnivanje");
        postavi.style.borderColor = "red";
    }
    else{
        let postavi = document.getElementById("dodavanjeOsnivanje");
        postavi.innerText = "Validan podatak";
        postavi.style.color = "green";
        postavi.style.fontSize = "1.5vh";
        postavi = document.getElementById("osnivanje");
        postavi.style.borderColor = "green";
    }
    let brojTelefona = document.getElementById("telefonAgencije").value;
    let formatBroja = /^\d{3}\/\d{4}-\d{4,7}$/;
    if(brojTelefona === "" || !formatBroja.test(brojTelefona)){
      ispravno = false;
      let postavi = document.getElementById("dodavanjeTelefonAgencije");
      postavi.innerText = "Niste uneli validan podatak";
      postavi.style.color = "red";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("telefonAgencije");
      postavi.style.borderColor = "red";
    }
    else{
      let postavi = document.getElementById("dodavanjeTelefonAgencije");
      postavi.innerText = "Validan podatak";
      postavi.style.color = "green";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("telefonAgencije");
      postavi.style.borderColor = "green";
    }
    let logo = document.getElementById("logo").value;
    if(logo === ""){
        ispravno = false;
        let postavi = document.getElementById("dodavanjeLogo");
        postavi.innerText = "Niste uneli validan podatak";
        postavi.style.color = "red";
        postavi.style.fontSize = "1.5vh";
        postavi = document.getElementById("logo");
        postavi.style.borderColor = "red";
      }
      else{
        let postavi = document.getElementById("dodavanjeLogo");
        postavi.innerText = "Validan podatak";
        postavi.style.color = "green";
        postavi.style.fontSize = "1.5vh";
        postavi = document.getElementById("logo");
        postavi.style.borderColor = "green";
      }
    
    return ispravno;
}