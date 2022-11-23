$(function() {
    const marked = [0,0,0,0,0,0,0,0,0];

    function finish(won) {
        if(won == 1) {
            $('div#output').html("Sie haben gewonnen!");
        } else {
            $('div#output').html("Die KI gewinnt!");
        }
        $('td').removeClass("link");
    }

    function mark(feld, wer) {
        // wer: 1=spieler 2=ki
        if(wer == 1) zeichen = "X";
        else zeichen = "O";
        marked[feld] = wer;
        
        $('td#' + feld).html(zeichen);
        $('td#' + feld).removeClass("link");
    }

    function turn() {
        const rows = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        var leer = [];
        var spieler = [];
        var ki = [];
        
        rows.forEach(function callback(row, key) {

            leer[key] = [];
            spieler[key] = [];
            ki[key] = [];

            row.forEach(cell => {
                switch (marked[cell]) {
                    case 0:
                        leer[key].push(cell);
                        break;
                    case 1:
                        spieler[key].push(cell);
                        break;
                    case 2:
                        ki[key].push(cell);
                        break;
                
                    default:
                        break;
                }
                
            });
        });

        leer.forEach(function callback(row, key) {
            if(row.length === 0) {
                // alle felder sind belegt
                if(spieler[key].length === 3) {
                    // der spieler hat 3 felder
                    finish(1);
                    return TRUE;
                }
            }
            if(row.length === 1) {
                // Nur reihen die 1 leeres feld haben
                if(ki[key].length === 2) {
                    // KI Gewinnt
                    mark(leer[key][0], 2);
                    finish(2);
                    return TRUE;
                }else if(spieler[key].length === 2) {
                    // spieler hat schon zwei felder, ki nimmt leeres feld
                    mark(leer[key][0], 2);
                    return TRUE;
                }
            }
        });
        ki.forEach(function callback(row, key) {
            if(row.length === 1) {
                // Nur reihen in denen die ki schon ein feld hat
                if(spieler[key].length === 0) {
                    // spieler hat in dieser reihe kein feld
                    // ki setzt in leeres feld
                    // ### Optimierung möglich #################
                    mark(leer[key][0], 2);
                    return TRUE;
                }
            }
        });
        spieler.forEach(function callback(row, key) {
            if(row.length === 1) {
                // Nur reihen in denen der spieler schon ein feld hat
                if(ki[key].length === 0) {
                    // ki hat in dieser reihe kein feld
                    // ki setzt in leeres feld
                    mark(leer[key][0], 2);
                    return TRUE;
                }
            }
        });
    }

    $('body').on("click", "td.link", function(e) {
        hit = $(this).attr("id");
        mark(hit, 1);
        ret = turn();
    });
});