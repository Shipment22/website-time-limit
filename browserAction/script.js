function q(q) {
    return document.querySelector(q)
}

function lawg(l) {
    document.body.innerHTML += l
}

let domains = q('#domains')
let newdomain = q('#newdomain')
let hours = q('#hours')
let minutes = q('#minutes')
let start = q('#start')
let startampm = q('#startampm')
let end = q('#end')
let endampm = q('#endampm')
let days = q('#days')
let done = q('#done')
let used = q('#used')

chrome.storage.local.get(setDomainsHTML);

function setDomainsHTML(items) {
    for (let o in items) {
        if (o.search('https://') || o.search('http://')) {
            let d = document.createElement('option')
            d.value = o
            d.textContent = o
            d.classList.add('domainname')
            domains.appendChild(d)

            used.value = items[o].used || 0
        }
    }
}

domains.onchange = function() {
    if (domains.value === 'add') {
        newdomain.style.display = 'inline'
    } else {
        newdomain.style.display = 'none'

        chrome.storage.local.get(domains.value, getStuffs)
    }

}

function getStuffs(oo) {
    obj = oo[domains.value]
    hours.value = obj.hours
    minutes.value = obj.minutes
    start.value = obj.start
    startampm.value = obj.startampm
    end.value = obj.end
    endampm.value = obj.endampm
    days.value = obj.days
    used.value = obj.used

    // lawg(JSON.stringify(obj))
}

done.onclick = function () {
    let obj = {};

    let site = domains.value

    if (site === 'add') {
        site = newdomain.value
        if (site.length < 6) {
            alert('that is too short to be a domain name') 
            return
        }
    }

    // lawg(site)

    obj.hours = hours.value
    obj.minutes = minutes.value
    obj.start = start.value
    obj.startampm = startampm.value
    obj.end = end.value
    obj.endampm = endampm.value
    obj.days = days.value
    obj.used = used.value

    let doit = {}

    doit[site] = obj

    chrome.storage.local.set(doit)

    // lawg(JSON.stringify(obj))

    location.reload();
}

if (domains.value === 'add') {
    newdomain.style.display = 'inline'
} else {
    newdomain.style.display = 'none'
}