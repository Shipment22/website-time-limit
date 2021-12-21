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
        // give more time
        window.location.replace(domain + page);
    }
};
