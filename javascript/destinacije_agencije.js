var url = "https://web-dizajn-d1716-default-rtdb.europe-west1.firebasedatabase.app";
document.addEventListener("DOMContentLoaded", ucitajIzBazeDestinaciju);
var destinacijeId = [];
var sveDestinacije = [];
var destinacije = {};
function ucitajIzBazeDestinaciju() {
    destinacijeId = [];
    sveDestinacije = [];
    destinacije = {};
    var naziv = localStorage.getItem('destinacije');
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
    
    console.log(naziv);
    zahtev.open('GET', url + '/destinacije/'+naziv + '.json');
    zahtev.send();

    
}

function prikaziDestinacije() {
    var naziv = localStorage.getItem('naziv');
    var main = document.getElementsByTagName("main")[0];
    var h1 = document.createElement("h1");
    h1.innerText = naziv;
    h1.id = "turagen";
    main.appendChild(h1);
    var div = document.createElement("div");
    div.className = "opis";
    var slika = document.createElement("img");
    slika.src = localStorage.getItem('logo');
    div.appendChild(slika);
    var div_tekst = document.createElement("div");
    div_tekst.className = "tekst wid";
    let p_tag = document.createElement("p");
    p_tag.innerHTML = "Adresa: ".bold() + localStorage.getItem('adresa');;
    div_tekst.appendChild(p_tag);
    let p_tag_1 = document.createElement("p");
    p_tag_1.innerHTML = "Broj telefona: ".bold() + localStorage.getItem('brojTelefona');;
    div_tekst.appendChild(p_tag_1);
    var p_tag_2 = document.createElement("p");
    p_tag_2.innerHTML = "Email adresa: ".bold() + localStorage.getItem('email');;
    div_tekst.appendChild(p_tag_2);
    let p_tag_3 = document.createElement("p");
    p_tag_3.innerHTML = "Osnovano: ".bold() + localStorage.getItem('godina');;
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
        div_manji.onclick = prikaziPojedinacnuDestinaciju(sveDestinacije[id].naziv)
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

function ucitajIzBazeSveDestinacije() {
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
            } else {
                window.open("stranice_glavne/greska.html", "_self");
            }
        }
    }
    zahtev.open('GET', url + '/destinacije/' + '.json');
    zahtev.send();
}

function prikaziPojedinacnuDestinaciju(){

}