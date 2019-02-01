/*
 *
 * jQuery PassRoids - Password strength meter and match verifier
 * http://www.thecreativeoutfit.com
 *
 *
 */

jQuery.fn.passroids = function(o) {

  // Defaults ######################################################################
  var o = jQuery.extend( {
    main: '#password',
    verify: null,
    button: null,
    minimum: 1
  },o);

  // Create containers #############################################################
  // Restrict max length to input form.

  jQuery(":reset").click(function(event) {
    if (jQuery(event.target).parents('form').get(0) == jQuery("#psr_back").parents('form').get(0)) {
      jQuery("#psr_back").html('&nbsp;');
      jQuery(".password_level").html('&nbsp;');
    }
  });
  function create_frame(){
    jQuery(o.main).after('<br /><div id="psr_score"></div>');
    jQuery('#psr_score').html('<div id="psr_back">' + "&nbsp;" + '</div><span class="password_level">' + "&nbsp;" + '</span>');
    psr_score_design(o.main);
    psr_back_design(o.main);
  }

  function psr_score_design(obj){
    jQuery('#psr_score').css({
      "display": 'inline-block',
       "margin-top": '3px'
    });
  }
  function psr_back_design(obj){
    jQuery('#psr_back').css({
      "display": 'inline-block',
      "backgroundColor": '#ecebeb',
      "width": +jQuery(obj).outerWidth() + 'px'
    });
  }

  create_frame();

//  if (o.verify!=null){ jQuery(o.verify).after('<div id="psr_verify"></div>'); }
//  if (o.button!=null){ jQuery(o.button).after('<div id="psr_strength_notice"></div>'); }

  // Check to disable button initially #############################################
  if(o.button!=null){
    jQuery(o.button).prop('disabled', true);
  }

  // Check Function ################################################################
  function testPass(v){
      var s = 0
    // PASSWORD LENGTH ~~~~~~~~~~~~~~~~~~~~~~~~~~~
      // Length of 3 or less
    if (v.length<4){ return s; }
      // Length of 4 or less
    else if (v.length<5){ s = (s+3);  }
      // Length between 5 and 7
    else if (v.length>4 && v.length<8){ s = (s+6); }
      // Length between 8 and 15
    else if (v.length>7 && v.length<16){ s = (s+12); }
      // Length of 16 or more
    else if (v.length>15){ s = (s+18); }
    // LETTERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      // At least one lower case letter
    if (v.match(/[a-z]/)){ s = (s+1); }
    // At least one upper case letter
    if (v.match(/[A-Z]/)){ s = (s+5); }
    // NUMBERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // At least one number
    if (v.match(/\d+/)){ s = (s+5); }
    // At least three numbers
    if (v.match(/(.*[0-9].*[0-9].*[0-9])/)){ s = (s+5);  }
    // SPECIAL CHARACTERS ~~~~~~~~~~~~~~~~~~~~~~~~
    // At least one special character
    if (v.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)){ s = (s+5); }
    // At least two special characters
    if (v.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)){ s = (s+5); }
    // COMBOS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Both upper and lower case
    if (v.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){ s = (s+4); }
    // Both letters and numbers
    if (v.match(/([a-zA-Z])/) && v.match(/([0-9])/)){ s = (s+4); }
    // Letters, numbers, and special characters
    if (v.match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/)){ s = (s+7); }
    // Return the score ~~~~~~~~~~~~~~~~~~~~~~~~~~
    return s;
  }

  // Evaluate score ################################################################
  function evalScore(s){
  var strength = 0;
  switch(true){
  case s<=13:
    strength = 0;
    break;
  case s>=14 && s<=27:
    strength = 1;
    break;
  case s>=28 && s<=40:
    strength = 2;
    break;
  case s>=41:
    strength = 3;
    break;
  }
  return strength;
  }

  // Change button state ###########################################################
  function changeButtonState(v){
    var val = jQuery(o.main).val();
    var s = testPass(val);
    var strength = evalScore(s);
    if (val.length>20) { strength = 4; }
    if ((val.match(/.[^a-zA-Z0-9!@#$%^&*?_~]/))) { strength = 5; }

    if (o.button!=null){
        if(v==1 && strength>=o.minimum && strength<4){
          jQuery(o.button).prop('disabled', false);
        }
        else{
          jQuery(o.button).prop('disabled', true);
        }
    }
  }

    function clearScoreBar() {
      jQuery('#psr_back').html("&nbsp;");
      jQuery('.password_level').html("&nbsp;");
      if(jQuery('#psr_score').length != 0) changeButtonState(0);
    }

    // Main functionality ############################################################
    return this.each(function(index, elem) {
      if(jQuery(o.main, this).size() == 0) return true;

      // Clear score bar when form reseted. ~~~~~~~~~~~~~~~~~~~~~
      jQuery(this.reset(), this).click(function(){ clearScoreBar(); });

      jQuery(this).submit(function() {
        jQuery(this).data("submited", true);
      });

        // Check password strength ~~~~~~~~~~~~~~~~~~~~~
      jQuery(o.main).bind("textchange", function(e) {
        if(jQuery(this.form).data("submited") === true || e.keyCode == 13){
          return false;
        }

        // Get field value
        var val = jQuery(o.main).val();
        // Get score
        var s = 0;
        if (val == '') {
          clearScoreBar();

        } else {
          var s = testPass(val);

          // Evaluate
          var levels = new Array();
          levels[0]="Bad";
          levels[1]="Good";
          levels[2]="Excellent";
          levels[3]="Fantastic";
          levels[4]="TooLong";
          levels[5]="InvalidCharacter";
          var strength = evalScore(s);

          var width = (jQuery(this).outerWidth()/levels.length)*(strength+1);

          if (val.length>20) { strength = 4; }
          if ((val.match(/[^a-zA-Z0-9!@#$%^&*?_~]/))) { strength = 5; }

          var colors = ["#ff0000", "#7cfc00", "#00ff00", "#32cd32", "#ff0000", "#ff0000"];

          jQuery('#psr_score')
            .html('<div id="psr_back"><div id=psr_'+levels[strength]+'>'+"&nbsp;"+'</div></div><span class="password_level">' + levels[strength] + "</span>");

          psr_back_design(this);

          jQuery('#psr_'+levels[strength])
            .css({
              backgroundColor: colors[strength],
              width: width+'px'
            });
        }

      changeButtonState(1);

      });

  });
};
