$(document).ready(function(){  // wait for document to be ready
    // prepare for sticking
    var stickyClass = 'sticky';  // class to be sticked
    var stickyThresholdTop = $('.' + stickyClass).offset().top;
    var stickyStaticWidth = $('.' + stickyClass)[0].getBoundingClientRect().width;
    console.log(stickyStaticWidth);  // value will be rounded without getBoundingClientRect()

    // prepare for dynamical changing
    var dyReferClass = 'uniqueDays';
    var uniqueDays = document.getElementsByClassName(dyReferClass);
    var idArray = [];
    var contentArray = [];
    // store id/content of key elements into array
    for(var i = 0; i < uniqueDays.length; i++){
        idArray.push($('#' + uniqueDays.item(i).id));
        contentArray.push($(idArray[i]).html());
    }
    var dyClass = 'uniqueDay1'  // class to be changed
    var offset = $('#' + dyClass).height();  // to modify the position where change happens

    // scroll event
    $(window).scroll(function(){
        stickIt(stickyClass, stickyThresholdTop, stickyStaticWidth);
        dyChange(dyClass, idArray, contentArray, offset);
    });

    // if article is clicked
    $('article').click(function(){
        // get target id
        targetContentId = $(this).find('.index-content').attr('id')
        targetSummaryId = $(this).find('.index-summary').attr('id')
        // hide all content/show all summary but remain target unchanged --> toggle target summary/content
        // toggle: hide <--> show
        $('.index-content').not('#' + targetContentId).hide();
        $('.index-summary').not('#' + targetSummaryId).show();
        $(this).children('.index-summary').toggle();
        $(this).children('.index-content').toggle();
        // scroll to article top
        scrollToTop(this, 'sticky');
    });

});

// to stick
function stickIt(className, thresholdTop, staticWidth){
    var windowTop = $(window).scrollTop();
    if (windowTop > thresholdTop){  // to compare with threshold
        $('.' + className).css({'position': 'fixed', 'top': 0, 'width': staticWidth, 'z-index': 1});  // to maintain the initial and precise width
    }else{
        $('.' + className).css('position', 'static');
    }
}

// to dynamically change content while scrolling
function dyChange(className, idArray, contentArray, offset){
    var dyReferClass = document.getElementsByClassName('uniqueDays');
    // store top value of key elements into array because top may change
    var topArray = [];
    for(var i = 0; i < idArray.length; i++){
        topArray.push($(idArray[i]).offset().top - offset);
    }
    console.log(topArray);
    var pos = $('#' + className).offset();  // position of the component whose content will be changed
    for(var i = topArray.length - 1; i >= 0; i--){  // to determine the range and change content
        if(pos.top >= topArray[i]){
            console.log('pos: %f in [%f, %f]', pos.top, topArray[i],  topArray[i + 1]);
            $('#' + className).html(contentArray[i]);
            break;
        }
    }
    return;
}

// to scroll to top of given element minus offset
function scrollToTop(element, offsetClass){
    var topOfElement = $(element).parent().parent().offset().top;
    var offset = $('.' + offsetClass).height();
    $('html, body').animate({
        scrollTop: topOfElement - offset  // take height of floating date bar into consideration
        }, 'slow');
}
