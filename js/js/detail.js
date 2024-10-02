window.onload = function () {
    (function () {
        var url = location.search;
        var text = url.substr(1);
        ids = text.split("=");
        getInfo(ids[1])
    })()
}
function getInfo(ids) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:8080/api/fundraiser/${ids}`, true);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            var data = JSON.parse(xhr.responseText)[0]
            const image = document.querySelector('#image')
            const caption = document.querySelector('#caption')
            const info = document.querySelector('#info')
            const describe = document.querySelector('#describe')
            image.src = data.URL
            caption.innerHTML = data.CAPTION
            info.innerHTML = `
                <h3>`+ data.ORGANIZER + `</h3>
                <span>Target: `+ data.TARGET_FUNDING + `</span>
                <span>Current: `+ data.CURRENT_FUNDING + `</span>
                <span>City: `+ data.CITY + `</span>
                <span>Category: `+ data.NAME + `</span>
            `
            describe.innerHTML = data.DESCRIBE
        }
    };
    xhr.send();
}