import menuToggleInit from "./lib/menuToggleModule";
import fancyboxInit from "./lib/fancybox";


jQuery(document).ready(function($) {
    menuToggleInit();

    const SPACE_ID = 'txtfnsik1nvr';
    const ACCESS_TOKEN = '2a0584e898fe126a69ff06d9611f12d62a00fc2a3f368c9ff2ff852465c46000';

    const client = contentful.createClient({
        space: SPACE_ID,
        accessToken: ACCESS_TOKEN
    });

    let $availableEngines = $('<section class="available-engines"></section>');

    client.getEntries()
        .then((response) => {
            let items = response.items;

            if( items.length > 0 ){  // - has items
                $('.engines-unavailable').hide();

                $.each(items,function(i) { // -- for each item
                    const fields = this.fields;
                    let $engine = $('<div class="engine"></div>');
                    let $title = $('<h4></h4>').text(fields.title);
                    let $description = $('<div class="description"></div>').html( marked(fields.description) );

                    $engine.append($title);
                    $engine.append($description);

                    if( fields.photos.length > 0 ){ // --- has photos
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

                        $engine.append($photos);
                    } // --- end has photos

                    $availableEngines.append($engine);
                }); // -- end each item

                $('.engines-page').append($availableEngines);

                const $info = $(
                    '<div class="info"><p>Below are some of the engines that are currently available. Interested in our prices for a custom build? <a href="/engine-quote-tool">Click here</a> to check out our engine quote tool.</p></div>'
                );

                $availableEngines.prepend($info);
                fancyboxInit();
            } // - end has items

        })
        .catch((error) => {
            console.log('error occured');
            console.log(error);
        });


});
