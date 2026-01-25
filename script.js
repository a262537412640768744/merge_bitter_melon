let option = 0
let caption = document.querySelector("div.caption")

function update_caption() {
    caption.innerHTML = `你有
${format_int(game.merge.bitter_melon)} 个苦瓜 <br>
最高苦瓜等级为
${format_int(log(big(2), game.merge.bitter_melon))} 级 <br>
你在阶段 ${game.stage}`
}

function update() {
    update_caption()
    update_merge()
    update_about()
    if (![0, 4].includes(option)) {
        content.innerHTML = "没做"
    }
    save()
}

setInterval(update, 50)
