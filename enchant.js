const token_enchant_ids = [];

function getEnchantCost(id, amount = 0) {
    switch (id) {
        case 0:
            return D(1).mul(D(1.1).pow(amount))
        case 1:
            return D(2).mul(D(1.15).pow(amount))
        default:
            console.log("wtf happened")
            return D(0)
    }
}

function enchant(id) {
    let is_token = token_enchant_ids.includes(id)
    let currency = is_token ? player.tokens : player.money;
    let cost = getEnchantCost(id, player.enchants[id])

    if (currency.lte(cost)) return

    player.enchants[id] = player.enchants[id].add(1)
    if (is_token) {
        player.tokens = player.tokens.sub(cost)
    } else {
        player.money = player.money.sub(cost)
    }
}