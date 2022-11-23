<?php

function defend($hit, $marks) {
    $rows = array(
        array(0,1,2),
        array(3,4,5),
        array(6,7,8),
        array(0,3,6),
        array(1,4,7),
        array(2,5,8),
        array(0,4,8),
        array(2,4,6)
    );

    $marks[$hit] = 1;
    $leer = array();
    $spieler = array();
    $ki = array();
    
    foreach($rows As $key => $row) {
        $leer[$key] = array();
        $spieler[$key] = array();
        $ki[$key] = array();

        foreach($row As $cell) {
            switch($marks[$cell]) {
                case 0 : 
                    $leer[$key][] = $cell;
                    break;
                case 1 :
                    $spieler[$key][] = $cell;
                    break;
                case 2 : 
                    $ki[$key][] = $cell;
                    break;
            }
        }    
    }
    foreach($leer As $key => $row) {
        if(count($row) === 1) {
            # Nur reihen die 1 leeres feld haben
            if(count($ki[$key]) === 2) {
                # Gewonnen
                $marks[$leer[$key][0]] = 2;
                return $marks;
            }elseif(count($spieler[$key]) === 2) {
                # Spieler hat in dieser reihe zwei felder, ki nimmt leeres feld
                $marks[$leer[$key][0]] = 2;
                return $marks;
            }
        }
    }
    foreach($ki As $key => $row) {
        if(count($row) === 1) {
            # nur reihen in denen die ki schon ein feld hat
            if(count($spieler) === 0) {
                # spieler hat in dieser reihe kein feld
                # ki setzt in erstem leeren feld
                ### Optimierungs möglichkeit #############################
                $marks[$leer[$key][0]] = 2;
                return $marks;
            }
        }
    }
    foreach($spieler As $key => $row) {
        if(count($row) === 1) {
            # nur reihen in denen der spieler schon ein feld hat
            if(count($spieler) === 0) {
                # ki hat in dieser reihe kein feld
                # ki setzt in erstem leeren feld
                $marks[$leer[$key][0]] = 2;
                return $marks;
            }
        }
    }
    return $marks;
}

echo $marks = defend($_POST['hit'], $_POST['marks']);