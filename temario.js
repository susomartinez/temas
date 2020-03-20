let temaIndex, tema, counter;
let inTopics = []
let outTopics = [];
let availableTopics = [];

var $list = $("#sectionList");
var $reloadButton = $("#reloadButton");
$reloadButton.click(function () {
    newTopic(inTopics, outTopics);
    let url = new URL(window.location.href);
    url.searchParams.set('out', 42);
    // let urlParams = new URLSearchParams(window.location.search);
    // urlParams.set('out', "test");
    // console.log("URLParams: ", urlParams.toString());
    // console.log("Window loc: ", window.location);
    //window.location.href = urlParams.toString();
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
            $("html, body").animate({ scrollTop: $(document).height() }, 1000); // Scroll to the bottom of the page in order to see the new element
        } else {
            // Update the URL parameters
            let url = new URL(window.location.href);
            outTopics.push(tema.number);
            if (outTopics.length < temas.length) {
                url.searchParams.set('out', outTopics.toString());
            } else {
                url.searchParams.delete('out');
            }
            window.location.href = url.href;
        }
    });
    $list.append($div);
    counter++;
}
