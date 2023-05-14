function dodajSliku() {
    let polje = document.createElement("input");
    polje.type = "url";
    polje.onclick = dodajSliku;
    let prelom = document.createElement("br");
    let roditelj = document.getElementsByName("prikazi_destinaciju")[0];
    roditelj.appendChild(prelom);
    roditelj.appendChild(polje);
}

