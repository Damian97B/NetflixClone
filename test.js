window.onload = function (){
    showsApp.init();
}

let showsApp = {
    
    data: null,
    searchInput: null,
    showsDataSection: null,


    init: function(){
        console.log("start apki");
        // this.searchInput = document.getElementById("search-input");
        // this.searchInput.addEventListener("keyup", (e) => {
        //     // if(e.keyCode == 13){
        //     //     console.log("enter");
        //     //     this.loadData(this.searchInput.value);
        //     // }
        // });
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


        console.log(showData);
        console.log(showData.length);


        let allBoxesHtml = "";

        // for(let i = 0; i < showData.length; i++){
        for(let i = 0; i < 1; i++){

            

            let show = showData[i];
            console.log(showData[i]);
            let score = show.score;
            show = show.show;
            console.log(show, "-----------");

            let genres = showData[i].category.attributes.label;
            console.log(genres);

            let imgSrc = null;
            // let imgSrcOriginal = null;
            // if(show.image){
                imgSrc = showData[i]["im:image"][2].label;
                console.log(imgSrc);
            // imgSrcOriginal = show.image.original;
            // } else {
            //     imgSrc = "https://cdn.pixabay.com/photo/2020/11/30/18/14/smpte-color-bars-5791787__480.png";
            //     imgSrcOriginal = "https://cdn.pixabay.com/photo/2020/11/30/18/14/smpte-color-bars-5791787__480.png";
            // }
            
            let title = null;
            title = showData[i].title.label;

            let network = "-";
            network = showData[i].title.label;

            let officialSite = "-"
            officialSite = showData[i].title.label;

            let premiered = "-"
            premiered = showData[i].title.label;

            let summary = showData[i].title.label;

            
            summary = `
                <p>Show: ${title} </p>
                <p>Date: ${premiered} </p>
                <p>Network: ${network} </p>
                <input type="checkbox" id="${i}">
                <br>
            ` + summary;

            allBoxesHtml += this.getShowBoxByTemplate(imgSrc, title, genres, summary);
        }

        this.showsDataSection.innerHTML = allBoxesHtml;

        $(function(){ var test = localStorage.input === 'true'? true: false; $('input').prop('checked', test); }); $('input').on('change', function() { localStorage.input = $(this).is(':checked'); console.log($(this).is(':checked')); }); 
        // $(function(){
        //     var test = localStorage.input === 'true'? true: false;
        //     $('input').prop('checked', test || false);
        //     console.log(localStorage.input + "11111111");
        // });
        // console.log("tak to tutaj");
        // var id = ".attr('id')";
        // console.log(id);
        // $('input').on('change', function() {
        //     console.log(localStorage + "22222222");
        //     localStorage.input = $(this).is(':checked');
        //     var id = $('input').attr('id');
        //     console.log(id);
            // console.log($(this).is(':checked'));
            // console.log(this);
            // console.log(localStorage);
        // });


    },

    getShowBoxByTemplate: function(imgSrc, title, genres, overview){
        

        return `
        <div class="show-box">
                <img src="${imgSrc}" alt="">
                <div class="show-title">${title}</div>
                <div class="show-genres">${genres}</div>
                <div class="show-overview">${overview}</div>
                <div class="show-favorite"><input type="checkbox"></div>
            </div>
        `
        
    }

};


