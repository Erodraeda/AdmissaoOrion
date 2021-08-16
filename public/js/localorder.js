
// Display de jogos selecionados

let proficiencies = [];
var input = document.getElementById("jogos-input-text");

document.getElementById("jogos-select").onchange = function() {

    proficiencies.push(document.getElementById("jogos-select").value);

    input.value = proficiencies;
};