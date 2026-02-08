function big(n) {
    if (Math.abs(n) < 10) {
        return {
            sign: n == 0 ? 1 : Math.sign(n),
            number: Math.abs(n),
            layer: 0
        }
    } else if (Math.abs(n) < 1e10) {
        return {
            sign: Math.sign(n),
            number: 1 + Math.log10(Math.log10(Math.abs(n))),
            layer: 1
        }
    } else {
        return {
            sign: Math.sign(n),
            number: 2 + Math.log10(Math.log10(Math.log10(Math.abs(n)))),
            layer: 1
        }
    }
}

function neg(n) {
    return {
        sign: -n.sign,
        number: n.number,
        layer: n.layer
    }
}

function abs(n) {
    return {
        sign: 1,
        number: n.number,
        layer: n.layer
    }
}

function format(n) {
    if (n.sign == -1) {
        return "-" + format(neg(n))
    }
    if (n.layer == 0) {
        return n.number.toFixed(2)
    }
    if (n.layer == 1 && n.number < 1 + Math.log10(3)) {
        return (10 ** 10 ** (n.number - 1)).toFixed(2)
    }
    if (n.layer == 1 && n.number < 2) {
        return (10 ** 10 ** (n.number - 1)).toFixed(0)
    }
    if (n.layer == 1 && n.number < 2 + Math.log10(6)) {
        let e = 10 ** 10 ** (n.number - 2)
        return `${(10 ** (e - Math.floor(e))).toFixed(2)
            }&middot;10<sup>${Math.floor(e)}</sup>`
    }
    if (n.layer == 1 && n.number < 3) {
        let e = 10 ** 10 ** (n.number - 2)
        return `${Math.floor(10 ** (e - Math.floor(e)))
            }&middot;10<sup>${Math.floor(e)}</sup>`
    }
    if (n.layer == 1 && n.number < 5) {
        return "10<sup>" + format({
            sign: 1,
            number: n.number - 1,
            layer: 1
        }) + "</sup>"
    }
}

function format_int(n) {
    if (n.layer == 0 && n.number < 1) {
        return "0"
    }
    if (n.sign == -1) {
        return "-" + format_int(neg(n))
    }
    if (n.layer == 0) {
        return `${Math.floor(n.number + 0.00000001)}`
    }
    if (n.layer == 1 && n.number < 2) {
        return `${Math.floor(
            10 ** 10 ** (n.number - 1) + 0.00000001)}`
    }
    return format(n)
}

function ge(a, b) {
    if (a.sign > b.sign) {
        return true
    }
    if (a.sign < b.sign) {
        return false
    }
    if (a.layer > b.layer) {
        return true
    }
    if (a.layer < b.layer) {
        return false
    }
    return a.number >= b.number
}

function floor(a) {
    if (a.layer > 1 || (a.layer == 1 && a.number >= 2)) {
        return a
    }
    if (a.layer == 0) {
        return {
            sign: a.sign,
            number: a.sign * Math.floor(a.sign * a.number),
            layer: 0
        }
    }
    let num = a.sign * 10 ** 10 ** (a.number - 1)
    return {
        sign: a.sign,
        number: 1 + Math.log10(Math.log10(a.sign * Math.floor(num))),
        layer: 1
    }
}

function add(a, b) {
    if (!ge(abs(a), abs(b))) {
        return add(b, a)
    }
    if (a.layer == 0 || (a.layer == 1 && a.number < 2)) {
        let num_a, num_b
        if (a.layer == 0) {
            num_a = a.sign * a.number
        } else {
            num_a = a.sign * 10 ** 10 ** (a.number - 1)
        }
        if (b.layer == 0) {
            num_b = b.sign * b.number
        } else {
            num_b = b.sign * 10 ** 10 ** (b.number - 1)
        }
        return big(num_a + num_b)
    }
    if (a.layer == 1 && a.number < 3) {
        let exp_a = 10 ** 10 ** (a.number - 2), exp_b
        if (b.layer == 0) {
            exp_b = Math.log10(b.number)
        } else if (b.layer == 1 && b.number < 2) {
            exp_b = 10 ** (b.number - 1)
        } else {
            exp_b = 10 ** 10 ** (b.number - 2)
        }
        let exp_res = exp_a + Math.log10(1 + 
            a.sign * b.sign * 10 ** (exp_b - exp_a))
        if (exp_res < 1) {
            return {
                sign: a.sign,
                number: 10 ** exp_res,
                layer: 0
            }
        }
        if (exp_res < 10) {
            return {
                sign: a.sign,
                number: 1 + Math.log10(exp_res),
                layer: 1
            }
        }
        if (exp_res < 1e10) {
            return {
                sign: a.sign,
                number: 2 + Math.log10(Math.log10(exp_res)),
                layer: 1
            }
        }
        return {
            sign: a.sign,
            number: 3 + Math.log10(Math.log10(Math.log10(exp_res))),
            layer: 1
        }
    }
    return a
}

function sub(a, b) {
    return add(a, neg(b))
}

function log10(a) {
    if (a.sign == -1) {
        return log10(abs(a))
    }
    if (a.layer == 0) {
        return big(Math.log10(a.number))
    }
    if (a.layer == 1 && a.number < 2) {
        return {
            sign: 1,
            number: 10 ** (a.number - 1),
            layer: 0
        }
    }
    if (a.number < 10) {
        return {
            sign: 1,
            number: a.number - 1,
            layer: 1
        }
    }
}

function pow10(a) {
    if (a.sign == -1 && a.layer >= 1) {
        return {
            sign: 1,
            number: 0,
            layer: 0
        }
    }
    if (a.layer == 0) {
        return big(10 ** (a.sign * a.number))
    }
    if (a.layer == 1 && a.number < 9) {
        return {
            sign: 1,
            number: a.number + 1,
            layer: 1
        }
    }
}

function mul(a, b) {
    if (a.sign * b.sign == 1) {
        return pow10(add(log10(a), log10(b)))
    } else {
        return neg(pow10(add(log10(a), log10(b))))
    }
}

function div(a, b) {
    if (a.sign * b.sign == 1) {
        return pow10(sub(log10(a), log10(b)))
    } else {
        return neg(pow10(sub(log10(a), log10(b))))
    }
}

function pow(a, b) {
    return pow10(mul(log10(a), b))
}

function log(a, b) {
    return div(log10(b), log10(a))
}
