let params = window.location.search;

params = params.slice(5, params.length).split('&');

let domain = params[0];

let page = params[1].slice(5, params[1].length);

document.querySelector('h1 span').textContent = domain;

document.getElementById('goback').onclick = function() {
    window.history.back();
};

document.getElementById('continue').onclick = function() {
    if (prompt('Type "Yes i want to over ride the time limit." to continue.') === 'Yes i want to over ride the time limit.') {
        // let domain = "https://www.khanacademy.org"
        // let limit = 5
        // let used = 0

        // function onGot(times) {
        //     if (typeof times[domain] === undefined) return
        //     let limit = times[domain].limit
        //     let used = limit - 10
        //     if (used < 0) used = 0

        //     let obj = {}
        //     obj[domain] = {
        //         limit: limit,
        //         used: used
        //     }

        //     console.log(obj)

        //     let settingItem = browser.storage.local.set(obj)
        // }
        // let times = browser.storage.local.get();
        // times.then(onGot, onError);
        window.location.replace(domain + page);
    }
};
