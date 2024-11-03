const ge = x => document.getElementById(x)
const D = x => new Decimal(x)

const blocks = [
    {
        name: "Dirt",
        value: D(0.1),
    },
    {
        name: "Stone",
        value: D(0.2),
    },
    {
        name: "Andesite",
        value: D(0.5),
    },
    {
        name: "Granite",
        value: D(1),
    },
    {
        name: "Example Block",
        value: D(2),
    }
]

const unlock_thresholds = [
    D(0), D(100), D(1000), D(5000), D(10000)
]

const def_player = {
    money: D(0),
    tokens: D(0),
    xp: D(0),
    blocks_broken: D(0),
    enchants: [
        D(0), // Efficiency
        D(0)  // Fortune
    ],
    offline_time: 0
}

let player = def_player;
let b = 0;

function getBBP() {
    let bps = 0.5
    bps = bps * (1 + player.enchants[0].toNumber() / 10)
    return bps / 20
}

function blockBreak() {
    let value = blocks[b].value
    value = value.mul(D(1.05).pow(player.enchants[1]))

    player.money = player.money.add(value)
    player.tokens = player.tokens.add(value.div(10))
    player.blocks_broken = player.blocks_broken.add(1)
}

switchTab(0)
let bbp = 0
setInterval(() => {
    bbp += getBBP()

    if (bbp > 1) {
        bbp -= 1
        blockBreak()
    }

    ge("moneyDisplay").innerHTML = format(player.money)
    ge("tokenDisplay").innerHTML = format(player.tokens)
    ge("bbDisplay").innerHTML = format(player.blocks_broken)
    ge("bbp").value = bbp * 100

    ge("efficiency").innerHTML = `Efficiency ${format(player.enchants[0], 2, true)}: Gain +10% mining speed per level. Cost: \$${format(getEnchantCost(0, player.enchants[0]))}   `
    ge("fortune").innerHTML = `Fortune ${format(player.enchants[1], 2, true)}: Gain +5% value (multiplicatively) per level. Cost: \$${format(getEnchantCost(1, player.enchants[1]))}   `

    for (let i = 0; i < unlock_thresholds.length; i++) {
        if (unlock_thresholds[i].gte(player.blocks_broken)) {
            b = Math.max(i - 1, 0)
            break
        }
    }

    ge("blockDisplay").innerHTML = blocks[b].name
}, 50)