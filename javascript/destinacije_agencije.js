var url = "https://web-dizajn-d1716-default-rtdb.europe-west1.firebasedatabase.app";
document.addEventListener("DOMContentLoaded", ucitajIzBazeAgenciju);
var destinacijeId = [];
var sveDestinacije = [];
var destinacije = {};
var trenutnaAgencija = {};
var grupaDestinacija = "";

function ucitajIzBazeAgenciju() {
    var zahtev = new XMLHttpRequest();
    var naziv = dobaviParametar("id");

    zahtev.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                trenutnaAgencija = JSON.parse(zahtev.responseText);
                grupaDestinacija = trenutnaAgencija.destinacije;
                ucitajIzBazeDestinaciju()
            } else {
                window.open("stranice_glavne/greska.html", "_self");
            }
        }
    }

    zahtev.open('GET', url + '/agencije/'+naziv + '.json');
    zahtev.send();
}


function ucitajIzBazeDestinaciju() {
    destinacijeId = [];
    sveDestinacije = [];
    destinacije = {};

    let zahtev = new XMLHttpRequest();

    zahtev.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                destinacije = JSON.parse(zahtev.responseText);
                for (var id in destinacije) {
                    var destinacija = destinacije[id];
                    console.log(destinacija);
                    sveDestinacije.push(destinacija);
                    destinacijeId.push(id);
                }
                prikaziDestinacije();
            } else {
                window.open("stranice_glavne/greska.html", "_self");
            }
        }
        
    }
    zahtev.open('GET', url + '/destinacije/'+grupaDestinacija  + '.json');
    zahtev.send();  
}

function prikaziDestinacije() {
    var naziv = trenutnaAgencija.naziv;
    var main = document.getElementsByTagName("main")[0];
    var h1 = document.createElement("h1");
    h1.innerText = naziv;
    h1.id = "turagen";
    main.appendChild(h1);
    var div = document.createElement("div");
    div.className = "opis";
    var slika = document.createElement("img");
    slika.src = trenutnaAgencija.logo;
    div.appendChild(slika);
    var div_tekst = document.createElement("div");
    div_tekst.className = "tekst wid";
    let p_tag = document.createElement("p");
    p_tag.innerHTML = "Adresa: ".bold() + trenutnaAgencija.adresa;
    div_tekst.appendChild(p_tag);
    let p_tag_1 = document.createElement("p");
    p_tag_1.innerHTML = "Broj telefona: ".bold() + trenutnaAgencija.brojTelefona;
    div_tekst.appendChild(p_tag_1);
    var p_tag_2 = document.createElement("p");
    p_tag_2.innerHTML = "Email adresa: ".bold() + trenutnaAgencija.email;
    div_tekst.appendChild(p_tag_2);
    let p_tag_3 = document.createElement("p");
    p_tag_3.innerHTML = "Osnovano: ".bold() + trenutnaAgencija.godina;
    div_tekst.appendChild(p_tag_3);
    div.appendChild(div_tekst)
    main.appendChild(div);
    var h11 = document.createElement("h1");
    h11.innerHTML = "Destinacije turističke agencije " + naziv;
    main.appendChild(h11);
    var div_veliki = document.createElement("div");
    div_veliki.className = "kontejner";

    for(var id in sveDestinacije){
        var div_manji = document.createElement("div");
        div_manji.id = trenutnaAgencija.destinacije +"/"+ destinacijeId[id];
        div_manji.onclick = prikaziPojedinacnuDestinaciju;
        var h2 = document.createElement("h2");
        h2.innerText = sveDestinacije[id].naziv;
        div_manji.appendChild(h2);
        var slika = document.createElement("img");
        slika.src = sveDestinacije[id].slike[0];
        div_manji.appendChild(slika);
        var div_tekst = document.createElement("div");
        div_tekst.className = "tekst";
        p_tag = document.createElement("p");
        p_tag.innerHTML ="Tip: ".bold() + sveDestinacije[id].prevoz;
        div_tekst.appendChild(p_tag);
        var p_tag_2 = document.createElement("p");
        p_tag_2.innerHTML = "Cena: ".bold()+sveDestinacije[id].cena;
        div_tekst.appendChild(p_tag_2);
        div_manji.appendChild(div_tekst)
        div_veliki.appendChild(div_manji)
    }

    main.appendChild(div_veliki)
    document.title = naziv;
}
function prikaziPojedinacnuDestinaciju() {
    let objekat = this;
    window.location.href = "../destinacije/templejt_destinacija.html?id=" + objekat.id + "&agencija=" + trenutnaAgencija.naziv;
}

function dobaviParametar(nazivParametra) {
    let location = decodeURI(window.location.toString());
    let index = location.indexOf("?") + 1;
    let subs = location.substring(index, location.length);
    let splitted = subs.split("&");
  
    for (i = 0; i < splitted.length; i++) {
      let s = splitted[i].split("=");
      let pName = s[0];
      let pValue = s[1];
      if (pName == nazivParametra) {
        console.log(pValue)
        return pValue;
      }
    }
  }