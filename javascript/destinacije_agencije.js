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
                if(trenutnaAgencija.destinacije != ""){
                    grupaDestinacija = trenutnaAgencija.destinacije;
                    ucitajIzBazeDestinaciju()
                }
                else{
                    prikaziDestinacije([]);
                }
            } else {
                window.open("../stranice_glavne/greska.html", "_self");
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
                    sveDestinacije.push(destinacija);
                    destinacijeId.push(id);
                }
                prikaziDestinacije(sveDestinacije);
            } else {
                window.open("stranice_glavne/greska.html", "_self");
            }
        }
        
    }
    zahtev.open('GET', url + '/destinacije/'+grupaDestinacija  + '.json');
    zahtev.send();  
}
/*
    Funkcija koja kreira izgled stranice jedne agencije
*/
function prikaziDestinacije(sveDestinacije) {
    var naziv = trenutnaAgencija.naziv;
    var main = document.getElementsByTagName("main")[0];
    main.innerHTML = " ";
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
        let a = document.createElement("a");
        a.href = "../destinacije/templejt_destinacija.html?id=" + trenutnaAgencija.destinacije +"/"+ destinacijeId[id] + "&agencija=" + trenutnaAgencija.naziv;
        var h2 = document.createElement("h2");
        h2.innerText = sveDestinacije[id].naziv;
        a.appendChild(h2);
        var slika = document.createElement("img");
        slika.src = sveDestinacije[id].slike[0];
        a.appendChild(slika);
        var div_tekst = document.createElement("div");
        div_tekst.className = "tekst";
        p_tag = document.createElement("p");
        p_tag.innerHTML ="Tip: ".bold() + sveDestinacije[id].tip;
        div_tekst.appendChild(p_tag);
        var p_tag_2 = document.createElement("p");
        p_tag_2.innerHTML = "Cena: ".bold()+sveDestinacije[id].cena + " dinara";
        div_tekst.appendChild(p_tag_2);
        a.appendChild(div_tekst)
        div_manji.appendChild(a);
        div_veliki.appendChild(div_manji)
    }

    main.appendChild(div_veliki)
    document.title = naziv;
}
/*
    Funkcija koja dobavlja bilo koji paramtar iz URL-a
 */
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
var pretraga = []
document.addEventListener("input", function(){
    var unos_naziv = document.getElementById("naziv_1").value;
    var unos_tip = document.getElementById("tip_1").value;
    var unos_prevoz = document.getElementById("prevoz_1").value;
    var unos_naziv_2 = document.getElementById("naziv_2").value;
    var unos_tip_2 = document.getElementById("tip_2").value;
    var unos_prevoz_2 = document.getElementById("prevoz_2").value;
    pretraga = [];
    if(unos_naziv !="" || unos_tip !="" || unos_prevoz!=""){
        for(var indeks in sveDestinacije){
            if(((sveDestinacije[indeks].naziv.toUpperCase().includes(unos_naziv.toUpperCase()) && unos_naziv!="")||(unos_naziv ==""))&&((sveDestinacije[indeks].prevoz.toUpperCase().includes(unos_prevoz.toUpperCase()) && unos_prevoz!="")||(unos_prevoz==""))&&((sveDestinacije[indeks].tip.toUpperCase().includes(unos_tip.toUpperCase())&& unos_tip!="")||(unos_tip ==""))){
                pretraga.push(sveDestinacije[indeks]);
            }
        }
        prikaziDestinacije(pretraga);
    }   
    else{
        if(unos_naziv_2 =="" && unos_tip_2 =="" && unos_prevoz_2==""){
            prikaziDestinacije(sveDestinacije);
        }
        else{
            for(var indeks in sveDestinacije){
                if(((sveDestinacije[indeks].naziv.toUpperCase().includes(unos_naziv_2.toUpperCase()) && unos_naziv_2!="")||(unos_naziv_2 ==""))&&((sveDestinacije[indeks].prevoz.toUpperCase().includes(unos_prevoz_2.toUpperCase()) && unos_prevoz_2!="")||(unos_prevoz_2==""))&&((sveDestinacije[indeks].tip.toUpperCase().includes(unos_tip_2.toUpperCase())&& unos_tip_2!="")||(unos_tip_2 ==""))){
                    pretraga.push(sveDestinacije[indeks]);
                }
            }
            prikaziDestinacije(pretraga);
        }
    }
})
