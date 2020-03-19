let temaIndex = Math.floor(Math.random()*temas.length);
let tema = temas[temaIndex];
document.title = tema.number + " - " + tema.title;
let counter = 0;
function nextElement() {
    let texto = tema.elements[counter].number + ". " + tema.elements[counter].name;
    var $div = $("<li>", { "class": "list-group-item", text: texto});
    $div.click(function () {
        if (counter < tema.elements.length) {
            nextElement();
        }
    });
    $list.append($div);
    counter++;
}
var $list = $("#sectionList");
$list.append($("<li class=\"list-group-item\">").text(tema.number + " - " + tema.title));
nextElement();
var $reloadButton = $("#reloadButton");
$reloadButton.click(function () {
    location.reload();
});