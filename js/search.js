window.onload = function () {
    getList()
}
function getList(ids) {
    var xhr = new XMLHttpRequest();
    let url = ''
    if (ids) {
        url = 'http://localhost:8080/api/search?category='+ids
    } else {
        url = 'http://localhost:8080/api/search'
    }
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            let data = []
            let homeData = []
            JSON.parse(xhr.responseText).forEach(item => {
                data.push(item)
                if (item.ACTIVE == 1 && homeData.length < 3) {
                    homeData.push(item)
                }
            });
            const content = document.querySelector('#homeList')
            const caselist = document.querySelector('#caselist')
            let text = ''
            let text1 = ''
            homeData.forEach(element => {
                text += `
                        <li>
                            <div class="casethumb">
                                <a href="./min.html">
                                    <img src="`+element.URL+`" width="340" />
                                    <div class="vlock">
                                        <p>VIEW DETAIL</p>
                                    </div>
                                </a>
                            </div>
                            <div class="info">
                                <p class="organizer">`+element.ORGANIZER+`</p>
                                <p class="caption">`+element.CAPTION+`</p>
                                <p class="i-item target">
                                    <span>Target:</span>
                                    `+ element.TARGET_FUNDING +`
                                </p>
                                <p class="i-item current">
                                    <span>Current:</span>
                                    `+element.CURRENT_FUNDING+`
                                </p>
                                <p class="i-item city">
                                    <span>City:</span>
                                    `+element.CITY+`
                                </p>
                                <p class="i-item status">
                                    <span>Status:</span>
                                    `+ (element.ACTIVE == 1 ? 'ACTIVE' : 'SUSPENDED')+`
                                </p>
                                <p class="i-item category">
                                    <span>Category:</span>
                                    `+element.CATEGORY+`
                                </p>
                            </div>
                        </li>
                        `
            });
            data.forEach(element => {
                text1 += `
                    <li class="item" onclick="toDetail(`+element.FUNDRAISER_ID+`)">
                        <div class="bcf">
                            <div class="thumb">
                                <a href="#">
                                    <img src="`+element.URL+`" />
                                </a>
                            </div>
                            <h3><a href="#">`+element.CAPTION+`</a></h3>
                            <p class="desc">`+element.DESCRIBE+`</p>
                            <p><a href="#" class="nmore">VIEW MORE</a></p>
                        </div>
                    </li>
                `
            })
            if (content) {
                content.innerHTML = text
            }
            if (caselist) {
                caselist.innerHTML = text1
            }
            
        }
    };
    xhr.send();
}
function toDetail(id) {
    window.location.href="./min.html?id="+id
}