let current_plot = 0

let plots = [
    `(你来到了苦瓜星球)<br>
你:我是谁?我在哪?<br>
苦瓜大仙1029号:你好,欢迎来到苦瓜星球,这里人人都爱吃苦瓜.<br>
苦瓜大仙1029号:苦瓜是这里的一种货币.<br>
你:我应该怎样离开这里?<br>
苦瓜大仙1029号:你只需要获得一个等级为
f<sub>&psi;(&psi;<sub>&alpha;</sub>\
(&Omega;<sub>&alpha;+2</sub>&middot;&omega;))</sub>(10)
的苦瓜，就可以在苦瓜市场上买到一个穿越器.<br>
苦瓜大仙1029号:那时你就可以穿越回去了.<br>
你:那怎样获得这么高等级的苦瓜呢?<br>
苦瓜大仙1029号:我送给你一个小型苦瓜工厂,你可以慢慢升级,祝你好运.<br>
(点击"合成"页面查看)`, 
    `(你的苦瓜等级达到了32级,并购买了合成升级6)<br>
苦瓜大仙1029号:很好,看来你已经掌握了这个游戏的基本玩法.<br>
苦瓜大仙1029号:但是,只靠工厂的力量,你无法得到很多的苦瓜.<br>
你:那我应该怎么做?<br>
苦瓜大仙1029号:我帮你解锁了"阶段",每当你的苦瓜达到新的层次,\
无法突破时,你可以进行阶段重置.<br>
苦瓜大仙1029号:这会重置你的所有内容,但是会给你一些加成,\
并帮你解锁新的内容.<br>
你:那我什么时候能进行第一次阶段重置?<br>
苦瓜大仙1029号:你可以在苦瓜等级达到256时进行第一次阶段重置.<br>
苦瓜大仙1029号:这段路程会耗费你大约1小时的时间,你或许会有些无聊.<br>
苦瓜大仙1029号:不过在这段路程之后,你会看到更广阔的世界,加油吧!<br>
(已解锁"阶段"页面)`
]

function last_plot() {
    if (current_plot > 0) {
        current_plot--
    }
}

function next_plot() {
    if (current_plot < game.plot) {
        current_plot++
    }
}

function display_plot() {
    return `<button class="plot"
    onmousedown="last_plot()">上一个剧情</button>
    目前剧情：第${current_plot}篇
<button class="plot"
    onmousedown="next_plot()">下一个剧情</button><br>
<div class="plot">
    ${plots[current_plot]}
</div>`
}

function update_plot() {
    if (game.plot == -1) {
        game.plot++
        alert("你获得了新的剧情！")
    }
    if (game.plot == 0 && !ge(big(0), game.merge.upgrades[6])) {
        game.plot++
        alert("你获得了新的剧情！")
    }
    if (option == 5) {
        content.innerHTML = display_plot()
    }
}
