const suffix = ["K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"]

function format(d, sdp = 2, whole = false) {
    d = new Decimal(d)
    // Formats a number d.
    if (d.lt(0)) return "-" + format(d.neg(), sdp)
    if (d.eq(0)) return "0"
    if (d.lt(new Decimal("0.0001"))) {
        let expo = d.exponent
        let mant = d.mantissa
        return (Math.round(mant * (10 ** sdp)) / (10 ** sdp)) + "e-" + format(-expo, sdp, true)
    } else if (d.lt(1000)) {
        let dp = whole ? 0 : sdp
        return (Math.round(d.toNumber() * (10 ** dp)) / (10 ** dp)).toString()
    } else if (d.lt(new Decimal("1e36"))) {
        let highest_suffix = Math.floor(d.log10() / 3)
        return format(d.div(10 ** (3 * highest_suffix)), sdp) + suffix[highest_suffix - 1]
    } else {
        let expo = d.exponent
        let mant = d.mantissa

        return (Math.round(mant * (10 ** sdp)) / (10 ** sdp)) + "e" + format(expo, sdp, true)
    }
}