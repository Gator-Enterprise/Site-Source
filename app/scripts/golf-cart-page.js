(function() {
    jQuery(document).ready(function($) {
        $('#menu-toggle').click(function(){
            $(this).toggleClass('is-active');
            if( $(this).hasClass('is-active') ){
                $('.mobile-menu-items').addClass('show');
            } else {
                $('.mobile-menu-items').removeClass('show');
            }
        });

        const SPACE_ID = 'oo4yz13ylbb3'
        const ACCESS_TOKEN = 'f9e0e09a35ebd58e104234e7b9c1460462edc4ec1ef036237b9f72b31f7f39ac'

        const client = contentful.createClient({
            space: SPACE_ID,
            accessToken: ACCESS_TOKEN
        })

        let $currentlyAvailable = $('<div class="currently-available"></div>');

        client.getEntries()
            .then((response) => {
                let items = response.items;
                console.log('items lenght = '+ items.length);
                $.each(items ,function(){
                    console.dir(this);
                    /*
                    const fields = this.fields;
                    let title = fields.title;
                    let discription = fields.imageCaption;
                    let url = fields.photo.fields.file.url;

                    let $cartForSale = $('<div class="cart-for-sale"></div>');
                    let $imgTag = $('<img src="'+url+'" alt="'+title+'" />');
                    let $discription = $('<div></div').html( marked(discription) );

                    $cartForSale
                        .append($imgTag)
                        .append($discription)
                        .appendTo($gallery);
                    */
                });

                //$('.gallery').append($currentlyAvailable);

                // for ( let item in items) {
                //   console.log(item);
                // }

                //console.log('\n \x1b[32m Want to go further? Feel free to check out this guide: \x1b[34m\x1b[4mhttps://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/')
            })
            .catch((error) => {
                console.log('error occured');
                console.log(error);
            })




    });
})();