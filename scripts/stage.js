const stage_costs = [
    big(256), big(2 ** 48), 
    {sign: 1, number: 1.01, layer: 2}
]

const stage_effect = [
    "",
    `<li>第1次阶段重置时,合成升级0效果×4,\
解锁生成物,在"生成物"中解锁红豆,黄豆,绿豆</li>`,
    `<li>第2次阶段重置时,始终保留256级苦瓜和合成升级0与7,\
降低生成物升级成本,提升生成物效果,在"生成物"中解锁土豆,解锁苦瓜层级</li>`
]

function stage_effects(stage) {
    if (stage == 0) {
        return ""
    } else {
        return stage_effects(stage - 1) + stage_effect[stage]
    }
}

function stage_reset() {
    if (ge(game.merge.bitter_melon, 
        pow(big(2), stage_costs[game.stage]))) {
        game.merge = start_merge
        game.product = start_product
        game.stage++
        if (game.stage >= 2) {
            game.merge.bitter_melon = big(2 ** 256)
            game.merge.upgrades[0] = true
            game.merge.upgrades[7] = true
        }
    }
}

function display_stage() {
    return `<div class="stage">
    你目前在阶段 ${game.stage} <br>
    <button class="stage_reset" onmousedown="stage_reset()">
        进行阶段重置 <br>
        需求:苦瓜等级达到 ${format_int(stage_costs[game.stage])}
    </button> <br>
    阶段重置会带来一些奖励,目前已有的奖励如下: <br>
    <ul>
        ${stage_effects(game.stage)}
    </ul>
</div>`
}

function update_stage() {
    if (option == 3) {
        content.innerHTML = display_stage()
    }
}
