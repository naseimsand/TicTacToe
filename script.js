$(function() {
    const marked = [0,0,0,0,0,0,0,0,0];
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
    const values = [10,7,10,7,14,7,10,7,10];

    function finish(won = 0) {
        if(won > 0) {
            if(won == 1) {
                $('div#output').html("Sie haben gewonnen!");
            } else {
                $('div#output').html("Die KI gewinnt!");
            }
            $('td').removeClass("link");
        } else {
            rows.forEach(row => {
                let player = 0;
                let ki = 0;
                row.forEach(feld => {
                    if(marked[feld] == 1) player = player + 1;
                    if(marked[feld] == 2) ki = ki + 1;
                });
                if(player == 3) finish(1);
                if(ki == 3) finish(2);
            });
        }
    }

    function mark(feld, wer) {
        // wer: 1=spieler 2=ki
        if(wer == 1) zeichen = "X";
        else zeichen = "O";
        marked[feld] = wer;
        
        $('td#' + feld).html(zeichen);
        $('td#' + feld).removeClass("link");
        finish();
    }

    function turn() {
        
        var prio = [];
        var tempprio = 0;
        
        marked.forEach(function my(mark, index) {
            if(mark == 0) {
                tempprio = values[index];
                
                for(let row of rows) {
                    var player = 0;
                    var ki = 0;
                    if(row.includes(index)) {
                        for(let field of row) {
                            if(marked[field] == 1) {
                                player = player + 1;
                            }else if(marked[field] == 2) {
                                ki = ki + 1;
                            }
                        }
                        if(ki == 1 && player == 0) tempprio = tempprio + 6;
                        if(player == 1) tempprio = tempprio - 3;
                        if(player == 2) tempprio = 90;
                        if(ki == 2) tempprio = 100;
                    }
                }

            } else {
                tempprio = 0;
            }
            prio.push(tempprio);
        });

        let pick = 0;
        let lastprio = 0;

        prio.forEach(function callback(value, index) {
            if(value > lastprio) {
                pick = index;
                lastprio = value;
            }
        });

        return pick;
    }

    $('body').on("click", "td.link", function(e) {
        hit = $(this).attr("id");
        mark(hit, 1);
        if(marked.includes(0)) {
            ret = turn();
            mark(ret, 2);
        }
    });
});