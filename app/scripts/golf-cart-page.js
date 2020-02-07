import menuToggleInit from "./lib/menuToggleModule";
import fancyboxInit from "./lib/fancybox";

jQuery(document).ready(function($) {
    menuToggleInit();
    
    const SPACE_ID = 'oo4yz13ylbb3';
    const ACCESS_TOKEN = 'f9e0e09a35ebd58e104234e7b9c1460462edc4ec1ef036237b9f72b31f7f39ac';

    const client = contentful.createClient({
        space: SPACE_ID,
        accessToken: ACCESS_TOKEN
    });

    




    const $activeImage = $('.golf-carts-photos .active');

    const availableCarts = $('<div>');
    
    client.getEntries()
        .then((response) => {
            let items = response.items;
            debugger;
            if( items.length > 0 ){  // - has items
                $('.no-carts').hide();

                $.each(items,function(i) {  // -- for each item
                    const fields = this.fields;
                    let $cart = $('<div class="cart"></div>');
                    let $title = $('<h4></h4>').text(fields.title);
                    let $description = $('<div class="description"></div>').html( marked(fields.description) );

                    $cart.append($title);
                    $cart.append($description);

                    if( fields.photos && fields.photos.length > 0 ){ // --- has photos
                        let $photos = $('<div class="photos"></div>');

                        $.each(fields.photos,function () { // ---- each photo
                            const url = this.fields.file.url;
                            let $wrapper = $('<a></a>');

                            $wrapper
                                .attr({
                                    "href": url,
                                    "data-fancybox": "group"+i
                                })
                                .append(
                                    $('<img/>').attr({
                                        "alt": this.fields.title,
                                        "src": url
                                    })
                                );

                            $photos.append($wrapper);
                        }); // ---- end each photo

                        $cart.append($photos);
                    } // --- end has photos

                    $availableCarts.append($cart);
                }); // -- end each item

                $('.golf-carts-page').append($availableCarts);

                const $info = $(
                    '<div class="info"><h3>Available Carts</h3><p>All carts are freshly serviced and ready to hit the course! Looking for a recreational ride? We can outfit any of these carts with flip-back seats, lights, lift-kits and more!</p></div>'
                );

                $availableCarts.prepend($info);
                fancyboxInit();
            // -- has items
            } else {
                cycleImage();
                setInterval(function(){
                    cycleImage()
                }, 3500);
            
            }

        })
        .catch((error) => {
            console.log('error occured');
            console.log(error);
        })




    function cycleImage() {
        $('.golf-carts-photos img').removeClass('active');
        var $nextImage = $activeImage.next().length > 0 ? $activeImage.next() : $('.golf-carts-photos img:first');
        $activeImage.addClass('active');
        $activeImage.removeClass('next');
        $activeImage.removeClass('uninvolved');

        $nextImage.addClass('next');
        $nextImage.removeClass('uninvolved');

        $activeImage = $nextImage;
    }
            

});
