var url = "https://web-dizajn-d1716-default-rtdb.europe-west1.firebasedatabase.app";
document.addEventListener("DOMContentLoaded", ucitajIzBazeDestinaciju);
var trenutnaDestinacija = {}
var nazivAgencije = "";

function ucitajIzBazeDestinaciju() {
    var zahtev = new XMLHttpRequest();
    var naziv = dobaviParametar("id");

    zahtev.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                trenutnaDestinacija = JSON.parse(zahtev.responseText);
                console.log(trenutnaDestinacija)
                prikaziDestinaciju()
            } else {
                window.open("../stranice_glavne/greska.html", "_self");
            }
        }
    }

    zahtev.open('GET', url + '/destinacije/'+naziv + '.json');
    zahtev.send();
}

function prikaziDestinaciju() {
    nazivAgencije = dobaviParametar("agencija");
    let main = document.getElementsByTagName("main")[0];
    let h1 = document.createElement("h1");
    h1.id = "turagen";
    h1.innerHTML = nazivAgencije + " - " + trenutnaDestinacija.naziv;
    document.title = nazivAgencije + " - " + trenutnaDestinacija.naziv;
    main.appendChild(h1);
    let slajder = napraviSlajder(trenutnaDestinacija.slike);
    let opis = document.createElement("div");
    opis.className = "opis";
    let div = document.createElement("div");
    div.className = "tekst"
    var p = document.createElement("p");
    p.innerHTML = "Tip: ".bold() + trenutnaDestinacija.tip;
    div.appendChild(p);
    p = document.createElement("p");
    p.innerHTML = "Prevoz: ".bold() + trenutnaDestinacija.prevoz;
    div.appendChild(p);
    p = document.createElement("p");
    p.innerHTML = "Cena: ".bold() + trenutnaDestinacija.cena + " dinara";
    div.appendChild(p);
    p = document.createElement("p");
    p.innerHTML = "Maksimalan broj osoba: ".bold() + trenutnaDestinacija.maxOsoba;
    div.appendChild(p);
    opis.appendChild(slajder);
    opis.appendChild(div)
    main.appendChild(opis);

    h1 = document.createElement("h1");
    h1.innerHTML = "Kratak opis"
    main.appendChild(h1);
    opis = document.createElement("div");
    opis.classList.add("opis");
    opis.classList.add("peding")
    p = document.createElement("p");
    p.innerHTML = trenutnaDestinacija.opis;
    opis.appendChild(p);
    main.appendChild(opis);
    
}

function napraviSlajder(slike) {
    let div_spoljni = document.createElement("div");
    div_spoljni.id = "slajder";
    div_spoljni.className = "carousel slide carousel-fade col-lg-6 col-md-8 col-12";
    let div_dugmici = document.createElement("div")
    div_dugmici.className = "carousel-indicators";
    let div_stavke = document.createElement("div")
    div_stavke.className = "carousel-inner";

    for(var id in slike){
        
        let dugme = document.createElement("button");
        dugme.type = "button";
        dugme.setAttribute("data-bs-target", "#slajder");
        dugme.setAttribute("data-bs-slide-to",id);
        div_dugmici.appendChild(dugme);

        let div_slika = document.createElement("div");
        div_slika.className = "carousel-item";
        let slika = document.createElement("img");
        slika.src = slike[id];
        slika.className = "d-block w-100";
        slika.alt = "Slika turističke destinacije " + trenutnaDestinacija.naziv;
        if (id === "0"){
            dugme.className = "active";
            dugme.setAttribute("aria-current","true")

            div_slika.classList.add("active");
        }
        div_slika.appendChild(slika);
        div_stavke.appendChild(div_slika)
    }



    div_spoljni.appendChild(div_dugmici);
    div_spoljni.appendChild(div_stavke);

    dugme = document.createElement("button");
    dugme.className = "carousel-control-prev";
    dugme.type = "button";
    dugme.setAttribute("data-bs-target", "#slajder");
    dugme.setAttribute("data-bs-slide","prev");
    let span = document.createElement("span");
    span.className = "carousel-control-prev-icon";
    span.setAttribute("aria-hidden","true");
    dugme.appendChild(span);
    span = document.createElement("span");
    span.className = "visually-hidden";
    dugme.appendChild(span);
    div_spoljni.appendChild(dugme);

    dugme = document.createElement("button");
    dugme.className = "carousel-control-next";
    dugme.type = "button";
    dugme.setAttribute("data-bs-target", "#slajder");
    dugme.setAttribute("data-bs-slide","next");
    span = document.createElement("span");
    span.className = "carousel-control-next-icon";
    span.setAttribute("aria-hidden","true");
    dugme.appendChild(span);
    span = document.createElement("span");
    span.className = "visually-hidden";
    dugme.appendChild(span);
    div_spoljni.appendChild(dugme);

    return div_spoljni
    
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
        return pValue;
      }
    }
  }