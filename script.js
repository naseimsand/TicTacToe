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
    const values = [11,7,11,7,10,7,11,7,11];
    let finished = 0;

    function getMaxOfArray(numArray) {
        return Math.max.apply(null, numArray);
    }  

    function find(needle, haystack) {
        var results = [];
        var idx = haystack.indexOf(needle);
        while (idx != -1) {
            results.push(idx);
            idx = haystack.indexOf(needle, idx + 1);
        }
        return results;
    }

    function isfinish() {
        if(marked.includes(0) == false) {
            finished = 1;
            finish(0);
        }
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

    function finish(won) {
        finished = 1;
        if(won == 1) {
            $('div#output').html("Sie haben gewonnen!");
        } else if(won == 2) {
            $('div#output').html("Die KI gewinnt!");
        } else {
            $('div#output').html("Niemand hat gewonnen!");
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
        isfinish();
    }

    function turn() {
        
        var prio = [];
        var tempprio = 0;
        var panic = 0;
        
        marked.forEach(function my(marking, index) {
            if(marking == 0) {
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
                        if(player == 2) {
                            tempprio = 150;
                            break;
                        }
                        if(ki == 2) {
                            tempprio = 200;
                            break;
                        }
                        if(index == 4 && player == 1 && ki == 0) {
                            panic++;
                        }
                        if(panic == 2) {
                            tempprio = 100;
                            break;
                        }
                    }
                }

            } else {
                tempprio = 0;
            }
            prio.push(tempprio);
        });
        
        var count = 0;
        var temp = 0;
        for(var i = 0; i < marked.length; ++i){
            if(marked[i] == 0)
                count++;
            if(marked[i] == 1)
                temp = i;
        }
        if(count == 8) {
            [0,1,2,3,5,6,7,8].forEach(element => {
                if(temp == element) prio[8-element] = 100;       
            });
        }

        console.log(prio)

        let maxprio = getMaxOfArray(prio);
        const pick = find(maxprio, prio)[Math.floor(Math.random() * find(maxprio, prio).length)];
        
        return pick;
    }

    $('body').on("click", "td.link", function() {
        $("input").remove();
        hit = $(this).attr("id");
        mark(hit, 1);
        if(finished == 0) {
            ret = turn();
            mark(ret, 2);
        }
    });

    $('body').on("click", "input", function() {
        $("input").remove();
        ret = turn();
        mark(ret, 2);
    });
});