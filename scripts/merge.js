function display_bitter_melon(level, layer) {
    return `<div class="card">
    等级 <br>
    ${format_int(level)} <br>
    层级 <br>
    ${format_int(layer)} <br>
    阶段 ${game.stage} <br>
</div>`
}

function display_all_bitter_melon(number, layer, depth = 10) {
    if (!ge(number, big(0.999999999999))) {
        return ""
    }
    if (depth == 0) {
        return "......"
    }
    if (ge(number, pow(big(2), big(65536)))) {
        return display_bitter_melon(
            floor(log(big(2), number)), layer) + "..."
    }
    let level = floor(add(log(big(2), number), big(0.000000000001)))
    let remain = sub(number, pow(big(2), level))
    return display_bitter_melon(level, layer) + 
        display_all_bitter_melon(remain, layer, depth - 1)
}

function cost_upgrade(i, level) {
    return mul(big(2 ** (i - 1)), add(mul(big(2), level), big(1)))
}

function buy_upgrade(i) {
    if (i == 0 && !game.merge.upgrades[0]) {
        if (ge(game.merge.bitter_melon, big(16))) {
            game.merge.upgrades[0] = true
        }
        return
    }
    if (i == 7 && !game.merge.upgrades[7]) {
        if (ge(game.merge.bitter_melon, pow(big(2), big(1024)))) {
            game.merge.upgrades[7] = true
        }
        return
    }
    if (ge(game.merge.bitter_melon, 
        pow(big(2), cost_upgrade(i, game.merge.upgrades[i])))) {
        game.merge.upgrades[i] = add(game.merge.upgrades[i], big(1))
    }
}

function generate_bitter_melon_0() {
    game.merge.bitter_melon = add(game.merge.bitter_melon, big(1))
}

function display_upgrade(i) {
    if (i == 0) {
        return `<button class="merge_upgrade"
        onmousedown="buy_upgrade(0)">
    合成升级 0 (${+game.merge.upgrades[0]} / 1) <br>
    以每次4秒的速度自动生产苦瓜 <br>
    需求:等级达到 4
</button>`
    }
    if (i == 7) {
        return `<button class="merge_upgrade"
        onmousedown="buy_upgrade(7)">
    合成升级 7 (${+game.merge.upgrades[7]} / 1) <br>
    自动购买合成升级1~6 <br>
    需求:等级达到 1024
</button>`
    }
    if (ge(big(0), game.merge.upgrades[i - 1]) && i != 1) {
        return ``
    }
    return `<button class="merge_upgrade"
        onmousedown="buy_upgrade(${i})">
    合成升级 ${i} (${format(game.merge.upgrades[i])}) <br>
    每级使自动生产的苦瓜等级+1 <br>
    需求:等级达到
    ${format_int(cost_upgrade(i, game.merge.upgrades[i]))}
</button>`
}

function display_merge() {
    return `<div class="cards">
    ${display_all_bitter_melon(game.merge.bitter_melon, big(0))}
</div>
<div class="work">
    两个等级相等的苦瓜可以合成一个高一级的苦瓜 <br>
    <button class="produce" 
        onmousedown="generate_bitter_melon_0()">
        生产一个 0 级苦瓜
    </button> <br>
    ${display_upgrade(0)}
    ${display_upgrade(1)}
    ${display_upgrade(2)}
    ${display_upgrade(3)}
    <br>
    ${display_upgrade(4)}
    ${display_upgrade(5)}
    ${display_upgrade(6)}
    ${display_upgrade(7)}
</div>`
}

function update_merge() {
    if (game.merge.upgrades[0]) {
        game.merge.bitter_melon = add(
            game.merge.bitter_melon, mul(pow(big(2), 
            add(game.merge.upgrades[1], 
                add(game.merge.upgrades[2],
                    add(game.merge.upgrades[3],
                        add(game.merge.upgrades[4], 
                            add(game.merge.upgrades[5],
                                game.merge.upgrades[6]
                            )
                        )
                    )
                )
            )
        ), big(0.0125)))
    }
    if (option == 0) {
        content.innerHTML = display_merge()
    }
}
