let current_layer_index = -1
const layer_jump_finite = [
    pow(big(2), big(256)),
    pow(big(2), pow(big(2), big(256))),
    pow10(pow(big(2), pow(big(2), big(256)))),
    pow10(pow10(pow(big(2), pow(big(2), big(256))))),
    pow10(pow10(pow10(pow(big(2), pow(big(2), big(320)))))),
    pow10(pow10(pow10(pow10(
        pow(big(2), pow(big(2), big(384))))))),
    pow10(pow10(pow10(pow10(pow10(
        pow(big(2), pow(big(2), big(448)))))))),
    pow10(pow10(pow10(pow10(pow10(pow10(
        pow(big(2), pow(big(2), big(512))))))))),
    pow10(pow10(pow10(pow10(pow10(pow10(pow10(
        pow(big(2), pow(big(2), big(768))))))))))
]

function display_layer(a, b, c) {
    if (c == 10) {
        return `ω`
    }
    return `${c}`
}

function display_bitter_melon(level, layer) {
    return `<div class="card">
    等级 <br>
    ${format_int(level)} <br>
    层级 <br>
    ${display_layer(layer[0], layer[1], layer[2])} <br>
    阶段 ${game.stage} <br>
</div>`
}

function display_all_bitter_melon(number, layer, depth = 10) {
    if (!ge(number, big(0.999999999))) {
        return ""
    }
    if (depth == 0) {
        return "......"
    }
    if (ge(number, pow(big(2), big(65536)))) {
        return display_bitter_melon(
            floor(log(big(2), number)), layer) + "......"
    }
    let level = floor(add(log(big(2), number), big(0.000000001)))
    let remain = sub(number, pow(big(2), level))
    return display_bitter_melon(level, layer) + 
        display_all_bitter_melon(remain, layer, depth - 1)
}

function cost_upgrade(i, level) {
    return mul(big(2 ** (i - 1)), add(mul(big(2), level), big(1)))
}

function buy_upgrade(i) {
    if (i == 0) {
        if (game.merge.upgrades[0]) return
        if (ge(game.merge.bitter_melon, big(16))) {
            game.merge.upgrades[0] = true
        }
        return
    }
    if (i == 7) {
        if (game.merge.upgrades[7]) return
        if (ge(game.merge.bitter_melon, pow(big(2), big(1024)))) {
            game.merge.upgrades[7] = true
        }
        return
    }
    if (i == 8) {
        if (game.merge.upgrades[8]) return
        if (ge(game.merge.bitter_melon, pow(
                big(2), layer_jump_finite[3]))) {
            game.merge.upgrades[8] = true
        }
        return
    }
    if (ge(game.merge.bitter_melon, 
        pow(big(2), cost_upgrade(i, game.merge.upgrades[i])))) {
        game.merge.upgrades[i] = add(game.merge.upgrades[i], big(1))
    }
}

function find_layer(a, b, c) {
    for (let l of game.merge.layer) {
        if (l.layer[0] == a && l.layer[1] == b && l.layer[2] == c) {
            return l
        }
    }
}

function buy_layer_upgrade(i, layer_index) {
    if (i == 0) {
        if (game.merge.layer[layer_index].upgrades[0]) return
        if (
            game.merge.layer[layer_index].layer[0] == 0 &&
            game.merge.layer[layer_index].layer[1] == 0 &&
            game.merge.layer[layer_index].layer[2] == 1
        ) {
            if (ge(
                    game.merge.bitter_melon, 
                    pow(big(2), big(4096))
                )) {
                game.merge.layer[layer_index].upgrades[0] = true
            }
            return
        }
        if (ge(find_layer(
                game.merge.layer[layer_index].layer[0], 
                game.merge.layer[layer_index].layer[1], 
                game.merge.layer[layer_index].layer[2] - 1, 
            ).bitter_melon, pow(big(2), big(256)))) {
            game.merge.layer[layer_index].upgrades[0] = true
        }
        return
    }
    if (i == 7) {
        if (game.merge.layer[layer_index].upgrades[7]) return
        if (ge(
                game.merge.layer[layer_index].bitter_melon, 
                pow(big(2), big(
                    (game.merge.layer[layer_index].layer[2] >= 5
                    &&
                    game.merge.upgrades[8])
                    ?
                    256 : 1024
                ))
            )) {
            game.merge.layer[layer_index].upgrades[7] = true
        }
        return
    }
    if (ge(game.merge.layer[layer_index].bitter_melon, 
        pow(big(2), cost_upgrade(
            i, 
            game.merge.layer[layer_index].upgrades[i]
        )))) {
        game.merge.layer[layer_index].upgrades[i] = add(
            game.merge.layer[layer_index].upgrades[i], 
            big(1)
        )
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

function buy_max_layer_upgrade(i, layer) {
    if (ge(layer.bitter_melon, 
        pow(big(2), cost_upgrade(i, layer.upgrades[i])))) {
        layer.upgrades[i] = floor(add(
            div(
                log(big(2), layer.bitter_melon), 
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

function layer_jump_cost(a, b, c) {
    return layer_jump_finite[c - 1]
}

function layer_jump(a, b, c) {
    if (game.stage < 3 && c == 9) {
        alert("需解锁序数理论")
        return
    }
    if (ge(game.merge.bitter_melon, 
        pow(big(2), layer_jump_cost(a, b, c)))) {
        game.merge.layer.push({
            layer: [a, b, c + 1],
            bitter_melon: big(1),
            upgrades: [
                false, big(0), big(0), big(0),
                big(0), big(0), big(0), false
            ]
        })
    }
}

function display_upgrade(i) {
    if (i == 0) {
        return `<button class="merge_upgrade"
        onmousedown="buy_upgrade(0)">
    合成升级 0 (${+game.merge.upgrades[0]} / 1) <br>
    以${game.stage ? "每秒2次" : "每秒1次"}的速度自动生产苦瓜 <br>
    需求:等级达到 4
</button>`
    }
    if (i == 7) {
        return `<button class="merge_upgrade"
        onmousedown="buy_upgrade(7)">
    合成升级 7 (${+game.merge.upgrades[7]} / 1) <br>
    自动购买合成升级 1 ~ 6 <br>
    需求:等级达到 1024
</button>`
    }
    if (i == 8) {
        return `<button class="merge_upgrade"
        onmousedown="buy_upgrade(8)">
    合成升级 8 (${+game.merge.upgrades[8]} / 1) <br>
    降低层级4以上合成升级7价格 <br>
    需求:等级达到 (10^)<sup>5</sup>1.88
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

function display_all_layer() {
    let result = `<button class="layer"
    onmousedown="current_layer_index = -1">
    切换至层级 0
</button>`
    let i = 0
    for (let l of game.merge.layer) {
        result += `<button class="layer"
    onmousedown="current_layer_index = ${i}">
    切换至层级 ${display_layer(l.layer[0], l.layer[1], l.layer[2])}
</button>`
        i += 1
    }
    return result
}

function display_layer_upgrade(i, layer_index) {
    if (i == 0) {
        return `<button class="merge_upgrade"
        onmousedown="buy_layer_upgrade(0, ${layer_index})">
    合成升级 0 (${
        +game.merge.layer[layer_index].upgrades[0]} / 1) <br>
    以每秒2次的速度自动生产苦瓜 <br>
    需求:${
        (game.merge.layer[layer_index].layer[0] == 0 &&
        game.merge.layer[layer_index].layer[1] == 0 &&
        game.merge.layer[layer_index].layer[2] == 1) ?
        "层级 0 等级达到 4096 级" : `层级 ${display_layer(
            game.merge.layer[layer_index].layer[0],
            game.merge.layer[layer_index].layer[1],
            game.merge.layer[layer_index].layer[2] - 1
        )} 等级达到 256 级`
    }
</button>`
    }
    if (i == 7) {
        return `<button class="merge_upgrade"
        onmousedown="buy_layer_upgrade(7, ${layer_index})">
    合成升级 7 (${
        +game.merge.layer[layer_index].upgrades[7]
    } / 1) <br>
    自动购买合成升级 1 ~ 6 <br>
    需求:等级达到 ${
        (game.merge.layer[layer_index].layer[2] >= 5 &&
        game.merge.upgrades[8]) ? 256 : 1024
    }
</button>`
    }
    if (ge(
            big(0), 
            game.merge.layer[layer_index].upgrades[i - 1]
        ) && i != 1) {
        return ``
    }
    return `<button class="merge_upgrade"
        onmousedown="buy_layer_upgrade(${i}, ${layer_index})">
    合成升级 ${i} (${
        format(game.merge.layer[layer_index].upgrades[i])
    }) <br>
    每级使自动生产的苦瓜等级+1 <br>
    需求:等级达到
    ${format_int(cost_upgrade(
        i, 
        game.merge.layer[layer_index].upgrades[i]
    ))}
</button>`
}

function display_layer_jump() {
    let last = game.merge.layer[game.merge.layer.length - 1].layer
    return `<button class="layer_jump"
    onmousedown="layer_jump(${last[0]}, ${last[1]}, ${last[2]})">
    进行层级迁跃
    <br>
    解锁层级
    ${display_layer(last[0], last[1], last[2] + 1)}
    <br>
    需求:等级达到
    ${format_int(layer_jump_cost(last[0], last[1], last[2]))}
</button>`
}

function display_merge() {
    if (!game.product.mb_upgrades[1]) {
        return `<div class="cards">
    ${display_all_bitter_melon(game.merge.bitter_melon, [0, 0, 0])}
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
    } else if (game.stage == 1) {
        return `<div class="cards">
    ${display_all_bitter_melon(game.merge.bitter_melon, [0, 0, 0])}
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
    } else {
        if (current_layer_index == -1) {
            return `<div>
    你现在在层级 0 <br>
    ${display_all_layer()}
</div>
<hr>
<div class="cards">
    ${display_all_bitter_melon(game.merge.bitter_melon, [0, 0, 0])}
    <br>
    ${display_upgrade(1)}
    ${display_upgrade(2)}
    ${display_upgrade(3)}
    ${display_upgrade(4)}
    ${display_upgrade(5)}
    ${display_upgrade(6)}
    <br>
    ${display_layer_jump()}
    ${display_upgrade(8)}
</div>`
        } else {
            return `<div>
    你现在在层级 ${display_layer(
        game.merge.layer[current_layer_index].layer[0],
        game.merge.layer[current_layer_index].layer[1],
        game.merge.layer[current_layer_index].layer[2]
    )} <br>
    你在此层级有 ${
        format_int(
            game.merge.layer[current_layer_index].bitter_melon
        )
    } 个苦瓜,使之前所有层级苦瓜产量乘以 ${format(pow(
        big(2), 
        div(
            sub(
                game.merge.layer[current_layer_index].bitter_melon,
                big(1)
            ),
            big(
                (
                    game.merge.layer[current_layer_index].
                        layer[0] == 0 &&
                    game.merge.layer[current_layer_index].
                        layer[1] == 0 &&
                    game.merge.layer[current_layer_index].
                        layer[2] == 1
                ) ? 2048 : 64
            )
        )
    ))} <br>
    你在此层级的最高苦瓜等级为 ${
        format_int(
            log(
                big(2),
                game.merge.layer[current_layer_index].bitter_melon
            )
        )
    } <br>
    ${display_all_layer()}
</div>
<hr>
<div class="cards">
    ${display_all_bitter_melon(
        game.merge.layer[current_layer_index].bitter_melon, 
        game.merge.layer[current_layer_index].layer
    )}
    <br>
    ${display_layer_upgrade(0, current_layer_index)}
    ${display_layer_upgrade(1, current_layer_index)}
    ${display_layer_upgrade(2, current_layer_index)}
    ${display_layer_upgrade(3, current_layer_index)}
    <br>
    ${display_layer_upgrade(4, current_layer_index)}
    ${display_layer_upgrade(5, current_layer_index)}
    ${display_layer_upgrade(6, current_layer_index)}
    ${display_layer_upgrade(7, current_layer_index)}
</div>`
        }
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
            ), big(0.05 * (game.stage ? 2 : 1))), 
            mul(
                mul(
                    mul(
                        add(
                            div(
                                game.product.red_bean, 
                                big(game.stage >= 2 ? 16 : 256)
                            ), 
                            big(1)
                        ),
                        add(
                            div(
                                game.product.soya_bean, 
                                big(game.stage >= 2 ? 32 : 1024)
                            ), 
                            big(1)
                        )
                    ),
                    mul(
                        add(
                            div(
                                game.product.mung_bean, 
                                big(game.stage >= 2 ? 64 : 4096)
                            ), 
                            big(1)
                        ),
                        add(
                            div(
                                game.product.potato, 
                                big(16384)
                            ), 
                            big(1)
                        ),
                    )
                ), 
                mul(
                    pow(big(2), game.merge.black_hole.energy),
                    find_layer(0, 0, 1) ? pow(
                        big(2),
                        div(
                            sub(
                                find_layer(0, 0, 1).bitter_melon,
                                big(1)
                            ),
                            big(2048)
                        )
                    ) : big(1)
                )
            )
        ))
    }
    if (game.product.mb_upgrades[1] && game.stage == 1) {
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
    for (let l of game.merge.layer) {
        if (l.upgrades[0]) {
            let multiple = big(1)
            if (find_layer(
                l.layer[0], l.layer[1], l.layer[2] + 1
            )) {
                multiple = pow(
                    big(2), 
                    div(
                        sub(
                            find_layer(
                                l.layer[0], 
                                l.layer[1], 
                                l.layer[2] + 1
                            ).bitter_melon,
                            big(1)
                        ),
                        big(64)
                    )
                )
            }
            multiple = mul(
                multiple,
                add(
                    div(
                        game.product.potato, 
                        big(16384)
                    ), 
                    big(1)
                )
            )
            l.bitter_melon = add(
                l.bitter_melon, mul(
                    mul(
                        pow(
                            big(2), 
                            add(
                                l.upgrades[1],
                                add(
                                    l.upgrades[2],
                                    add(
                                        l.upgrades[3],
                                        add(
                                            l.upgrades[4],
                                            add(
                                                l.upgrades[5],
                                                l.upgrades[6]
                                            )
                                        )
                                    )
                                )
                            )
                        ),
                        multiple
                    ), big(0.1)
                )
            )
            if (l.upgrades[7]) {
                buy_max_layer_upgrade(1, l)
                buy_max_layer_upgrade(2, l)
                buy_max_layer_upgrade(3, l)
                buy_max_layer_upgrade(4, l)
                buy_max_layer_upgrade(5, l)
                buy_max_layer_upgrade(6, l)
            }
        }
    }
    if (option == 0) {
        content.innerHTML = display_merge()
    }
}
