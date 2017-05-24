(function() {
  jQuery(document).ready(function($) {
      //import * as menuToggle from "lib/menuToggle";

      // via menuToggle.js
      defineMenuToggleHandler();

      const SPACE_ID = 'txtfnsik1nvr';
      const ACCESS_TOKEN = '2a0584e898fe126a69ff06d9611f12d62a00fc2a3f368c9ff2ff852465c46000';

      const client = contentful.createClient({
          space: SPACE_ID,
          accessToken: ACCESS_TOKEN
      });

      //let $availableEngines = $('<div class="available-engines"></div>');
      let $availableEngines = $('<section class="available-engines"></section>')

      client.getEntries()
          .then((response) => {
            let items = response.items;

            if( items.length > 0 ){  // -- has items
                $('.engines-unavailable').hide();

                $.each(items,function(i) {
                    const fields = this.fields;
                    let $engine = $('<div class="engine"></div>');

                    let $title = $('<h4></h4>').text(fields.title);
                    let $description = $('<p></p>').html( marked(fields.description) );
                    $engine.append($title);
                    $engine.append($description);

                    if( fields.photos.length > 0 ){
                        let $photos = $('<div class="photos"></div>');

                        $.each(fields.photos,function () {
                            const url = this.fields.file.url;
                            //const fields = this.fields;
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
                            /*
                            let $img = ;
                            $img.attr({
                                "alt": this.fields.title,
                                "src": url
                            });
                            */

                            $photos.append($wrapper);

                        });
                        $engine.append($photos);
                    }

                    $availableEngines.append($engine);

                });
                //console.log($availableEngines);
                $('.engines-page').append($availableEngines);


                fancybox();


            } // -- has items

          })
          .catch((error) => {
              console.log('error occured');
              console.log(error);
          });

/*
      const SPACE_ID = 'f46hoomog4ih'
      const ACCESS_TOKEN = '45839970353b21dcf858f422a0c4f514a03e0224f2bd712a7ed0bba5901a12c4'

      const client = contentful.createClient({
        space: SPACE_ID,
        accessToken: ACCESS_TOKEN
      })

      let $gallery = $('<div class="gallery"></div>');

      client.getEntries()
        .then((response) => {
          let items = response.items;
          $.each(items ,function(){
            console.dir(this);
            const fields = this.fields;
            let title = fields.title;
            let discription = fields.imageCaption;
            let url = fields.photo.fields.file.url;

            let $galleryItem = $('<div class="gallery-item"></div>');
            let $imgTag = $('<img src="'+url+'" alt="'+title+'" />');
            let $discription = $('<div></div').html( marked(discription) );

            $galleryItem
              .append($imgTag)
              .append($discription)
              .appendTo($gallery);
          });

        $('.gallery').append($gallery);

          // for ( let item in items) {
          //   console.log(item);
          // }

          //console.log('\n \x1b[32m Want to go further? Feel free to check out this guide: \x1b[34m\x1b[4mhttps://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/')
        })
        .catch((error) => {
          console.log('error occured');
          console.log(error);
        })


*/

  });
})();  