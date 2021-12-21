console.log('Website Time Limit');

function onError(error) {
  console.log(`Error: ${error}`);
}

function checkTime() {
    function onGot(times) {
        if (times[window.location.origin] === undefined) return
        let time = times[window.location.origin]
        if (time.limit <= time.used) {
            let URL = browser.extension.getURL("goback/index.html");
            location.replace(URL + '?loc=' + window.location.origin + '&page=' + window.location.pathname);
        }
    }

    let times = browser.storage.local.get();
    times.then(onGot, onError);
}

checkTime();

function doit() {

    let domain = window.location.origin
    let limit = 5
    let used = 0

    function onGot(times) {
        console.log(times)
        let limit = times[domain].limit
        let used = times[domain].used + 1

        console.log(used)

        let obj = {}
        obj[domain] = {
            limit: limit,
            used: used
        }

        console.log(obj)

        // let settingItem = browser.storage.local.set(obj)
    }
    let times = browser.storage.local.get();
    times.then(onGot, onError);

    checkTime();
}
setInterval(doit, 1000);
