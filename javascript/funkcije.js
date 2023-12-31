

function dodajSliku() {
    let polje = document.createElement("input");
    polje.type = "url";
    polje.onclick = dodajSliku;
    let prelom = document.createElement("br");
    let roditelj = document.getElementsByName("prikazi_destinaciju")[0];
    roditelj.appendChild(prelom);
    roditelj.appendChild(polje);
}
function proveriValidnostRegistracije() {
    let ispravno = true;
    let ime = document.getElementById("ime").value;
    if(ime === ""){
      ispravno = false;
      let postavi = document.getElementById("registracijaIme");
      postavi.innerText = "Polje 'Ime' ne sme biti prazno";
      postavi.style.color = "red";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("ime");
      postavi.style.borderColor = "red";
    }
    else{
      let postavi = document.getElementById("registracijaIme");
      postavi.innerText = "Validan podatak";
      postavi.style.color = "green";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("ime");
      postavi.style.borderColor = "green";
    }
    let prezime = document.getElementById("prezime").value;
    if(prezime === ""){
      ispravno = false;
      let postavi = document.getElementById("registracijaPrezime");
      postavi.innerText = "Polje 'Prezime' ne sme biti prazno";
      postavi.style.color = "red";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("prezime");
      postavi.style.borderColor = "red";
    }
    else{
      let postavi = document.getElementById("registracijaPrezime");
      postavi.innerText = "Validan podatak";
      postavi.style.color = "green";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("prezime");
      postavi.style.borderColor = "green";
    }
    let korisnickoIme = document.getElementById("korIme").value;
    if(korisnickoIme === ""){
      ispravno = false;
      let postavi = document.getElementById("registracijaKorIme");
      postavi.innerText = "Polje 'Korisničko ime' ne sme biti prazno";
      postavi.style.color = "red";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("korIme");
      postavi.style.borderColor = "red";
    }
    else{
      let postavi = document.getElementById("registracijaKorIme");
      postavi.innerText = "Validan podatak";
      postavi.style.color = "green";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("korIme");
      postavi.style.borderColor = "green";
    }
    let sifra = document.getElementById("sifra").value;
    if(sifra === ""){
      ispravno = false;
      let postavi = document.getElementById("registracijaSifra");
      postavi.innerText = "Polje 'Šifra' ne sme biti prazno";
      postavi.style.color = "red";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("sifra");
      postavi.style.borderColor = "red";
    }
    else{
      let postavi = document.getElementById("registracijaSifra");
      postavi.innerText = "Validan podatak";
      postavi.style.color = "green";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("sifra");
      postavi.style.borderColor = "green";
    }
    let mejl = document.getElementById("mejl").value;
    if(mejl === ""){
      ispravno = false;
      let postavi = document.getElementById("registracijaMejl");
      postavi.innerText = "Polje 'Email' ne sme biti prazno";
      postavi.style.color = "red";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("mejl");
      postavi.style.borderColor = "red";
    }
    else{
      let proba = mejl.split("@");
      let promenljiva = proba[1].split(".");
      if(proba.length == 2 && promenljiva.length >= 2){
        let postavi = document.getElementById("registracijaMejl");
        postavi.innerText = "Validan podatak";
        postavi.style.color = "green";
        postavi.style.fontSize = "1.5vh";
        postavi = document.getElementById("mejl");
        postavi.style.borderColor = "green";
      }
      else{
        ispravno = false;
        let postavi = document.getElementById("registracijaMejl");
        postavi.innerText = "Email mora biti u zadatom formatu";
        postavi.style.color = "red";
        postavi.style.fontSize = "1.5vh";
        postavi = document.getElementById("mejl");
        postavi.style.borderColor = "red";
      }
    }
    let adresa = document.getElementById("adresa").value;
    let podeli = adresa.split(" ");
    if(adresa === "" || podeli.length < 2 || !Number.isInteger(Number(podeli[podeli.length-1]))){
      ispravno = false;
      let postavi = document.getElementById("registracijaAdresa");
      postavi.innerText = "Adresa mora biti u formatu 'Ulica broj'";
      postavi.style.color = "red";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("adresa");
      postavi.style.borderColor = "red";
    }
    else{
      let postavi = document.getElementById("registracijaAdresa");
      postavi.innerText = "Validan podatak";
      postavi.style.color = "green";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("adresa");
      postavi.style.borderColor = "green";
    }
    let grad = document.getElementById("grad").value;
    let podeliGrad = grad.split(" ");
    if(grad === "" || podeliGrad.length < 2 || !Number.isInteger(Number(podeliGrad[podeliGrad.length-1])) || podeliGrad[podeliGrad.length-1] === ""){
      ispravno = false;
      let postavi = document.getElementById("registracijaGrad");
      postavi.innerText = "Podatak mora biti u formatu 'Grad poštanski broj'";
      postavi.style.color = "red";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("grad");
      postavi.style.borderColor = "red";
    }
    else{
      let postavi = document.getElementById("registracijaGrad");
      postavi.innerText = "Validan podatak";
      postavi.style.color = "green";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("grad");
      postavi.style.borderColor = "green";
    }
    let brojTelefona = document.getElementById("telefon").value;
    if(brojTelefona === "" || !Number.isInteger(Number(brojTelefona)) || brojTelefona.length<8 || brojTelefona.length>10){
      ispravno = false;
      let postavi = document.getElementById("registracijaTelefon");
      postavi.innerText = "Broj telefona mora biti u zadatom formatu";
      postavi.style.color = "red";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("telefon");
      postavi.style.borderColor = "red";
    }
    else{
      let postavi = document.getElementById("registracijaTelefon");
      postavi.innerText = "Validan podatak";
      postavi.style.color = "green";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("telefon");
      postavi.style.borderColor = "green";
    }
    let rodjendan = document.getElementById("rodjendan").value;
    let datum = new Date(rodjendan);
    let danas = new Date(new Date().toLocaleDateString())


    if(rodjendan === "" || danas<datum){
      ispravno = false;
      let postavi = document.getElementById("registracijaRodjendan");
      postavi.innerText = "Datum rođenja nije izabran ili je odabran dan u budućnosti";
      postavi.style.color = "red";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("rodjendan");
      postavi.style.borderColor = "red";
    }
    else{
      let postavi = document.getElementById("registracijaRodjendan");
      postavi.innerText = "Validan podatak";
      postavi.style.color = "green";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("rodjendan");
      postavi.style.borderColor = "green";
    }
    return ispravno
}
/*
    Funkcija za registraciju korisnika
 */
    function registrujKorisnika() {
      if(proveriValidnostRegistracije()){
        let ime = document.getElementById("ime").value;
        let prezime = document.getElementById("prezime").value;
        let korisnickoIme = document.getElementById("korIme").value;
        let sifra = document.getElementById("sifra").value;
        let mejl = document.getElementById("mejl").value;
        let adresa = document.getElementById("adresa").value;
        let grad = document.getElementById("grad").value;
        let gradUString = grad.replace(/(\d)/, ",$1");
        let brojTelefona = document.getElementById("telefon").value;
        let rodjendan = document.getElementById("rodjendan").value;
        let adresaStanovanja = adresa+", "+gradUString;
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
                
                window.location.reload();
              } else {
                window.open("../stranice_glavne/greska.html", "_self");
              }
            }
          };
        zahtev.open("POST", url + "/korisnici/" + ".json");
        zahtev.send(JSON.stringify(korisnik));
      }
  }

function promeniNaziv(string, id) {
    let naslov = document.getElementById(id);
    naslov.innerText = string;
}

function isprazniFormu(){
  window.location.reload()
}

function validacijaLogin() {
  let ispravno = true;
  let korisnickoIme = document.getElementById("loginKorIme").value;
    if(korisnickoIme === ""){
      ispravno = false;
      let postavi = document.getElementById("loginKorImeValidacija");
      postavi.innerText = "Polje 'Korisničko ime' ne sme biti prazno";
      postavi.style.color = "red";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("loginKorIme");
      postavi.style.borderColor = "red";
    }
    else{
      let postavi = document.getElementById("loginKorImeValidacija");
      postavi.innerText = "Validan podatak";
      postavi.style.color = "green";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("loginKorIme");
      postavi.style.borderColor = "green";
    }
    let sifra = document.getElementById("loginSifra").value;
    if(sifra === ""){
      ispravno = false;
      let postavi = document.getElementById("loginSifraValidacija");
      postavi.innerText = "Polje 'Lozinka' ne sme biti prazno";
      postavi.style.color = "red";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("loginSifra");
      postavi.style.borderColor = "red";
    }
    else{
      let postavi = document.getElementById("loginSifraValidacija");
      postavi.innerText = "Validan podatak";
      postavi.style.color = "green";
      postavi.style.fontSize = "1.5vh";
      postavi = document.getElementById("loginSifra");
      postavi.style.borderColor = "green";
    }

    return ispravno;
}

function Login() {
  if(validacijaLogin()){
    window.location.reload();
}}