window.onload = function (){
    showsApp.init();
    console.log(localStorage);
}
  
let showsApp = {
 
    data: null,
    showsDataSection: null,

    init: function(){
        console.log("start apki");
        this.showsDataSection = document.querySelector(".shows-data-section"); //querySelector
        this.loadData();
        
    },

    loadData: function(){
        fetch("https://itunes.apple.com/us/rss/topmovies/limit=100/json")
        .then(response => response.json())
        .then(data => this.dataReady(data.feed.entry))
    },

    dataReady: function(showData){
        this.data = showData;
        
        // console.log(showData);
        // console.log(showData.length);

        // let show = showData[0];
        let title = null;
        title = showData[0].title.label;
        let genres = null;
        genres = showData[0].title.label;

        let allBoxesHtml = "";
        // console.log(show);


        // display only one movie
        // imgSrc = showData[0]["im:image"][2].label;
        
        // let summary = showData[0].title.label;
        // summary = `
        //     <p>picture: ${imgSrc} </p>
        //     <img src="${imgSrc}" alt="">
        //     <p>title: ${title} </p>
            
        //     <br>
        // ` + summary;

        
        const imgSrc2 = [];
        const title2 = [];
        const overview2 = [];
        // console.log(imgSrc2);
        for(let i = 0; i < 14; i++){
            imgSrc2.push(showData[i]["im:image"][2].label);
            title2.push(showData[i].title.label);
            overview2.push(showData[i].summary.label);
            // console.log(overview2);
            // console.log(imgSrc2);
            
            //Continue to Watch
            document.getElementById("picture"+i).innerHTML = `<img src="${imgSrc2[i]}" alt="">`;
            document.getElementById("overview"+i).innerHTML = `<p><input type="checkbox" id="${i}"></input></p><h3>${title2[i]}</h3><p>${overview2[i]}</p>`;
 
        }


        //movie under navbar
        document.getElementById("root").innerHTML = `<img src="${imgSrc2[5]}" alt="">
        <div class="text">
        <p>${overview2[5]}</p>
          <div class="buttons">
            <button type="button" id="button1">   &nbsp;  Play</button> 
            <button type="button" id="button2"> &#9432 Info</button> 
          </div>

      </div>
      `;
        document.getElementsByClassName("buttons").innerHTML = `<button type="button">Click Me!</button> `;


        let boxes = document.getElementsByClassName('box').length;
        // console.log(document.getElementsByClassName('box').length);

        //save to local storage
        function save() {	
          for(let a = 0; a < 14; a++){
            var checkbox = document.getElementById(String(a));
            localStorage.setItem("checkbox" + String(a), checkbox.checked);	
            // console.log(localStorage);
            // console.log(a);
          }
        }

        //for loading from local storage
        for(let a = 0; a < 14; a++){
          if(localStorage.length > 0){

            var checked = JSON.parse(localStorage.getItem("checkbox" + String(a)));
            document.getElementById(String(a)).checked = checked;

            let check = localStorage.getItem("checkbox" + String(a));
            
            if(check === "true"){
              // console.log(a);
              allBoxesHtml += `
              <div class="show-box">
                <div class="show-favorite"><p><button class="${a}">Remove from favorite</button><img src="${imgSrc2[a]}" alt=""></p></div>
                <div class="show-title">${title2[a]}</div>
                <div class="show-genres">${overview2[a]}</div>     
              </div>
              `
            }
          }
        }
        function save2() {	
          for(let a = 0; a < 14; a++){
            var checkbox = document.getElementById(String(a));
            localStorage.setItem("checkbox" + String(a), checkbox.checked);	
            // console.log(localStorage);
            // console.log(a);
          }
        }
        // console.log(localStorage.getItem("checkbox13"));

        document.getElementById("show-favorite-section").innerHTML = allBoxesHtml;
        window.addEventListener('change', save);
        

        // delete from favorite on click remove from favorite
        for(let a = 0; a < 14; a++){
          // var button = "." + a;
          // console.log(button)
          $(document).ready(function(){
            $("." + a).on("click", function() {
              localStorage.setItem("checkbox" + a, "false");
              // console.log(localStorage.getItem("checkbox" + a));
              window.location.reload();
            })
          });
          // console.log(allBoxesHtml);
        }
    },
    
    

    getShowBoxByTemplate: function(imgSrc2, title2, genres2, overview2, a){
        return `
        <div class="show-box">
          <div class="show-favorite"><input type="checkbox" id="${a}" class="box"></input><img src="${imgSrc2}" alt=""></div>
          <div class="show-title">${title2}</div>
          <div class="show-genres">${genres2}</div>     
        </div>
        `
    }
};


// carousel
const prev  = document.querySelector('.prev');
const next = document.querySelector('.next');

const track = document.querySelector('.track');

let carouselWidth = document.querySelector('.carousel-container').offsetWidth;

window.addEventListener('resize', () => {
  carouselWidth = document.querySelector('.carousel-container').offsetWidth;
})

let index = 0;

next.addEventListener('click', () => {
  index++;
  prev.classList.add('show');
  track.style.transform = `translateX(-${index * carouselWidth}px)`;
  
  if (track.offsetWidth - (index * carouselWidth) < carouselWidth) {
    next.classList.add('hide');
  }
})

prev.addEventListener('click', () => {
  index--;
  next.classList.remove('hide');
  if (index === 0) {
    prev.classList.remove('show');
  }
  track.style.transform = `translateX(-${index * carouselWidth}px)`;
})




