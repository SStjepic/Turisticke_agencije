function dodajSliku() {
    let polje = document.createElement("input");
    polje.type = "url";
    polje.onclick = dodajSliku;
    let prelom = document.createElement("br");
    let roditelj = document.getElementsByName("prikazi_destinaciju")[0];
    roditelj.appendChild(prelom);
    roditelj.appendChild(polje);
}
/*
    Funkcija za registraciju korisnika
 */
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
    let adresaStanovanja = adresa+", "+grad.split(" ")[0]+", "+grad.split(" ")[1];
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
            console.log("Uspesno")
          } else {
            window.open("../stranice_glavne/greska.html", "_self");
          }
        }
      };
    zahtev.open("POST", url + "/korisnici/" + ".json");
    zahtev.send(JSON.stringify(korisnik));
}

function promeniNaziv(string, id) {
    let naslov = document.getElementById(id);
    naslov.innerText = string;
}

function isprazniFormu(){
  window.location.reload()
}