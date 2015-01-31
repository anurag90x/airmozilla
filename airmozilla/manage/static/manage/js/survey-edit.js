$(function() {
    'use strict';
    // all the things we're going to do select2 on,
    // explicitely make sure they're 100%
    $('#id_events').css('width', '100%');

    $('#id_events').select2();


    var disableTopAndBottomOrderButton = function() {
        var orderings = $('.ordering form');
        orderings.each(function(i) {
            if (i === 0) {
                // disable the Up button
                $('.ordering-up', this).prop('disabled', true);
            } else {
                $('.ordering-up', this).removeProp('disabled');
            }
            if (i + 1 === orderings.length) {
                // disable the down button
                $('.ordering-down', this).prop('disabled', true);
            } else {
                $('.ordering-down', this).removeProp('disabled');
            }

        });
    };
    disableTopAndBottomOrderButton();


    // hijack the ability to save/edit
    $('form.edit').submit(function() {
        var form = $(this);
        $(form.children('button')).text('Saving..');
        var tr = form.closest('tr');
        var textarea = $('textarea', tr);
        $(textarea).attr('readonly','readonly');
        var data = {
            csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val()
        };
        data[textarea.attr('name')] = textarea.val();
        $.post(form.attr('action'), data)
        .then(function(response) {

            $(textarea).removeAttr('readonly');
            if (response.error) {
                alert('Unable to save. Error: ' + response.error);
            } else {
                textarea.val(response.question);
                $(form.children('button')).text('Saved');
            }
            setTimeout(function()
            {
                $(form.children('button')).text('Save');
            }, 2*1000);
        }).fail(function() {
            console.warn(arguments);
            alert('Unable to complete the save right now.');
        });

        return false;
    });

});
