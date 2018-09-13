// Global Objects ======================================================================================================

let roster = {};
let game = {};

// Functions Outlining the Initial Game Starting Conditions ============================================================

function startGame() {
    roster = resetRoster();
    game = resetGame();

    displayRoster();

}

function resetRoster() {
    return {
        'exarkun' : {
            name: 'Exar Kun',
            health: '80',
            attack: '8',
            counterattack: '10',
            image: 'assets/images/exarkun2.jpg',
        },
        'kirkanos' : {
            name: 'Kir Kanos',
            health: '180',
            attack: '10',
            counterattack: '15',
            image: 'assets/images/kirkanos.jpg',
        },
        'marajade' : {
            name: 'Mara Jade',
            health: '120',
            attack: '9',
            counterattack: '12',
            image: 'assets/images/marajade.jpg',
        },
        'starkiller' : {
            name: 'Starkiller',
            health: '150',
            attack: '12',
            counterattack: '15',
            image: 'assets/images/starkiller3.jpg',
        },
        'tenelka' : {
            name: 'Tenel Ka',
            health: '100',
            attack: '8',
            counterattack: '12',
            image: 'assets/images/tenelka2.jpg',
        },
    }
}

function resetGame() {
    return {
        chosenCharacter: null,
        chosenRival: null,
        enemiesLeft: 0,
        attackLog: 0,
    }
}
function displayRoster() {
    var stats = Object.keys(roster);
    for (var i = 0; i < stats.length; i++) {
        var cardStats = stats[i];
        var character = roster[cardStats];
        var card = createCharacterCards(character, cardStats);
        $("#roster").append(card);
    }
}

function createCharacterCards(character, key) {
    var card = $("<div class='character_card' data-name='" + key + "'>");
    var cardname = $("<div class='card_name'>").text(character.name);
    var cardimage = $("<img class='card_image' alt='image'>").attr('src',character.image);
    var cardhealth = $("<div class='card_health'>").text(character.health);
    card.append(cardname, cardimage, cardhealth);

    return card;
}



// Functions to be Called During Gameplay ==============================================================================

function displayEnemyRoster(chosenCard) {
    var enemyStats = Object.keys(roster);
    for (var j = 0; j < enemyStats.length; j++) {
        if (enemyStats[j] !== chosenCard) {
            var enemyCardStats = enemyStats[j];
            var enemy = roster[enemyCardStats];
            var enemyRoster = createCharacterCards(enemy, enemyCardStats);
            $(enemyRoster).removeClass('character_card');
            $(enemyRoster).addClass('enemy_card');
            $("#enemies-roster").append(enemyRoster);
        }
    }
}

function selectDefender() {
    $(".enemy_card").on("click", function() {
        var selectedEnemyCard = $(this).attr('data-name');
        game.chosenRival = roster[selectedEnemyCard];
        $(this).addClass('rival');
        $("#defender").append(this);
        $(".enemy_card").off("click");
        $(".row-header-enemies").hide();
        $("#result").empty();
        $(".row-header-fight, .row-header-defender, #attack-btn").show();
    });

}

function attack(attackLog) {
    game.attackDamage = game.chosenCharacter.attack * attackLog;
    game.chosenRival.health -= game.attackDamage;
}

function counterattack() {
    game.chosenCharacter.health -= game.chosenRival.counterattack;
}

function checkHealthStats() {
    if (game.chosenCharacter.health <=0) {
        $("#chosen-character, #defender").empty();
        $(".row-header-chosen, .row-header-fight, .row-header-defender, #attack-btn, #battle-stats-display").hide();
        $("#result").html("Alas... you were defeated by " + game.chosenRival.name + ".  Click 'Reset Game' if you wish to play again.");
        $("#reset-btn").show();
    } else if (game.chosenRival.health <= 0) {
        game.enemiesLeft--;
        $(".row-header-fight, .row-header-defender, #attack-btn").hide();
        $("#defender").empty();
        if (game.enemiesLeft === 0) {

            $("#battle-stats-display").hide();
            $("#result").html("You were Victorious!  All Opponents have been Defeated!  Click 'Reset Game' if you wish to play again.");
            $("#reset-btn").show();
        } else {
            $("#battle-stats-display").hide();
            $("#result").html("You have bested " + game.chosenRival.name + ".  Select your next opponent to fight.");
            $(".row-header-enemies").show();
            selectDefender();
        }
    }
}

function cleargameboard() {
    $(".row-header-roster, #roster").show();
    $(".row-header-chosen, .row-header-enemies, .row-header-fight, .row-header-defender, #attack-btn").hide();
    $("#chosen-character, #enemies-roster, #defender, #result").empty();
}

// The Main Event ======================================================================================================

$(document).ready(function() {

    $("#roster").on("click", ".character_card", function() {
        var selectedCard = $(this).attr('data-name');
        game.chosenCharacter = roster[selectedCard];
        $(this).addClass('hero');
        $(".row-header-chosen").show();
        $("#chosen-character").append(this);
        $(".row-header-roster").hide();

        $(".row-header-enemies").show();
        displayEnemyRoster(selectedCard);
        game.enemiesLeft = Object.keys(roster).length - 1;

        console.log(game.enemiesLeft);

        $("#roster").empty();

        selectDefender();
    });

    $("#attack-btn").on("click", function() {
        game.attackLog++;
        attack (game.attackLog);
        counterattack();
        $(".hero .card_health").html(game.chosenCharacter.health);
        $(".rival .card_health").html(game.chosenRival.health);
        $("#attack_stats").html(game.chosenCharacter.name + " attacked for " + (game.chosenCharacter.attack * game.attackLog) + " damage.");
        $("#counter_attack_stats").html(game.chosenRival.name + " counter-attacked for " + game.chosenRival.counterattack + " damage.");
        $("#battle-stats-display").show();
        checkHealthStats();

        console.log(game);
    });

    $("#reset-btn").on("click", function() {
        cleargameboard();
        startGame();
        $("#reset-btn").hide();
    });

    startGame();
});