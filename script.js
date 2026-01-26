let option = 0
let caption = document.querySelector("div.caption")
let options = document.querySelector("div.options")

function display_options() {
    return `<button class="merge" 
    onmousedown="option = 0">合成</button>` + 
    (game.plot >= 1 ? `<button class="stage" 
    onmousedown="option = 3">阶段</button>` : "") + 
    `<button class="about" onmousedown="option = 4">关于</button>
<button class="plots" onmousedown="option = 5">剧情</button>`
}

function update_caption() {
    caption.innerHTML = `你有
${format_int(game.merge.bitter_melon)} 个苦瓜 <br>
最高苦瓜等级为
${format_int(log(big(2), game.merge.bitter_melon))} 级 <br>
你在阶段 ${game.stage}`
}

function update() {
    options.innerHTML = display_options()
    update_caption()
    update_merge()
    update_about()
    update_plot()
    if (![0, 4, 5].includes(option)) {
        content.innerHTML = "没做"
    }
    save()
}

setInterval(update, 50)
