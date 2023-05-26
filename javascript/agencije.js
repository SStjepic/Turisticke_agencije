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
                popuniStranicuAgencijama(sveAgencije);
            } else {
                window.open("../stranice_glavne/greska.html", "_self");
            }
        }
    }

    zahtev.open('GET', url + '/agencije/' + '.json');
    zahtev.send();
}

function popuniStranicuAgencijama(sveAgencije){
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
var pretraga = [];
var jeste = [false];
document.addEventListener("input", function () {
    pretraga = [];
    let unos_a1 = document.getElementById("agencija_1");
    let unos_d1 = document.getElementById("destinacija_1");
    if(unos_a1.value != "" || unos_d1 != ""){
        pretraziPoAgenciji("agencija_1");
        // pretraziPoDestinacijama("destinacija_1");
    }
})
var pAgencija = {}
function pretraziPoAgenciji(id_inputa) {
    let unos = document.getElementById(id_inputa);
    var string = unos.value;
    for(let id in sveAgencije){
        let naziv = sveAgencije[id].naziv;
        if(naziv.toUpperCase().includes(string.toUpperCase())){
            pretraga.push(sveAgencije[id]);
        }
    }
    popuniStranicuAgencijama(pretraga);
}




// function pretraziPoDestinacijama(id_inputa) {
//     let unos = document.getElementById(id_inputa);
//     var string = unos.value.toUpperCase();
//     if(string === ""){
//         popuniStranicuAgencijama(pretraga);
//     }
//     else{
//         for(var id in sveAgencije){
//             ucitajIzBazeDestinaciju(sveAgencije[id].destinacije, string);
//             console.log(sveAgencije[id].destinacije)
//             console.log(jeste[0]);
//             if(jeste[0] === true){
//                 pretraga.push(sveAgencije[id].naziv);
//                 jeste[0] = false;

//             }
            
//         }
//         popuniStranicuAgencijama(pretraga);
//     }
// }

// function ucitajIzBazeDestinaciju(grupaDestinacija, string) {
    
//     let destinacijeTrenutne = {};
//     var zahtev = new XMLHttpRequest();
    
//     zahtev.onreadystatechange = function () {
//         if (this.readyState == 4) {
//             if (this.status == 200) {
//                 destinacijeAgencije = [];
//                 destinacijeTrenutne = JSON.parse(zahtev.responseText);
//                 for (var id in destinacijeTrenutne) {
//                     var destinacija = destinacijeTrenutne[id];
//                     if(destinacija.naziv.toUpperCase().includes(string)){
//                         jeste[0] = true;
//                         console.log(destinacija.naziv.toUpperCase());
//                         break;
//                     }
                    
//                 }
//             } else {
//                 window.open("../stranice_glavne/greska.html", "_self");
//             }
//         }
        
//     }
//     zahtev.open('GET', url + '/destinacije/'+grupaDestinacija  + '.json');
//     zahtev.send();  
// }



