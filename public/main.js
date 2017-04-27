$().ready(function(){
  // on click on #notif selector

  $('#otherDateButton').on('click',function(){
    $('#otherdate').stop(true,true).fadeIn("fast");
    $('#otherdate').css('display', 'flex');
  });
  // $('#signInButton').on('click',function(){
  //   $('#signin').stop(true, true).fadeIn("fast");
  // });
  $('.modalHeaderClose').on('click',function(){
    $('#myreserv').stop(true,true).fadeOut("fast");
    $('#account').stop(true,true).fadeOut("fast");
    $('#signin').stop(true,true).fadeOut("fast");
    $('#delete').stop(true, true).fadeOut("fast");
  });
  $('#datePicker1').on('click',function(){
    $('#otherdate').stop(true,true).fadeOut("fast");
  });
  $('#signInButton').on('click',function(){
    $('#signin').stop(true, true).fadeIn("fast");
    $('#signin').css('display', 'flex');
    $('#email-input').focus();
  });
  $('#deleteButton').on('click', function(){
    $('#delete').stop(true, true).fadeIn("fast");
    $('#delete').css('display', 'flex');

  })
  $('#getLinkButton').on('click', function(){
    $('#tabTrigger').click();
    $('#signin').stop(true, true).fadeOut("fast");
    $('#myReservButton').on('click',function(){
      $('#myreserv').stop(true,true).fadeIn("fast");
      $('#myreserv').css('display', 'flex');
    });
    $('#accountButton').on('click',function(){
      $('#account').stop(true,true).fadeIn("fast");
      $('#account').css('display', 'flex');
    });
  });

  $('.tabBox').on('click',function(){
    $('#gridTrigger').click();
  });

})
