let bean_cost = [big(256), big(1024), big(4096)]
let bean_name = ["红豆", "黄豆", "绿豆"]

function bean_production_level(n) {
    return floor(div(
        log(big(2), game.merge.bitter_melon), bean_cost[n]))
}

function display_bean_production(n) {
    if (ge(game.merge.bitter_melon, 
        pow(big(2), bean_cost[n]))) {
        return `你的${bean_name[n]}生产等级为
${format_int(bean_production_level(n))} <br>
每秒生产
${format_int(
    [rb_production, sb_production, mb_production][n]()
)} ${bean_name[n]}`
    }
    return `苦瓜等级达到 ${format_int(bean_cost[n])} 时 <br>
开始生产${bean_name[n]}`
}

function rb_production() {
    let multiple0 = big(1)
    if (game.product.rb_upgrades[1]) {
        multiple0 = add(
            div(game.product.soya_bean, big(1024)), 
            big(1)
        )
    }
    let multiple1 = big(1)
    if (game.product.sb_upgrades[1]) {
        multiple1 = add(
            div(game.product.mung_bean, big(4096)), 
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
        if (ge(game.product.red_bean, big(4294967296))) {
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
        if (ge(game.product.soya_bean, big(4294967296))) {
            game.product.sb_upgrades[1] = true
        }
    }
}

function buy_mb_upgrade(n) {
    if (ge(game.product.mung_bean, 
        pow(big(4), game.product.mb_upgrades[0])
    )) {
        game.product.mb_upgrades[0] = add(
            game.product.mb_upgrades[0], big(1)
        )
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
    需求: 4294967296 <br>
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
    需求: 4294967296 <br>
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
<button class="mb_upgrade">
    绿豆升级 1 (0 / 1) <br>
    ??? <br>
    需求: ??? <br>
    绿豆
</button>`
}

function display_product() {
    return `<div class="red_bean">
    你有 ${format(game.product.red_bean)} 红豆 <br>
    ${display_bean_production(0)} <br>
    你的红豆使苦瓜产量乘以
    ${format(add(div(game.product.red_bean, big(256)), big(1)))}
    <br>
    ${display_rb_upgrades()}
</div><div class="soya_bean">
    你有 ${format(game.product.soya_bean)} 黄豆 <br>
    ${display_bean_production(1)} <br>
    你的黄豆使苦瓜产量乘以
    ${format(add(div(game.product.soya_bean, big(1024)), big(1)))}
    <br>
    ${display_sb_upgrades()}
</div><div class="mung_bean">
    你有 ${format(game.product.mung_bean)} 绿豆 <br>
    ${display_bean_production(2)} <br>
    你的绿豆使苦瓜产量乘以
    ${format(add(div(game.product.mung_bean, big(4096)), big(1)))}
    <br>
    ${display_mb_upgrades()}
</div>`
}

function update_product() {
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
    if (option == 1) {
        content.innerHTML = display_product()
    }
}
