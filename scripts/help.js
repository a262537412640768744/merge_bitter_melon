let current_help = 0

let help = [
    `说明:<br>
这里的"帮助"会展现关于游戏计数法,序数理论的帮助<br>
如果你需要关于游戏内容的帮助,可以看"剧情"`,
    `计数法帮助:<br>
本游戏中,你遇到的首个计数法为科学计数法,使用10的幂次表示:
10<sup>n</sup>=10...(n个0)...0<br>
在前面会乘以一个[1,10)内的数a,就像
a&middot;10<sup>n</sup> 或 a×10<sup>n</sup>
那样,a一般保留2~6位小数<br>
使用科学计数法,可以简化许多表达,比如
43199293299 可以近似表示为 4.32&middot10<sup>10</sup><br>
当数字非常大的时候,直接写根本写不出来时,科学计数法会很方便,比如
2<sup>2<sup>2<sup>2<sup>2</sup></sup></sup></sup>≈\
2.00&middot;10<sup>19728</sup><br>
科学计数法的指数也可以迭代,比如你会看到
10<sup>8.47&middot;10<sup>13</sup></sup>
这样的数`,
    `计数法帮助:<br>
之后,你还会遇到其他的计数法<br>
你遇到的第二个计数法是像
(10^)<sup>n</sup>a
这样的<br>
在游戏数值达到
(10^)<sup>5</sup>1.00
之后,游戏会使用此表示法,游戏选取的a在[1,10)内<br>
定义为:
(10^)<sup>n</sup>a=\
10<sup>...(n个10)...<sup>10<sup>a</sup></sup></sup><br>
举例:<br>
(10^)<sup>6</sup>2=10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>2\
</sup></sup></sup></sup></sup></sup><br>
2<sup>2<sup>2<sup>2<sup>65536</sup></sup></sup></sup>≈\
(10^)<sup>5</sup>4.30<br>
这种表示法可以表示很大的数,本游戏会在
f<sub>3</sub>(1000002)
之前使用这种表示法`
]

function last_help() {
    if (current_help > 0) {
        current_help--
    }
}

function next_help() {
    current_help++
}

function display_help() {
    return `<button class="help"
    onmousedown="last_help()">上一篇</button>
    帮助：第${current_help}篇
<button class="help"
    onmousedown="next_help()">下一篇</button><br>
<div class="help">
    ${current_help >= help.length ? 
        "你正在查看一片虚无的帮助" : help[current_help]}
</div>`
}

function update_help() {
    if (option == 7) {
        content.innerHTML = display_help()
    }
}
