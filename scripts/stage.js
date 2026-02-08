let stage_costs = [
    big(256), big(2 ** 48)
]

let stage_effect = [
    "",
    ` &middot;第1次阶段重置时,合成升级0效果×4,\
解锁生成物,在"生成物"中解锁红豆,黄豆,绿豆 `
]

function stage_effects(stage) {
    if (stage == 0) {
        return ""
    } else {
        return stage_effects(stage - 1) + 
            stage_effect[stage] + "<br>"
    }
}

function stage_reset() {
    if (game.stage = 1) {
        alert("请等待下一版本更新")
        return
    }
    if (ge(game.merge.bitter_melon, 
        pow(big(2), stage_costs[game.stage]))) {
            game.merge = {
            bitter_melon: big(1), 
            upgrades: [
                false, big(0), big(0), big(0), 
                big(0), big(0), big(0), false
            ],
            black_hole: {
                energy: big(0), 
                upgrades: [big(0), big(0), big(0), big(0)]
            },
            layer: {}
        }
        game.product = {
            red_bean: big(0),
            rb_upgrades: [big(0), false],
            soya_bean: big(0),
            sb_upgrades: [big(0), false],
            mung_bean: big(0),
            mb_upgrades: [big(0), false]
        }
        game.stage++
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
    ${stage_effects(game.stage)}
</div>`
}

function update_stage() {
    if (option == 3) {
        content.innerHTML = display_stage()
    }
}
