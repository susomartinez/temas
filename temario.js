let temaIndex, tema, counter;
var $list = $("#sectionList");
var $reloadButton = $("#reloadButton");
$reloadButton.click(function () {
    newTopic();
});
newTopic();

function newTopic() {
    // Clean the UI
    $list.empty();
    // Choose new topic
    temaIndex = Math.floor(Math.random() * temas.length);
    tema = temas[temaIndex];
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
            newTopic();
        }
    });
    $list.append($div);
    counter++;
}
