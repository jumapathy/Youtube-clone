const videoCardContainer = document.querySelector('.video-container');

let api_key = "AIzaSyD_qTP7h-g9m8TH5sgNxeZ4waWw3KBGWzw";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    "part": [
        "snippet,contentDetails,statistics"
      ],
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN',
    mine:true
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
        //console.log(item);
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        "part": [
            "snippet,contentDetails,statistics"
          ],
          id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
       makeVideoCard(video_data);
        //console.log(data);
    })
}

const makeVideoCard = (data) => {
 
    // const h4Element = document.createElement('h4');
    // h4Element.classList.add("title")
    // h4Element.innerHTML=data.snippet.title

    // const pElement = document.createElement('p');
    // pElement.classList.add("channel-name")
    // pElement.innerHTML=data.snippet.channelTitle
    
    // const infoElement = document.createElement("div");
    // infoElement.classList.add("info");

    // infoElement.append(
    // h4Element,
    // pElement
    // );

    // const channelIconElement = document.createElement("img");
    // channelIconElement.classList.add("channel-icon");
    // channelIconElement.setAttribute('src',data.snippet.thumbnails.high.url);
    // channelIconElement.setAttribute('alt','""');

    
    // const contentElement = document.createElement("div");
    // contentElement.classList.add("content");
         
    // contentElement.append(
    //     channelIconElement,
    //     infoElement
    // )
    // const tumbnailElement = document.createElement("img");
    // tumbnailElement.classList.add("thumbnail");
    // tumbnailElement.setAttribute('src',data.snippet.thumbnails.high.url);
    // tumbnailElement.setAttribute('alt','""');

    
    // const videoElement = document.createElement("div");
    // videoElement.classList.add("video");
    // videoElement.setAttribute.innerHTML +=`'onclick',"location.href ='https://youtube.com/watch?v=${data.id}'"`;

    // videoElement.append(
    //     tumbnailElement,
    //     contentElement
    // )
    //  videoCardContainer.appendChild(videoElement);
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}

// search bar

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})
