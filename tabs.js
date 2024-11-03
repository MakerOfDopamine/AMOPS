const tabs = ["main", "enchants"]

function switchTab(id = 0) {
    for (let i of tabs) {
        ge(i).style.display = "none"
    }

    ge(tabs[id]).style.display = "block"
}

