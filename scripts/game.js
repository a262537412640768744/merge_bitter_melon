let game = {
    plot: -1,
    stage: 0,
    merge: {
        bitter_melon: big(1), 
        upgrades: [
            false, big(0), big(0), big(0), 
            big(0), big(0), big(0), false
        ]
    }
}

let game_load = JSON.parse(localStorage.getItem("merge_bitter_melon"))

function property(a, b) {
    for (let p in b) {
        if (typeof a[p] === "object") {
            property(a[p], b[p])
        } else {
            a[p] = b[p]
        }
    }
}

if (game_load) {
    property(game, game_load)
}

function save() {
    localStorage.setItem("merge_bitter_melon", JSON.stringify(game))
}

let content = document.querySelector("div.content")
