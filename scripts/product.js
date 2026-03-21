const bean_cost = [
    big(256), big(1024), big(4096), 
    pow(big(2), big(65536))
]
const bean_name = ["红豆", "黄豆", "绿豆", "土豆"]

function bean_production_level(n) {
    if (n < 3) {
        return floor(div(
            log(big(2), game.merge.bitter_melon), bean_cost[n]))
    } else {
        return floor(sub(
            slog10(game.merge.bitter_melon), big(2.6329710779)))
    }
}

function display_bean_production(n) {
    if (ge(game.merge.bitter_melon, 
        pow(big(2), bean_cost[n]))) {
        return `你的${bean_name[n]}生产等级为
${format_int(bean_production_level(n))} <br>
每秒生产
${format_int(
    [
        rb_production, sb_production, 
        mb_production, pt_production
    ][n]()
)} ${bean_name[n]}`
    }
    return `苦瓜等级达到 ${format_int(bean_cost[n])} 时 <br>
开始生产${bean_name[n]}`
}

function rb_production() {
    let multiple0 = big(1)
    if (game.product.rb_upgrades[1]) {
        multiple0 = add(
            div(
                game.product.soya_bean, 
                big(game.stage >= 2 ? 32 : 1024)
            ), 
            big(1)
        )
    }
    let multiple1 = big(1)
    if (game.product.sb_upgrades[1]) {
        multiple1 = add(
            div(
                game.product.mung_bean, 
                big(game.stage >= 2 ? 64 : 4096)
            ), 
            big(1)
        )
    }
    return mul(
        pow(big(2), add(
            bean_production_level(0),
            game.product.rb_upgrades[0]
        )),
        mul(multiple0, multiple1)
    )
}

function sb_production() {
    return pow(big(2), add(
        bean_production_level(1),
        game.product.sb_upgrades[0]
    ))
}

function mb_production() {
    return pow(big(2), add(
        bean_production_level(2),
        game.product.mb_upgrades[0]
    ))
}

function pt_production() {
    return pow(big(2), add(
        bean_production_level(3),
        game.product.pt_upgrades[0]
    ))
}

function rsm_u1_cost() {
    return game.stage >= 2 ? big(65536) : big(4294967296)
}

function buy_rb_upgrade(n) {
    if (n == 0) {
        if (ge(game.product.red_bean, 
            pow(big(4), game.product.rb_upgrades[0])
        )) {
            game.product.rb_upgrades[0] = add(
                game.product.rb_upgrades[0], big(1)
            )
        }
    }
    if (n == 1) {
        if (ge(game.product.red_bean, rsm_u1_cost())) {
            game.product.rb_upgrades[1] = true
        }
    }
}

function buy_sb_upgrade(n) {
    if (n == 0) {
        if (ge(game.product.soya_bean, 
            pow(big(4), game.product.sb_upgrades[0])
        )) {
            game.product.sb_upgrades[0] = add(
                game.product.sb_upgrades[0], big(1)
            )
        }
    }
    if (n == 1) {
        if (ge(game.product.soya_bean, rsm_u1_cost())) {
            game.product.sb_upgrades[1] = true
        }
    }
}

function buy_mb_upgrade(n) {
    if (n == 0) {
        if (ge(game.product.mung_bean, 
            pow(big(4), game.product.mb_upgrades[0])
        )) {
            game.product.mb_upgrades[0] = add(
                game.product.mb_upgrades[0], big(1)
            )
        }
    }
    if (n == 1) {
        if (ge(game.product.mung_bean, rsm_u1_cost())) {
            if (game.stage >= 2 && !game.product.mb_upgrades[1]) {
                game.merge.layer.push({
                    layer: [0, 0, 1],
                    bitter_melon: big(1),
                    upgrades: [
                        false, big(0), big(0), big(0),
                        big(0), big(0), big(0), false
                    ]
                })
            }
            game.product.mb_upgrades[1] = true
        }
    }
}

function buy_pt_upgrade(n) {
    if (n == 0) {
        if (ge(game.product.potato, 
            pow(big(16), game.product.pt_upgrades[0])
        )) {
            game.product.pt_upgrades[0] = add(
                game.product.pt_upgrades[0], big(1)
            )
        }
    }
}

function buy_max_rsm_upgrade() {
    if (ge(game.product.red_bean, 
        pow(big(4), game.product.rb_upgrades[0])
    )) {
        game.product.rb_upgrades[0] = add(floor(
            log(big(4), game.product.red_bean)
        ), big(1))
    }
    if (ge(game.product.soya_bean, 
        pow(big(4), game.product.sb_upgrades[0])
    )) {
        game.product.sb_upgrades[0] = add(floor(
            log(big(4), game.product.soya_bean)
        ), big(1))
    }
    if (ge(game.product.mung_bean, 
        pow(big(4), game.product.mb_upgrades[0])
    )) {
        game.product.mb_upgrades[0] = add(floor(
            log(big(4), game.product.mung_bean)
        ), big(1))
    }
}

function display_rb_upgrades() {
    return `<button class="rb_upgrade"
    onmousedown="buy_rb_upgrade(0)">
    红豆升级 0 (${format(game.product.rb_upgrades[0])}) <br>
    使红豆产量翻倍 <br>
    需求: ${format(pow(big(4), game.product.rb_upgrades[0]))} <br>
    红豆
</button>
<button class="rb_upgrade"
    onmousedown="buy_rb_upgrade(1)">
    红豆升级 1 (${+game.product.rb_upgrades[1]} / 1) <br>
    黄豆增加红豆产量 <br>
    需求: ${format(rsm_u1_cost())} <br>
    红豆
</button>`
}

function display_sb_upgrades() {
    return `<button class="sb_upgrade"
    onmousedown="buy_sb_upgrade(0)">
    黄豆升级 0 (${format(game.product.sb_upgrades[0])}) <br>
    使黄豆产量翻倍 <br>
    需求: ${format(pow(big(4), game.product.sb_upgrades[0]))} <br>
    黄豆
</button>
<button class="sb_upgrade"
    onmousedown="buy_sb_upgrade(1)">
    黄豆升级 1 (${+game.product.sb_upgrades[1]} / 1) <br>
    绿豆增加红豆产量 <br>
    需求: ${format(rsm_u1_cost())} <br>
    黄豆
</button>`
}

function display_mb_upgrades() {
    return `<button class="mb_upgrade"
    onmousedown="buy_mb_upgrade(0)">
    绿豆升级 0 (${format(game.product.mb_upgrades[0])}) <br>
    使绿豆产量翻倍 <br>
    需求: ${format(pow(big(4), game.product.mb_upgrades[0]))} <br>
    绿豆
</button>
<button class="mb_upgrade"
    onmousedown="buy_mb_upgrade(1)">
    绿豆升级 1 (${+game.product.mb_upgrades[1]} / 1) <br>
    进入${game.stage >= 2 ? "层级" : "黑洞"} <br>
    需求: ${format(rsm_u1_cost())} <br>
    绿豆
</button>`
}

function display_pt_upgrades() {
    return `<button class="pt_upgrade"
    onmousedown="buy_pt_upgrade(0)">
    土豆升级 0 (${format(game.product.pt_upgrades[0])}) <br>
    使土豆产量翻倍 <br>
    需求: ${format(pow(big(16), game.product.pt_upgrades[0]))} <br>
    绿豆
</button>
<button class="pt_upgrade"
    onmousedown="buy_pt_upgrade(1)">
    土豆升级 1 (${+game.product.pt_upgrades[1]} / 1) <br>
    解锁序数理论(Coming s∞n) <br>
    需求: 4294967296 <br>
    土豆
</button>`
}

function display_product() {
    return `<div class="red_bean">
    你有 ${format(game.product.red_bean)} 红豆 <br>
    ${display_bean_production(0)} <br>
    你的红豆使苦瓜产量乘以
    ${format(add(
        div(
            game.product.red_bean, 
            big(game.stage >= 2 ? 16 : 256)
        ), 
        big(1)
    ))}
    <br>
    ${display_rb_upgrades()}
</div><div class="soya_bean">
    你有 ${format(game.product.soya_bean)} 黄豆 <br>
    ${display_bean_production(1)} <br>
    你的黄豆使苦瓜产量乘以
    ${format(add(
        div(
            game.product.soya_bean, 
            big(game.stage >= 2 ? 32 : 1024)
        ), 
        big(1)
    ))}
    <br>
    ${display_sb_upgrades()}
</div><div class="mung_bean">
    你有 ${format(game.product.mung_bean)} 绿豆 <br>
    ${display_bean_production(2)} <br>
    你的绿豆使苦瓜产量乘以
    ${format(add(
        div(
            game.product.mung_bean, 
            big(game.stage >= 2 ? 64 : 4096)
        ), 
        big(1)
    ))}
    <br>
    ${display_mb_upgrades()}
</div><br>` + (game.stage >= 2 ? `<div class="potato">
    你有 ${format(game.product.potato)} 土豆 <br>
    ${display_bean_production(3)} <br>
    你的土豆使有限层苦瓜产量乘以
    ${format(add(
        div(
            game.product.potato, 
            big(16384)
        ), 
        big(1)
    ))}
    <br>
    ${display_pt_upgrades()}
</div>` : "")
}

function update_product() {
    if (game.product.mb_upgrades[1]) {
        buy_max_rsm_upgrade()
        game.product.red_bean = rb_production()
        game.product.soya_bean = sb_production()
        game.product.mung_bean = mb_production()
        if (ge(game.merge.bitter_melon, pow(big(2), bean_cost[3]))) {
            game.product.potato = add(
                game.product.potato,
                mul(pt_production(), big(0.05))
            )
        }
    } else {
        if (ge(game.merge.bitter_melon, pow(big(2), bean_cost[0]))) {
            game.product.red_bean = add(
                game.product.red_bean,
                mul(rb_production(), big(0.05))
            )
        }
        if (ge(game.merge.bitter_melon, pow(big(2), bean_cost[1]))) {
            game.product.soya_bean = add(
                game.product.soya_bean,
                mul(sb_production(), big(0.05))
            )
        }
        if (ge(game.merge.bitter_melon, pow(big(2), bean_cost[2]))) {
            game.product.mung_bean = add(
                game.product.mung_bean,
                mul(mb_production(), big(0.05))
            )
        }
        if (ge(game.merge.bitter_melon, pow(big(2), bean_cost[3]))) {
            game.product.potato = add(
                game.product.potato,
                mul(pt_production(), big(0.05))
            )
        }
    }
    if (option == 1) {
        content.innerHTML = display_product()
    }
}
