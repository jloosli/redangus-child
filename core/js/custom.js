(function ($) {
    function playVideo(vidURL, vidContentType, lotID, lotImg) {

        var lot_number = $("#lot_" + lotID).data("lotNumber");

        if (vidURL == '') {
            $("#video_player_wrapper").hide();
            $("#video_coming_soon").show();
        } else {
            var $videoPlayer = $("#video_player");
            $videoPlayer.get(0).pause();
            $("#video_source").attr("src", vidURL);
            $videoPlayer.get(0).load();
            $videoPlayer.get(0).play();
            $("#video_coming_soon").hide();
            $("#video_player_wrapper").show();
            $("#lot_list").show();
            $('#additional_lot_information').show();
        }
        //showLotDetails(lotID, lotImg);
    }

    function setToTop(lot_number) {
        $(".lot_link_wrapper[data-lot-number='" + lot_number + "']").remove().prependTo("#lot_list");
    }

    function setOrder(lot_numbers) {
        for (var i = lot_numbers.length; i >= 0; i--)
            setToTop(lot_numbers[i]);

        $('.lot_link[data-available=1]').first().trigger('click');
    }

    function addTitle(lot_number, title) {
        $(".lot_link_wrapper[data-lot-number='" + lot_number + "']").prepend("<strong>" + title + "</strong><br />");
    }

    $(document).ready(function () {
        $('#lot_list').on('click', '.lot_link', function (e) {
            e.preventDefault();
            playVideo($(this).data('videoUrl'), $(this).data('videoType'), $(this).data('lotId'), $(this).data('imageUrl'));
            $('html, body').animate({scrollTop: $('#lot_video').offset().top}, 'ease');
            return false;
        });

        $('.lot_link[data-available=1]').first().trigger('click');

        /* Style additional pages buttons */

        var list_pages = $('.list-pages-shortcode.buttons');
        list_pages.find('a').addClass('button brown');
    });

    if (/loc$/.test(window.location.hostname)) {
        $('img').each(function () {
            if (/^\/|https:\/\/loosliredangus\.loc/.test(this.src)) {
                this.src = this.src.replace('.loc', '.com');
            }
        })
    }
})(jQuery);

var ytVideoPlaceholder = document.querySelector('#ytVideoPlayer');
var ytVideoData = window.ytVideoData || [];
var ytLotList = document.querySelector('#ytLotList');
var playlist = [];
if (ytVideoPlaceholder && ytVideoData) {
    // Load YT Player API
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('ytVideoPlayer', {
            height: '390',
            width: '100%',
            playerVars: {
                autoplay: 1,
                controls: 0,
                modestbranding: 1,
                mode: 'transparent',
                version: 3
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange
            }
        });
    }

    generateVideoList();
}

function onPlayerReady(event) {
    event.target.loadPlaylist(playlist);
    event.target.setLoop(true);
    event.target.playVideo();
}

var done = false;

function onPlayerStateChange(event) {
    console.log(event);
    if (event.data === YT.PlayerState.PLAYING) {
        console.log(event.target.getVideoData());
        setCurrentVideoID(event.target.getVideoData().video_id);
    }
}

function stopVideo() {
    player.stopVideo();
}

function setVideo(idx) {
    player.playVideoAt(idx);
}

function generateVideoList() {
    ytVideoData.sort(function (a, b) {
        return a.title.match(/\d+/)[0] - b.title.match(/\d+/)[0];
    });

    var video_index = 0;
    ytVideoData.forEach(function (vd) {
        var el = document.createElement('div');
        el.innerHTML = vd.title.match(/\d+/)[0];
        el.classList.add('lot_number');
        el.dataset.video_id = vd.id;
        el.dataset.idx = '' + video_index++;
        el.addEventListener('click', function () {
            setVideo(this.dataset.idx);
        });
        ytLotList.appendChild(el);
        playlist.push(vd.id);
    });

}

function setCurrentVideoID(id) {
    ytLotList.querySelectorAll('div').forEach(function (el) {
        if (el.dataset.video_id === id) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    })
}