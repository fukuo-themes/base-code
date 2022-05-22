/*
Author: Fukuo
Last updated: 4/5/2022

*/

var app = {
    init: function () {
        app.mobileToggle();
        app.masonry();
        app.postNPF();
        app.postPhotosets();
        app.postSoundCloud();
        app.postSpotify();
        app.postBandCamp();
        app.postShare();
        app.infiniteScroll();
        app.truncate();
        app.buttonTruncated();
    },
    mobileToggle: () => {
        const btnHamburger = document.querySelector('button[data-type-button="hamburger"]');
        const wrapperMenu = document.querySelector('.header__links');

        btnHamburger.addEventListener("click", function() {
            wrapperMenu.classList.toggle("is-shown");
            if(wrapperMenu.classList.contains('is-shown')) {
                this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
            } else {
                this.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
            }
           });
    },
    postNPF: () => {
        const npfOptions = {
          includeCommonPhotosets: false,
          photosetMargins: "0",
          galleryIndicatorClass: "npf_gallery_indicator",
          galleryIndicatorContent: "<i class='las la-expand'></i>",
        };
        npfPhotosets(".posts", npfOptions);
    },
    postPhotosets: () => {
        initPhotosets();
    },
    postSoundCloud: () => {
        const soundcloudColor = "#de8100";
        const soundcloudPlayers = document.querySelectorAll(
          ".soundcloud_audio_player"
        );
    
        if (soundcloudPlayers) {
          soundcloudPlayers.forEach(function (s, idx) {
            const url = s.getAttribute("src").split("&")[0];
            const options =
              "&amp;liking=false&amp;sharing=false&amp;auto_play=false&amp;show_comments=false&amp;continuous_play=false&amp;buying=false&amp;show_playcount=false&amp;show_artwork=true&amp;origin=tumblr&amp;color=" +
              soundcloudColor.split("#")[1];
            s.setAttribute("src", url + options);
            s.setAttribute("height", 116);
    
            s.parentElement.classList.add("is-soundcloud");
          });
        }
    },
    postSpotify: () => {
        const spotifyPlayers = document.querySelectorAll(".spotify_audio_player");
        if (spotifyPlayers) {
          spotifyPlayers.forEach(function (sp, idx) {
            sp.parentElement.classList.add("is-spotify");
          });
        }
    },
    postBandCamp: () => {
        const bandCamp = document.querySelectorAll(".bandcamp_audio_player");
        if (bandCamp) {
          for (b of bandCamp) {
            b.parentElement.classList.add("is-bandcamp");
          }
        }
    },
    infiniteScroll: () => {

      const isPaginationExist = document.querySelector(".pagination");

      if(typeof(isPaginationExist) != 'undefined' && isPaginationExist != null) {
        const elem = document.querySelector('.wrapper__posts');
        const infScroll = new InfiniteScroll(elem, {
          // options
              hideNav: '.pagination',
              path: '.pagination__inner a.is-next',
              append: '.posts:not(.pinned)',
              button: '.wrapper__posts__load a',
              status: '.page-load-status',
             // load pages on button click
              scrollThreshold: false,
              debug: true,
              history: true
          });
          
          infScroll.on( 'append', function(response, path, items) {
              console.log( items.length + ' items appended' );
              console.log(path);
              
              let itemsID = Array.from(items).map(event => {
                  return event.getAttribute('id');
              });
              
              Tumblr.LikeButton.get_status_by_post_ids(itemsID);
              app.postNPF();
              app.postNPF();
              app.postPhotosets();
              app.postSoundCloud();
              app.postSpotify();
              app.postBandCamp();
          });
          
          infScroll.on( 'last', function( response, path ) {
           
          });
      }
      
    },
    truncate: (element, limit = 25, after) => {
      if (!element || !limit) return;
    
      let content = element.innerHTML.trim();
    
      content = content.split(" ").slice(0, limit);
      content = content.join(" ") + (after ? after : "");
    
      element.innerHTML = content;
  },
};
  
document.addEventListener("DOMContentLoaded", () => {
    app.init();
});
  