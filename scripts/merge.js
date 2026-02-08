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
    if (!ge(number, big(0.99999999))) {
        return ""
    }
    if (depth == 0) {
        return "......"
    }
    if (ge(number, pow(big(2), big(65536)))) {
        return display_bitter_melon(
            floor(log(big(2), number)), layer) + "..."
    }
    let level = floor(add(log(big(2), number), big(0.00000001)))
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

function buy_max_upgrade(i) {
    if (ge(game.merge.bitter_melon, 
        pow(big(2), cost_upgrade(i, game.merge.upgrades[i])))) {
        game.merge.upgrades[i] = floor(add(
            div(
                log(big(2), game.merge.bitter_melon), 
                big(2 ** i)
            ),
            big(0.5)
        ))
    }
}

function generate_bitter_melon_0() {
    game.merge.bitter_melon = add(game.merge.bitter_melon, big(1))
}

function cost_bh_upgrade(i, level) {
    return mul(big(2 ** (i + 1)), add(mul(big(2), level), big(1)))
}

function bh_production() {
    return mul(
        div(
            pow(log(big(2), game.merge.bitter_melon), big(0.5)), 
            big(256)
        ), 
        pow(big(2), add(
            game.merge.black_hole.upgrades[0], 
            add(
                game.merge.black_hole.upgrades[1], 
                add(
                    game.merge.black_hole.upgrades[2],
                    game.merge.black_hole.upgrades[3]
                )
            )
        ))
    )
}

function buy_bh_upgrade(i) {
    if (ge(add(
            game.merge.black_hole.energy, big(16)
        ), 
        pow(
            big(2), 
            add(
                cost_bh_upgrade(
                    i, 
                    game.merge.black_hole.upgrades[i]
                ), big(4)
            )
        ))) {
        game.merge.black_hole.upgrades[i] = add(
            game.merge.black_hole.upgrades[i], big(1)
        )
    }
}

function display_upgrade(i) {
    if (i == 0) {
        return `<button class="merge_upgrade"
        onmousedown="buy_upgrade(0)">
    合成升级 0 (${+game.merge.upgrades[0]} / 1) <br>
    以${game.stage ? "每秒2次" : "每次2秒"}的速度自动生产苦瓜 <br>
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

function display_bh_upgrade(i) {
    if (i != 0 &&
        ge(big(0), game.merge.black_hole.upgrades[i - 1])) {
        return ``
    }
    return `<button class="bh_upgrade"
    onmousedown="buy_bh_upgrade(${i})">
    黑洞升级 ${i} (${
        format(game.merge.black_hole.upgrades[i])}) <br>
    每级使黑洞能量产量×2 <br>
    需求:黑洞大小等级达到 ${format_int(cost_bh_upgrade(i, 
        game.merge.black_hole.upgrades[i]
    ))}
</button>`
}

function display_merge() {
    if (!game.product.mb_upgrades[1]) {
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
    } else {
        return `<div class="cards">
    ${display_all_bitter_melon(game.merge.bitter_melon, big(0))}
    <br>
    ${display_upgrade(1)}
    ${display_upgrade(2)}
    ${display_upgrade(3)}
    ${display_upgrade(4)}
    ${display_upgrade(5)}
    ${display_upgrade(6)}
</div>
<hr>
<div class="black_hole">
    当你进入黑洞的时候,红豆,黄豆,绿豆的数量将被固定为产量 <br>
    并且自动购买红豆,黄豆,绿豆升级 <br>
    你有 ${format(game.merge.black_hole.energy)} 黑洞能量 <br>
    你每秒生产 ${format(bh_production())} 黑洞能量 <br>
    你的黑洞能量使苦瓜产量乘以 ${
        format(pow(big(2), game.merge.black_hole.energy))
    } <br>
    你的黑洞大小为 ${
        format(div(game.merge.black_hole.energy, big(16)))
    } mm<sup>3</sup> <br>
    黑洞大小等级为 ${format_int(
        sub(   
            log(
                big(2), add(game.merge.black_hole.energy, big(16))
            ), 
            big(4)
        ))
    } <br>
    ${display_bh_upgrade(0)}
    ${display_bh_upgrade(1)}
    ${display_bh_upgrade(2)}
    ${display_bh_upgrade(3)}
</div>`
    }
}

function update_merge() {
    if (game.merge.upgrades[0]) {
        game.merge.bitter_melon = add(
            game.merge.bitter_melon, mul(mul(pow(big(2), 
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
            ), big(0.025 * (game.stage ? 4 : 1))), 
            mul(
                mul(
                    add(
                        div(game.product.red_bean, big(256)), 
                        big(1)
                    ),
                    mul(
                        add(
                            div(game.product.soya_bean, big(1024)), 
                            big(1)
                        ),
                        add(
                            div(game.product.mung_bean, big(4096)), 
                            big(1)
                        )
                    )
                ), 
                pow(big(2), game.merge.black_hole.energy)
            )
        ))
    }
    if (game.product.mb_upgrades[1]) {
        game.merge.black_hole.energy = add(
            game.merge.black_hole.energy,
            mul(
                bh_production(), big(0.05)
            )
        )
    }
    if (game.merge.upgrades[7]) {
        buy_max_upgrade(1)
        buy_max_upgrade(2)
        buy_max_upgrade(3)
        buy_max_upgrade(4)
        buy_max_upgrade(5)
        buy_max_upgrade(6)
    }
    if (option == 0) {
        content.innerHTML = display_merge()
    }
}
