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
        for (i = lot_numbers.length; i >= 0; i--)
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
            return false;
        });

        $('.lot_link[data-available=1]').first().trigger('click');

        /* Style additional pages buttons */

        var list_pages = $('.list-pages-shortcode.buttons');
        list_pages.find('a').addClass('button brown');
    })
})(jQuery);