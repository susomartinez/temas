let temaIndex, tema, counter;
let inTopics = []
let outTopics = [];
let availableTopics = [];

var $list = $("#sectionList");
var $reloadButton = $("#reloadButton");
$reloadButton.click(function () {
    newTopic(inTopics, outTopics);
});
getPreviousTopics();
newTopic(inTopics, outTopics);

function getPreviousTopics() {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('in')) {
        let ins = urlParams.get('in').split(",");
        for (str of ins) {
            inTopics.push(Number.parseInt(str));
        }
    }
    if (urlParams.has('out')) {
        let outs = urlParams.get('out').split(",");
        for (str of outs) {
            outTopics.push(Number.parseInt(str));
        }
    }
}

function newTopic(ins, outs) {
    // Clean the UI
    $list.empty();
    // Empty availableTopics
    availableTopics.splice(0);
    // Take out banned topics
    if (ins.length == 0) {
        availableTopics = temas.filter(function (tema) {
            return !(outs.includes(tema.number));
        });
    } else { // Choose only inTopics
        availableTopics = temas.filter(function (tema) {
            return ins.includes(tema.number);
        });
    }
    // Choose new topic from the available ones
    temaIndex = Math.floor(Math.random() * availableTopics.length);
    tema = availableTopics[temaIndex];
    document.title = tema.number + " - " + tema.title;
    counter = 0;
    $list.append($("<li class=\"list-group-item\">").text(tema.number + " - " + tema.title));
    nextElement();
}

function nextElement() {
    let texto = tema.elements[counter].number + ". " + tema.elements[counter].name;
    var $div = $("<li>", { "class": "list-group-item", text: texto });
    $div.click(function () {
        if (counter < tema.elements.length) {
            nextElement();
        } else {
            newTopic(inTopics, outTopics);
        }
    });
    $list.append($div);
    counter++;
}
