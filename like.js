
window.onload = function () {
        showsApp.init();
        console.log(localStorage);
};

var showsApp = {

        data: null,
        showsDataSection: null,

        init: function init() {
                console.log("start apki");
                this.showsDataSection = document.querySelector(".shows-data-section"); //querySelector
                this.loadData();
        },

        loadData: function loadData() {
                var _this = this;

                fetch("https://itunes.apple.com/us/rss/topmovies/limit=100/json").then(function (response) {
                        return response.json();
                }).then(function (data) {
                        return _this.dataReady(data.feed.entry);
                });
        },

        dataReady: function dataReady(showData) {
                this.data = showData;

                cos = showData[0].title.label;

                console.log(showData);
                console.log(showData.length);

                var show = showData[0];
                var title = null;
                title = showData[0].title.label;
                var genres = null;
                genres = showData[0].title.label;

                var allBoxesHtml = "";
                console.log(show);
                // for(let i = 0; i < 1; i++){
                imgSrc = showData[0]["im:image"][2].label;

                var summary = showData[0].title.label;
                summary = "\n            <p>picture: " + imgSrc + " </p>\n            <img src=\"" + imgSrc + "\" alt=\"\">\n            <p>title: " + title + " </p>\n            \n            <br>\n        " + summary;

                var imgSrc2 = [];
                var title2 = [];
                var overview2 = [];
                console.log(imgSrc2);
                for (var i = 0; i < 14; i++) {
                        imgSrc2.push(showData[i]["im:image"][2].label);
                        title2.push(showData[i].title.label);
                        overview2.push(showData[i].summary.label);
                        console.log(overview2);
                        console.log(imgSrc2);
                        // add to local storage
                        // $(function(){ var test = localStorage.input === 'true'? true: false; $('input').prop('checked', test); }); $('input').on('change', function() { localStorage.input = $(this).is(':checked'); console.log($(this).is(':checked')); }); 
                        //   $(function(){
                        //     var test = localStorage.input === 'true'? true: false;
                        //     $('input').prop('checked', test || false);
                        //     console.log(localStorage.input + "11111111");
                        // });
                        // $('input').on('change', function() {
                        //     console.log(localStorage);
                        //     localStorage.input = $(this).is(':checked');
                        //     console.log($(this).is(':checked'));
                        //     console.log(localStorage);
                        // });


                        document.getElementById("picture" + i).innerHTML = "<img src=\"" + imgSrc2[i] + "\" alt=\"\">";
                        // document.getElementById("title"+i).innerHTML = `${title2[i]}`;
                        document.getElementById("overview" + i).innerHTML = "<p><input type=\"checkbox\" id=\"" + i + "\"></input></p><h3>" + title2[i] + "</h3><p>" + overview2[i] + "</p>";
                        console.log(i);
                        // document.getElementById("tescik").innerHTML = `<p><input type="checkbox" id="${i}"></input></p><h3>${title2[0]}</h3><p>${overview2[0]}</p>`;
                }

                //add movie under navbar
                document.getElementById("root").innerHTML = "<img src=\"" + imgSrc2[5] + "\" alt=\"\">\n        <div class=\"text\">\n        <p>" + overview2[5] + "</p>\n          <div class=\"buttons\">\n            <button type=\"button\" id=\"button1\">   &nbsp;  Play</button> \n            <button type=\"button\" id=\"button2\"> &#9432 Info</button> \n          </div>\n\n      </div>\n      ";
                document.getElementsByClassName("buttons").innerHTML = "<button type=\"button\">Click Me!</button> ";

                var boxes = document.getElementsByClassName('box').length;
                console.log(document.getElementsByClassName('box').length);
                console.log("nademna");

                function save() {
                        for (var a = 0; a < 14; a++) {
                                var checkbox = document.getElementById(String(a));
                                localStorage.setItem("checkbox" + String(a), checkbox.checked);
                                // console.log(localStorage);
                                // console.log(a);
                        }
                }

                //for loading
                for (var a = 0; a < 14; a++) {
                        if (localStorage.length > 0) {

                                var checked = JSON.parse(localStorage.getItem("checkbox" + String(a)));
                                document.getElementById(String(a)).checked = checked;

                                var check = localStorage.getItem("checkbox" + String(a));

                                if (check === "true") {
                                        console.log(a);
                                        // allBoxesHtml += this.getShowBoxByTemplate(imgSrc2[a], title2[a], overview2[a], summary, a);
                                        console.log("tak weszlo" + a);
                                        allBoxesHtml += "\n              <div class=\"show-box\">\n                      <div class=\"show-favorite\"><p><button class=\"" + a + "\">Remove from favorite</button><img src=\"" + imgSrc2[a] + "\" alt=\"\"></p></div>\n                      <div class=\"show-title\">" + title2[a] + "</div>\n                      <div class=\"show-genres\">" + overview2[a] + "</div>\n                      \n                  </div>\n              ";
                                }
                                // <div class="show-favorite"><p><input type="checkbox" id="${a}" class="box1"></input><img src="${imgSrc2[a]}" alt=""></p></div>
                        }
                }
                function save2() {
                        for (var _a = 0; _a < 14; _a++) {
                                var checkbox = document.getElementById(String(_a));
                                localStorage.setItem("checkbox" + String(_a), checkbox.checked);
                                // console.log(localStorage);
                                // console.log(a);
                        }
                }
                console.log(localStorage.getItem("checkbox13"));
                // localStorage.setItem("checkbox1", "true")

                document.getElementById("test").innerHTML = allBoxesHtml;
                window.addEventListener('change', save);

                // delete from favorite

                var _loop = function _loop(_a2) {
                        button = "." + _a2;

                        console.log(button);
                        $(document).ready(function () {
                                $("." + _a2).on("click", function () {
                                        localStorage.setItem("checkbox" + _a2, "false");
                                        console.log(localStorage.getItem("checkbox" + _a2));
                                        window.location.reload();
                                });
                        });
                        // console.log(allBoxesHtml);
                };

                for (var _a2 = 0; _a2 < 14; _a2++) {
                        var button;

                        _loop(_a2);
                }

                // let boxes2 = document.getElementsByClassName('box1').length;
                // function save2() {	
                //   for(let a = 0; a < 14; a++){
                //     var checkbox = document.getElementById(String(a));
                //     console.log(checkbox);
                //     localStorage.setItem("checkbox" + String(a), checkbox.checked);	
                //     console.log(a);

                //   }
                // }
                // for(let a = 0; a < 14; a++){
                //   if(localStorage.length > 0){

                //     var checked = JSON.parse(localStorage.getItem("checkbox" + String(a)));
                //     document.getElementById(String(a)).checked = checked;
                //   }
                // }

                // window.addEventListener('change', save2);
                // let boxes2 = document.getElementsByClassName('box1').length;
                // console.log(boxes2);
                // function save2() {	
                //   for(let a = 0; a < boxes; a++){
                //     let check = localStorage.getItem("checkbox" + String(a));
                //     if (check === "true" || check === "false")
                //     var checkbox = document.getElementById(String(a));
                //     localStorage.setItem("checkbox" + String(a), checkbox.checked);	


                //   }
                // }
                // console.log(boxes2);

                // window.addEventListener('change', save2);


                // for(let a = 0; a < boxes; a++){
                //   if(localStorage.length > 0){
                //     var checked = JSON.parse(localStorage.getItem("checkbox" + String(a)));
                //     document.getElementById(String(a)).checked = checked;
                //     console.log(checked);
                //   }
                // }


                // function save() {	
                //   for(let a = 0; a < boxes; a++){
                //     var checkbox = document.getElementById(String(a));
                //     localStorage.setItem("checkbox" + String(a), checkbox.checked);	
                //   }
                // }
                // for(let a = 0; a < boxes; a++){
                //   if(localStorage.length > 0){
                //     var checked = JSON.parse(localStorage.getItem("checkbox" + String(a)));
                //     document.getElementById(String(a)).checked = checked;

                //     // let check = localStorage.getItem("checkbox" + String(a));
                //   }
                // }
                // window.addEventListener('change', save);


                // allBoxesHtml += this.getShowBoxByTemplate(imgSrc, title, genres, summary);


                // let img = `<img src="${imgSrc}" alt="">`
                // document.getElementById("picture1").innerHTML = `<img src="${imgSrc}" alt="">`;
                // document.getElementById("picture1").innerHTML = `<img src="${imgSrc}" alt="">`;
                // document.getElementById("picture2").innerHTML = `<img src="${imgSrc}" alt="">`;

                // }


                // this.showsDataSection.innerHTML = allBoxesHtml;


                console.log("nademna");
        },

        getShowBoxByTemplate: function getShowBoxByTemplate(imgSrc2, title2, genres2, overview2, a) {
                return "\n        <div class=\"show-box\">\n                <div class=\"show-favorite\"><input type=\"checkbox\" id=\"" + a + "\" class=\"box\"></input><img src=\"" + imgSrc2 + "\" alt=\"\"></div>\n                \n                <div class=\"show-title\">" + title2 + "</div>\n                <div class=\"show-genres\">" + genres2 + "</div>\n                <!--<div class=\"show-overview\">" + overview2 + "</div>  dla opisu filmu-->\n                \n            </div>\n        ";
        }

};

// carousel
var prev = document.querySelector('.prev');
var next = document.querySelector('.next');

var track = document.querySelector('.track');

var carouselWidth = document.querySelector('.carousel-container').offsetWidth;

window.addEventListener('resize', function () {
        carouselWidth = document.querySelector('.carousel-container').offsetWidth;
});

var index = 0;

next.addEventListener('click', function () {
        index++;
        prev.classList.add('show');
        track.style.transform = "translateX(-" + index * carouselWidth + "px)";

        if (track.offsetWidth - index * carouselWidth < carouselWidth) {
                next.classList.add('hide');
        }
});

prev.addEventListener('click', function () {
        index--;
        next.classList.remove('hide');
        if (index === 0) {
                prev.classList.remove('show');
        }
        track.style.transform = "translateX(-" + index * carouselWidth + "px)";
});