console.log('Website Time Limit')

let updateInterval;

if (document.visibilityState === 'visible') {
    updateInterval = setInterval(update, 60000)
}

document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === 'hidden') {
        clearInterval(updateInterval)
        updateInterval = null
    } else {
        updateInterval = setInterval(update, 60000)
    }
})

function redirect() {
    let url = chrome.extension.getURL('goback/index.html')
    let origin = window.location.origin
    let pathname = window.location.pathname
    window.location.replace(`${url}?origin=${origin}&pathname=${pathname}`)
}

function checkTime(sock) {
    let limit = (sock.hours * 6) + sock.minutes
    if (sock.used > limit) {
        redirect()
    }
}

async function update() {
    let loc = window.location.origin

    let stuffs = await chrome.storage.local.get(loc)
    let sock = stuffs[loc]

    if (!stuffs || sock.hours <= 0 || sock.minutes <= 0) return

    sock.used ++

    checkTime(sock)

    chrome.storage.local.set(stuffs)
}