var url = "https://web-dizajn-d1716-default-rtdb.europe-west1.firebasedatabase.app";
var sveAgencijeId = [];
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
                    sveAgencije.push(agencija);
                    sveAgencijeId.push(id);
                }
                popuniStranicuAgencijama(sveAgencije, sveAgencijeId);
            } else {
                window.open("../stranice_glavne/greska.html", "_self");
            }
        }
    }

    zahtev.open('GET', url + '/agencije/' + '.json');
    zahtev.send();
}

function popuniStranicuAgencijama(sveAgencije, agencijeId){
    var main = document.getElementsByTagName("main")[0];
    main.innerHTML = " ";
    var div = document.createElement("div");
    div.className = "kontejner";
    for(var id in sveAgencije){
        var div_manji = document.createElement("div");
        
        var h2 = document.createElement("h2");
        h2.innerHTML = sveAgencije[id].naziv;
        let a = document.createElement("a");
        a.href = "../turisticke_agencije/templejt_agencije.html?id="+agencijeId[id];
        a.appendChild(h2);
        var slika = document.createElement("img");
        slika.src = sveAgencije[id].logo;
        a.appendChild(slika);
        let div_tekst = document.createElement("div");
        div_tekst.className = "tekst";
        var p_tag = document.createElement("p");
        p_tag.innerHTML ="Broj telefona: ".bold() + sveAgencije[id].brojTelefona;
        div_tekst.appendChild(p_tag);
        var p_tag_2 = document.createElement("p");
        p_tag_2.innerHTML = "Email adresa: ".bold()+sveAgencije[id].email;
        div_tekst.appendChild(p_tag_2);
        a.appendChild(div_tekst);
        div_manji.appendChild(a);
        div.appendChild(div_manji)
    }
    main.appendChild(div)
    
}
/*
    Funkcija koja nalazi agenciju po nazivu
 */
function nadjiAgenciju(naziv) {
    for(var id in sveAgencije){
        if(sveAgencije[id] === naziv){
            return sveAgencije[id];
        }
    }
}
/*
    Funkcija koja nalazi id agencije iz URL-a
 */
function dobaviIdAgencije(name) {
    let location = decodeURI(window.location.toString());
    let index = location.indexOf("?") + 1;
    let subs = location.substring(index, location.length);
    let splitted = subs.split("&");
  
    for (i = 0; i < splitted.length; i++) {
      let s = splitted[i].split("=");
      let pName = s[0];
      let pValue = s[1];
      if (pName == name) {
        return pValue;
      }
    }
  }
var pretraga_agencije = [];
var pretraga = [];
var agencijeId = [];
var agencijeIdDestinacije = [];
/*
    Pretraga
 */
document.addEventListener("input", function () {
    pretraga = [];
    pretraga_agencije = [];
    agencijeId = [];
    agencijeIdDestinacije = [];
    let unos_a1 = document.getElementById("agencija_1");
    let unos_d1 = document.getElementById("destinacija_1");
    if(unos_a1.value == "" && unos_d1.value == ""){
        popuniStranicuAgencijama(sveAgencije, sveAgencijeId);
    }
    if(unos_a1.value != "" || unos_d1 != ""){
        if(unos_a1.value != ""){
            
            pretraziPoAgenciji("agencija_1", agencijeId);
            if(unos_d1.value == ""){
                popuniStranicuAgencijama(pretraga_agencije, agencijeId);
            }
        }
        if(unos_d1.value != ""){
            pretraziPoDestinacijama("destinacija_1", sveAgencije, agencijeIdDestinacije);
        }
        
    }

})
/*
    Funkcija koja pretrazuje agencije po nazivu
 */
function pretraziPoAgenciji(id_inputa, agencijeId) {
    let unos = document.getElementById(id_inputa);
    var string = unos.value;
    for(let id in sveAgencije){
        let naziv = sveAgencije[id].naziv;
        if(naziv.toUpperCase().includes(string.toUpperCase())){
            pretraga_agencije.push(sveAgencije[id]);
            agencijeId.push(sveAgencijeId[id]);

        }
    }
    
}
/*
    Funkcija koja vraca presek dve pretrage
 */
function proveriPoklapanje(pretraga, agencijeIdDestinacije) {
    console.log(pretraga.length);
    console.log(pretraga_agencije.length);
    if(pretraga.length != 0 && pretraga_agencije.length != 0){
        var konacna = [];
        var konacniId = [];
        for(var i in pretraga){
            if(pretraga_agencije.indexOf(pretraga[i]) != -1){
                
                konacna.push(pretraga[i]);
                konacniId.push(nadjiIdAgencije(pretraga[i]))
            }
            popuniStranicuAgencijama(konacna, konacniId);
        }
    }
    else if(pretraga.length != 0){
        popuniStranicuAgencijama(pretraga, agencijeIdDestinacije);
    }
}
/*
    Funkcija koja nalazi agenciju po nazivu destinacije
 */
function pretraziPoDestinacijama(id_inputa, sveAgencije, agencijeIdDestinacije) {
    let unos = document.getElementById(id_inputa);
    var string = unos.value.toUpperCase();
    if (string === "") {
      popuniStranicuAgencijama(sveAgencije);
    } else {
      var requests = sveAgencije.map(function (agencija) {
        return ucitajIzBazeDestinaciju(agencija.destinacije, string, pretraga, agencija, agencijeIdDestinacije);
      });
  
      Promise.all(requests)
        .then(function () {
          console.log(pretraga);
          proveriPoklapanje(pretraga,agencijeIdDestinacije)
        })
        .catch(function (error) {
          console.error(error);
          window.open("../stranice_glavne/greska.html", "_self");
        });
    }
  }
  
function nadjiIdAgencije(taAgencija) {
    for(var id in sveAgencije){
        if(sveAgencije[id] == taAgencija){
            return sveAgencijeId[id];
        }
    }
}
/*
    Funkcija koja ucitava destinacije agencije iz baze
 */
function ucitajIzBazeDestinaciju(grupaDestinacija, string, pretraga, taAgencija, agencijeIdDestinacije) {
return new Promise(function (resolve, reject) {
    var zahtev = new XMLHttpRequest();
    zahtev.onreadystatechange = function () {
    if (this.readyState == 4) {
        if (this.status == 200) {
        var destinacijeTrenutne = JSON.parse(zahtev.responseText);
        for (var id in destinacijeTrenutne) {
            var destinacija = destinacijeTrenutne[id];
            if (destinacija.naziv.toUpperCase().includes(string)) {
            console.log(destinacija.naziv.toUpperCase());
            agencijeIdDestinacije.push(nadjiIdAgencije(taAgencija));
            pretraga.push(taAgencija);
            break;
            }
        }
        resolve();
        } else {
        reject(new Error("Request failed"));
        }
    }
    };
        zahtev.open('GET', url + '/destinacije/' + grupaDestinacija + '.json');
        zahtev.send();
    });
}


function registrujKorisnika() {

    let ime = document.getElementById("ime").value;
    let prezime = document.getElementById("prezime").value;
    let korisnickoIme = document.getElementById("korIme").value;
    let sifra = document.getElementById("sifra").value;
    let mejl = document.getElementById("mejl").value;
    let adresa = document.getElementById("adresa").value;
    let grad = document.getElementById("grad").value;
    let brojTelefona = document.getElementById("telefon").value;
    let rodjendan = document.getElementById("rodjendan").value;
    console.log(grad)
    let adresaStanovanja = adresa+","+grad.split(" ")[0]+","+grad.split(" ")[1];
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
            window.location.href = "../stranice_glavne/index.html";
            console.log("Uspesno")
          } else {
            window.open("../stranice_glavne/greska.html", "_self");
          }
        }
      };
    zahtev.open("PUT", url + "/korisnici/" + ".json");
    zahtev.send(JSON.stringify(korisnik));
}


