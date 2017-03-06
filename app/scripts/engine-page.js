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




  }); 
})();  