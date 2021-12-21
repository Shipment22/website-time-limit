document.getElementById('setthing').onclick = function() {
	let domain = "https://www.khanacademy.org"
	let limit = 50
	let used = 0

	function onGot(times) {
		if (typeof times[domain] === undefined) {
			times[domain] = {}
		}

        limit = times[domain].limit
        used = times[domain].used

    	let obj = {
	    	limit: limit,
	    	used: used
	    }

		let settingItem = browser.storage.local.set({ `${domain}`: obj })
    }

    function onError(error) {
      console.log(`Error: ${error}`);
    }


    let times = browser.storage.local.get();
    times.then(onGot, onError);
}