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
                    sveAgencije.push(agencija);
                    agencijeId.push(id);
                }
                popuniStranicuAgencijama();
            } else {
                window.open("stranice_glavne/greska.html", "_self");
            }
        }
    }

    zahtev.open('GET', url + '/agencije/' + '.json');
    zahtev.send();
}

function popuniStranicuAgencijama(){
    var main = document.getElementsByTagName("main")[0];
    var div = document.createElement("div");
    div.className = "kontejner";
    for(var id in sveAgencije){
        var div_manji = document.createElement("div");
        div_manji.setAttribute("id", agencijeId[id]);
        
        var h2 = document.createElement("h2");
        h2.innerText = sveAgencije[id].naziv;
        div_manji.appendChild(h2);
        var slika = document.createElement("img");
        slika.src = sveAgencije[id].logo;
        div_manji.appendChild(slika);
        var p_tag = document.createElement("p");
        p_tag.innerHTML ="Broj telefona: ".bold() + sveAgencije[id].brojTelefona;
        div_manji.appendChild(p_tag);
        var p_tag_2 = document.createElement("p");
        p_tag_2.innerHTML = "Email adresa: ".bold()+sveAgencije[id].email;
        div_manji.appendChild(p_tag_2);
        div_manji.onclick = posaljiPodatke;
        div.appendChild(div_manji)
    }
    main.appendChild(div)
    
}
function posaljiPodatke() {
    let objekat = this;
    window.location.href = "../turisticke_agencije/templejt_agencije.html?id="+objekat.id;
}
function nadjiAgenciju(naziv) {
    for(var id in sveAgencije){
        if(sveAgencije[id] === naziv){
            return sveAgencije[id];
        }
    }
}

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