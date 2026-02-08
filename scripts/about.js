function display_statistics(n) {
    if (!ge(n, big(1000))) {
        return `你的所有苦瓜体积为 ${format(n)} mm<sup>3</sup>`
    }
    if (!ge(n, big(1000000))) {
        return `你的所有苦瓜体积为 ${
    format(div(n, big(1000)))} dm<sup>3</sup>`
    }
    if (!ge(n, big(10 ** 9))) {
        return `你的所有苦瓜体积为 ${
    format(div(n, big(1000000)))} cm<sup>3</sup>`
    }
    if (!ge(n, big(10 ** 18))) {
        return `你的所有苦瓜体积为 ${
    format(div(n, big(10 ** 9)))} m<sup>3</sup>`
    }
    if (!ge(n, big(1.083 * 10 ** 30))) {
        return `你的所有苦瓜体积为 ${
    format(div(n, big(10 ** 18)))} km<sup>3</sup>`
    }
    if (!ge(n, big(1.412 * 10 ** 36))) {
        return `你的所有苦瓜可以填满 ${
    format_int(div(n, big(1.083 * 10 ** 30)))} 个地球`
    }
    if (!ge(n, big(3.547 * 10 ** 57))) {
        return `你的所有苦瓜可以填满 ${
    format_int(div(n, big(1.412 * 10 ** 36)))} 个太阳`
    }
    if (!ge(n, big(4 * 10 ** 89))) {
        return `你的所有苦瓜可以填满 ${
    format_int(div(n, big(3.547 * 10 ** 57)))} 个半径为 1 光年的球`
    }
    if (!ge(n, big(4 * 10 ** 169))) {
        return `你的所有苦瓜可以填满 ${
    format_int(div(n, big(4 * 10 ** 80)))} 个可观测宇宙`
    }
    if (!ge(n, pow(big(4 * 10 ** 80), big(4 * 10 ** 10)))) {
        let multi = floor(log(big(4 * 10 ** 80), div(
            n, big(10 ** 9)
        )))
        let number = div(n, mul(
            pow(big(4 * 10 ** 80), multi), big(10 ** 9)
        ))
        return `你的所以苦瓜可以填满
${format_int(number)} 个 ${format_int(multi)} 重可观测宇宙`
    }
    if (!ge(n, pow(big(4 * 10 ** 80), big(4 * 10 ** 80)))) {
        let multi = floor(log(big(4 * 10 ** 80), n))
        return `你的所以苦瓜可以填满 1 个 ${format(multi)} 重可观测宇宙`
    }
}

function display_about() {
    return `游戏结局:
10<sup>8.47&middot;10<sup>13</sup></sup>
个苦瓜(可达到 2.81&middot;10<sup>14</sup> 级)
<hr>
制作人:a262537412640768744<br>
更新日志:<br>
v0 2026/1/25 添加合成,合成升级,关于 结局:
1.16&middot;10<sup>77</sup> 个苦瓜 <br>
v0.1 2026/1/26 添加剧情 结局:
1.16&middot;10<sup>77</sup> 个苦瓜 <br>
v1 2026/2/2 添加阶段,生成物 结局:
1.19&middot;10<sup>4932</sup> 个苦瓜 <br>
v1.1 2026/2/8 添加黑洞,成就 结局:
10<sup>8.47&middot;10<sup>13</sup></sup> 个苦瓜
<hr>
相关推荐: <br>
极度推荐:<a href="https://https://rbn-rewrite-team.github.io/RBNR/">\
大数之路重制版</a> <br>
dlsdl系列:<a href="https://dlsdl.github.io/wind_spirit_creation/">\
风灵作成</a>,<a href="https://dlsdl.github.io/pelkie_clicker/">\
佩勒点点乐</a>,<a href="https://dlsdl.github.io/qtrnity/">\
四位一体</a>,<a href="https://dlsdl.github.io/OM-idle/">\
OM:idle</a>
<hr>
统计:
如果每个苦瓜的体积为 1 mm<sup>3</sup>，那么\
${display_statistics(game.merge.bitter_melon)}`
}

function update_about() {
    if (option == 4) {
        content.innerHTML = display_about()
    }
}
