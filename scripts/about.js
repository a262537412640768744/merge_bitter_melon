function display_about() {
    return `游戏结局:${format(big(2 ** 256))}个苦瓜(可达到256级)<br>
制作人:a262537412640768744<br>
更新日志:<br>
v0 2026/1/25 添加合成,合成升级,关于`
}

function update_about() {
    if (option == 4) {
        content.innerHTML = display_about()
    }
}
