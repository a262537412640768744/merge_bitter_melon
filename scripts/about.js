function display_about() {
    return `游戏结局:
1.19&middot;10<sup>4932</sup> 个苦瓜(可达到 16384 级)<br>
<hr>
制作人:a262537412640768744<br>
更新日志:<br>
v0 2026/1/25 添加合成,合成升级,关于 结局:
1.16&middot;10<sup>77</sup> 个苦瓜<br>
v0.1 2026/1/26 添加剧情 结局:
1.16&middot;10<sup>77</sup> 个苦瓜<br>
v1 2026/2/2 添加阶段,生成物 结局:
1.19&middot;10<sup>4932</sup> 个苦瓜
<hr>
相关推荐:<br>
极度推荐:<a href="https://https://rbn-rewrite-team.github.io/RBNR/">\
大数之路重制版</a><br>
dlsdl系列:<a href="https://dlsdl.github.io/wind_spirit_creation/">\
风灵作成</a>,<a href="https://dlsdl.github.io/pelkie_clicker/">\
佩勒点点乐</a>,<a href="https://dlsdl.github.io/qtrnity/">\
四位一体</a>,<a href="https://dlsdl.github.io/OM-idle/">\
OM:idle</a><br>
<hr>`
}

function update_about() {
    if (option == 4) {
        content.innerHTML = display_about()
    }
}
