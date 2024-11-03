function decimalise(obj) {
    if (obj == null) return obj

    if (Array.isArray(obj)) {
        for (let i in obj) {
            obj[i] = decimalise(obj[i])
        }
        return obj
    } else if (typeof obj == "object") {
        let k = Object.keys(obj)
        for (let i of k) {
            obj[i] = decimalise(obj[i])
        }
        return obj
    } else if (typeof obj == "string") {
        let attempt = new Decimal(obj)
        if (attempt.eq(0)) {
            if (obj === "0") {
                return attempt
            } else {
                // Object is not a valid decimal
                return obj
            }
        } else {
            if (isNaN(attempt.mantissa) || isNaN(attempt.exponent)) {
                return obj
            }
            return attempt
        }
    } else {
        return obj
    }
}

function save() {
    let save_data = btoa(JSON.stringify(player))
    localStorage.setItem("amops", save_data)
    localStorage.setItem("amops_time", Date.now().toString())
}

function load() {
    let save_data = localStorage.getItem("amops")
    if (save_data != null) {
        let decrypted_save_data = JSON.parse(atob(save_data))
        player = decimalise(decrypted_save_data)
        player.offline_time += (Date.now() - Number(localStorage.getItem("amops_time")))
        player.offline_time = Math.min(player.offline_time, 24 * 60 * 60 * 1000)
        save()
        return true
    } else {
        return false
    }
}

function reset_everything(noprompt) {
    if (!noprompt) {
        if (!confirm("Really hard reset? This gives no bonuses.")) return
        if (!confirm("REALLY hard reset? This will not unlock anything.")) return
    }

    localStorage.removeItem("amops")
    localStorage.removeItem("amops_time")
    document.location.reload()
}

if (!load()) {player = def_player} else {save()} // Load the game

setInterval(() => {
    save()
}, 15000)