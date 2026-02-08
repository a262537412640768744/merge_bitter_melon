let current_achievement = -1

let achievements = [
    "一个开始", "自动化工厂", "一个纸箱", "升级6",
    "第一道坎", "地球的大小", "太阳的大小", "第二道坎", 
    "144级苦瓜", "半径1光年", "第三道坎", "200级苦瓜", 
    "216级苦瓜", "目标的7/8", "快要结束了", "阶段0结束"
]

let achievements_content = [
    "生产 1 个苦瓜", "购买合成升级 0", 
    "苦瓜数量达到 1000000000", "购买合成升级 6", 
    "苦瓜等级达到 64", "苦瓜数量达到 1.08&middot;10<sup>30</sup>",
    "苦瓜数量达到 1.41&middot;10<sup>36</sup>", "苦瓜等级达到 128",
    "苦瓜等级达到 144", "苦瓜数量达到 3.55&middot;10<sup>57</sup>",
    "苦瓜等级达到 192", "苦瓜等级达到 200", 
    "苦瓜等级达到 216", "苦瓜等级达到 224", 
    "苦瓜等级达到 250", "苦瓜等级达到 256"
]

function display_an_achievement(m, n) {
    return `<td class="achievement"
${game.achievement[m * 16 + n] ? `style="background: gold"` 
    : ""} onmousedown="current_achievement = ${m * 16 + n}">
    ${achievements[m * 16 + n]}
</td>`
}

function display_line_achievement(m) {
    return `<tr>
    ${display_an_achievement(m, 0)}
    ${display_an_achievement(m, 1)}
    ${display_an_achievement(m, 2)}
    ${display_an_achievement(m, 3)}
    ${display_an_achievement(m, 4)}
    ${display_an_achievement(m, 5)}
    ${display_an_achievement(m, 6)}
    ${display_an_achievement(m, 7)}
    ${display_an_achievement(m, 8)}
    ${display_an_achievement(m, 9)}
    ${display_an_achievement(m, 10)}
    ${display_an_achievement(m, 11)}
    ${display_an_achievement(m, 12)}
    ${display_an_achievement(m, 13)}
    ${display_an_achievement(m, 14)}
    ${display_an_achievement(m, 15)}
</tr>`
}

function display_achievement() {
    return `
点击成就查看信息 <br>
信息: ${current_achievement == -1 ?
    "无" : achievements_content[current_achievement]
} <br>
<table>
    ${display_line_achievement(0)}
</table>`
}

function update_achievement() {
    if (!ge(big(0), game.merge.bitter_melon)) {
        game.achievement[0] = true
    }
    if (!ge(big(0), game.merge.upgrades[0])) {
        game.achievement[1] = true
    }
    if (ge(game.merge.bitter_melon, big(10 ** 9))) {
        game.achievement[2] = true
    }
    if (!ge(big(0), game.merge.upgrades[6])) {
        game.achievement[3] = true
    }
    if (ge(game.merge.bitter_melon, big(2 ** 64))) {
        game.achievement[4] = true
    }
    if (ge(game.merge.bitter_melon, big(1.083 * 10 ** 30))) {
        game.achievement[5] = true
    }
    if (ge(game.merge.bitter_melon, big(1.412 * 10 ** 36))) {
        game.achievement[6] = true
    }
    if (ge(game.merge.bitter_melon, big(2 ** 128))) {
        game.achievement[7] = true
    }
    if (ge(game.merge.bitter_melon, big(2 ** 144))) {
        game.achievement[8] = true
    }
    if (ge(game.merge.bitter_melon, big(3.547 * 10 ** 57))) {
        game.achievement[9] = true
    }
    if (ge(game.merge.bitter_melon, big(2 ** 192))) {
        game.achievement[10] = true
    }
    if (ge(game.merge.bitter_melon, big(2 ** 200))) {
        game.achievement[11] = true
    }
    if (ge(game.merge.bitter_melon, big(2 ** 216))) {
        game.achievement[12] = true
    }
    if (ge(game.merge.bitter_melon, big(2 ** 224))) {
        game.achievement[13] = true
    }
    if (ge(game.merge.bitter_melon, big(2 ** 250))) {
        game.achievement[14] = true
    }
    if (ge(game.merge.bitter_melon, big(2 ** 256))) {
        game.achievement[15] = true
    }
    if (option == 6) {
        content.innerHTML = display_achievement()
    }
}
