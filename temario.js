let temaIndex, tema, counter;
let inTopics = []
let outTopics = [];
let availableTopics = [];

var $list = $("#sectionList");
var $temasDropdown = $("#temasDrop");
var $changeButton = $("#changeButton");
$changeButton.click(function () {
    newTopic(inTopics, outTopics);
});
var $resetButton = $("#resetButton");
$resetButton.click(function () {
    let url = new URL(window.location.href);
    url.searchParams.delete('in');
    url.searchParams.delete('out');
    window.location.href = url.href;
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
    // Empty availableTopics
    availableTopics.splice(0);
    $temasDropdown.empty();
    // Take out banned topics
    if (ins.length == 0) {
        availableTopics = temas.filter(function (tema, index) {
            let $topic = $("<button class=\"dropdown-item\" type=\"button\">").text(tema.number + " - " + tema.title.slice(0,15) + "...");
            $topic.click(function () {
                getTopic(index);
            });
            if (outs.includes(tema.number)) $topic.addClass("disabled");
            $temasDropdown.append($topic);
            return !(outs.includes(tema.number));
        });
    } else { // Choose only inTopics
        availableTopics = temas.filter(function (tema) {
            if (ins.includes(tema.number)) {
                $temasDropdown.append($("<button class=\"dropdown-item\" type=\"button\">").text(tema.number + " - " + tema.title));
            }
            return ins.includes(tema.number);
        });
    }
    // Choose new topic from the available ones
    temaIndex = Math.floor(Math.random() * availableTopics.length);
    getTopic(temas.indexOf(availableTopics[temaIndex]));
}

function getTopic(topicIndex) {
    // Clean the UI
    $list.empty();
    tema = temas[topicIndex];
    document.title = tema.number + " - " + tema.title;
    counter = 0;
    $dropTitle = $("#dropButton");
    $dropTitle.text(tema.number + " - " + tema.title);
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
