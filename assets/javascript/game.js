$(document).ready(function() {

    $("#kirkanos").on("click", selectedCharacter(kirkanos));
    $("#starkiller").on("click", selectedCharacter(starkiller));
    $("#marajade").on("click", selectedCharacter(marajade));
    $("#tenelka").on("click", selectedCharacter(tenelka));

    function selectedCharacter() {
        kirkanos = $("#chosen-character").html("<button id='kirkanos'><img src='assets/images/kirkanos.jpg' height='150px' width='150px'></button>");
        starkiller = $("#chosen-character").html("<button id='starkiller'><img src='assets/images/starkiller3.jpg' height='150px' width='150px'> </button>");
        marajade = $("#chosen-character").html("<button id='marajade'><img src='assets/images/marajade.jpg' height='150px' width='150px'> </button>");
        tenelka = $("#chosen-character").html("<button id='tenelka'><img src='assets/images/tenelka2.jpg' height='150px' width='150px'> </button>");
};

});
