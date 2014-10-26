(function($) {

	$('#shoutbox-form').on('submit', function(e) {

    var buttonText;

    e.preventDefault();

    if ( $('#shoutbox-form textarea').val() ) {

      $.ajax({
        type: 'POST',
        dataType: 'json',
        url: shoutboxObject.ajaxUrl,
        data: { 
          'action': 'ajax-shoutbox-create-post',
          'message': $('#shoutbox-form textarea').val(),
          'security': $('#shoutbox-form #security').val()
        },
        beforeSend: function(data) {

          buttonText = $('#shoutbox-form .btn').text();

          $('#shoutbox-form .btn').attr('disabled', 'disabled')
                                  .text(shoutboxObject.loadingMessage);
        },
        complete: function(data) {

          $.ajax({
            type: 'POST',
            dataType: 'html',
            url: shoutboxObject.ajaxUrl,
            data: { 
              'action': 'ajax-shoutbox-get-new-post'
            },
            success: function(content) {

              $('#shoutbox .wrapper').html(content);
              
              $('#shoutbox-form').hide()
                                 .slideDown(200);

              $('#shoutbox-form .btn').removeAttr('disabled')
                                  .text(buttonText);

              $('#shoutbox-form textarea').val('');

            }
          });
        }
      });
    } else {
      
    }
  });
})(jQuery);