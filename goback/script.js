let params = window.location.search

params = params.slice(8, params.length).split('&')

let origin = params[0]

let path = params[1].slice(9, params[1].length)

let url = origin + path

document.querySelector('h1 span').textContent = origin

document.getElementById('goback').onclick = function() {
    window.history.back()
};

document.getElementById('continue').onclick = function() {
    if (prompt('Type "Yes i want to over ride the time limit." to continue (snooze the time for 15min).') === 'Yes i want to over ride the time limit.') {
        
        chrome.storage.local.get(origin, stuffs => {
            let things = stuffs[origin]
            things.used -= 15
            stuffs[origin] = things
            chrome.storage.local.set(stuffs)
        })

        window.location.replace(url);
    }
};
