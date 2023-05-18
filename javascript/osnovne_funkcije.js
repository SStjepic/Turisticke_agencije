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
                popuniStranicuAgencijama();
            } else {
                window.open("stranice_glavne/greska.html", "_self");
            }
        }
    }

    zahtev.open('GET', url + '/agencjie/' + '.json');
    zahtev.send();
}

function popuniStranicuAgencijama(){
    var main = document.getElementsByTagName("main")[0];
    var div = document.createElement("div");
    div.className = "kontejner";
    for(var id in sveAgencije){
        var div_manji = document.createElement("div");
        let a_tag = document.createElement("a");
        a_tag.href = "../turisticke_agencije/templejt_agencije.html";
        var h2 = document.createElement("h2");
        h2.innerText = sveAgencije[id].naziv;
        console.log(sveAgencije[id].naziv);
        a_tag.appendChild(h2);
        var slika = document.createElement("img");
        slika.src = sveAgencije[id].logo;
        a_tag.appendChild(slika);
        var p_tag = document.createElement("p");
        p_tag.innerHTML ="Broj telefona: ".bold() + sveAgencije[id].brojTelefona;
        a_tag.appendChild(p_tag);
        var p_tag_2 = document.createElement("p");
        p_tag_2.innerHTML = "Email adresa: ".bold()+sveAgencije[id].email;
        a_tag.appendChild(p_tag_2);
        a_tag.addEventListener("click", function(){
            localStorage.setItem('naziv', sveAgencije[id].naziv);
            localStorage.setItem('adresa', sveAgencije[id].adresa);
            localStorage.setItem('brojTelefona', sveAgencije[id].brojTelefona);
            localStorage.setItem('destinacije', sveAgencije[id].destinacije);
            localStorage.setItem('email', sveAgencije[id].email);
            localStorage.setItem('godina', sveAgencije[id].godina);
            localStorage.setItem('logo', sveAgencije[id].logo);
            window.location.href = "../turisticke_agencije/templejt_agencije.html";
            prikaziDestinacije();
        });
        div_manji.appendChild(a_tag);
        div.appendChild(div_manji)
    }
    main.appendChild(div)
    
}
function posaljiPodatke(naziv, adresa, brojTelefona, destinacije, email, godina,) {
    
}
function nadjiAgenciju(naziv) {
    for(var id in sveAgencije){
        if(sveAgencije[id] === naziv){
            return sveAgencije[id];
        }
    }
}