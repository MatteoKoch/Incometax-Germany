const maxwidth = 500000;
const maxheight = .6;

const grenzen2 = {
    0: {
        "grenze": 0,
        "obergrenze": 10908,
        "prozent": 0,
        "konstant": true
    },
    1: {
        "grenze": 10909,
        "obergrenze": 15999,
        "prozent": .14,
        "konstant": false
    },
    2: {
        "grenze": 15999,
        "obergrenze": 62809,
        "prozent": .24,
        "konstant": false
    },
    3: {
        "grenze": 62810,
        "obergrenze": 277824,
        "prozent": .42,
        "konstant": true
    },
    4: {
        "grenze": 277825,
        "obergrenze": maxwidth,
        "prozent": .45,
        "konstant": true
    }
}

// Abschnitt 0%
canvas.line(
    map(grenzen2[0].grenze, 0, maxwidth, 0, width),
    map(grenzen2[0].prozent, 0, maxheight, height-5, 0),
    map(grenzen2[1].grenze, 0, maxwidth, 0, width),
    map(grenzen2[0].prozent, 0, maxheight, height-5, 0),
    "red",
    3
)
// Abschnitt 0% - 14%
canvas.line(
    map(grenzen2[1].grenze, 0, maxwidth, 0, width),
    map(grenzen2[0].prozent, 0, maxheight, height-5, 0),
    map(grenzen2[1].grenze, 0, maxwidth, 0, width),
    map(grenzen2[1].prozent, 0, maxheight, height-5, 0),
    "green",
    3
)
// Abschnitt 14% - 24%
canvas.line(
    map(grenzen2[1].grenze, 0, maxwidth, 0, width),
    map(grenzen2[1].prozent, 0, maxheight, height-5, 0),
    map(grenzen2[2].grenze, 0, maxwidth, 0, width),
    map(grenzen2[2].prozent, 0, maxheight, height-5, 0),
    "blue",
    3
)
// Abschnitt 24% - 42%
canvas.line(
    map(grenzen2[2].grenze, 0, maxwidth, 0, width),
    map(grenzen2[2].prozent, 0, maxheight, height-5, 0),
    map(grenzen2[3].grenze, 0, maxwidth, 0, width),
    map(grenzen2[3].prozent, 0, maxheight, height-5, 0),
    "red",
    3
)
// Abschnitt 42%
canvas.line(
    map(grenzen2[3].grenze, 0, maxwidth, 0, width),
    map(grenzen2[3].prozent, 0, maxheight, height-5, 0),
    map(grenzen2[4].grenze, 0, maxwidth, 0, width),
    map(grenzen2[3].prozent, 0, maxheight, height-5, 0),
    "green",
    3
)
// Abschnitt 42% - 45%
canvas.line(
    map(grenzen2[4].grenze, 0, maxwidth, 0, width),
    map(grenzen2[3].prozent, 0, maxheight, height-5, 0),
    map(grenzen2[4].grenze, 0, maxwidth, 0, width),
    map(grenzen2[4].prozent, 0, maxheight, height-5, 0),
    "blue",
    3
)
// Abschnitt 45%
canvas.line(
    map(grenzen2[4].grenze, 0, maxwidth, 0, width),
    map(grenzen2[4].prozent, 0, maxheight, height-5, 0),
    map(maxwidth, 0, maxwidth, 0, width),
    map(grenzen2[4].prozent, 0, maxheight, height-5, 0),
    "red",
    3
)

let sum = 0;
let index = 0;
let stavg;
let grenzenindex = 0;
for(let i = 0; i < maxwidth; i+=100) {

    // Wenn i einen neuen Bereich erreicht, an dem sich der Prozentsatz ändert, dann erhöhe den "grenzindex" um 1 und zeichne einen Kreis und ein Label
    if(i/grenzen2[grenzenindex].obergrenze > 1) {
        ++grenzenindex;
        canvas.ellipse(
            map(grenzen2[grenzenindex].grenze, 0, maxwidth, 0, width),
            map(grenzen2[grenzenindex].prozent, 0, maxheight, height, 0),
            10,
            10,
            "rgba(0,0,0,.5)",
            grenzenindex
        );
        canvas.label(
            map(grenzen2[grenzenindex].grenze, 0, maxwidth, 0, width),
            map(grenzen2[grenzenindex].prozent, 0, maxheight, height, 0),
            `Grenzsteuersatz bei ${i}€`,
            `Prozent: ${grenzen2[grenzenindex].prozent}%`,
            grenzenindex
        );
    }

    // Wenn der "konstant" key true ist, dann summiere nur den prozentsatz auf, falls nicht, dann bilde eine Gerade dazwischen und summiere die Werte dieser auf
    sum += grenzen2[grenzenindex].konstant?
        grenzen2[grenzenindex].prozent
        : map(i, grenzen2[grenzenindex].grenze, grenzen2[grenzenindex].obergrenze, grenzen2[grenzenindex].prozent, grenzen2[grenzenindex+1].prozent);

    ++index;
    stavg = sum / index;

    // Zeige den durchschnittlichen Prozentsatz and und die labels dazu
    if(i % 9000 == 0) {
        canvas.ellipse(
            map(i, 0, maxwidth, 0, width),
            map(stavg, 0, maxheight, height-5, 0),
            10,
            10,
            "rgba(0,0,0,.5)",
            index
        );
        canvas.label(
            map(i, 0, maxwidth, 0, width),
            map(stavg, 0, maxheight, height-5, 0),
            `Durchschnittssteuersatz bei ${i}€`,
            `Prozent: ${`${100*stavg}`.slice(0, 4)}%`,
            index
        )
    } else {
        canvas.ellipse(
            map(i, 0, maxwidth, 0, width),
            map(stavg, 0, maxheight, height-5, 0),
            1
        );
    }
}
