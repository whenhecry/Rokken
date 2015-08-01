$(document).ready(function(){  // wait for document to be ready
    // prepare for sticking
    var floatingBar = '#monthBar1';  // id to be sticked and the content of which to be changed
    var barTopThreshold = $(floatingBar).offset().top;
    var barWidth = $(floatingBar)[0].getBoundingClientRect().width;
    console.log('floating bar width: %f', barWidth);  // value will be rounded without getBoundingClientRect()
    var barHeight = $(floatingBar).outerHeight();  // take height of monthBar itself into consideration

    // prepare for dynamical changing
    var monthBarElements = document.getElementsByClassName('monthBar');
    var monthBar = [];
    var monthBarContent = [];
    // store id/content of key elements into array
    for(var i = 0; i < monthBarElements.length; i++){
        monthBar.push($('#' + monthBarElements.item(i).id));
        monthBarContent.push($(monthBar[i]).html());
    }

    paintTag();

    // scroll event
    $(window).scroll(function(){
        stick(floatingBar, barTopThreshold, barWidth);
        dyChange(floatingBar, monthBar, monthBarContent, barHeight);
    });

    // if an article is clicked, toggle its status
    $('.index-container').click(function(){
        var allContent = '.index-content';
        var allSummary = '.index-summary';
        // get target id
        targetContent = '#' + $(this).find(allContent).attr('id');
        targetSummary = '#' + $(this).find(allSummary).attr('id');
        // hide all content/show all summary but remain target unchanged --> toggle target summary/content
        // toggle: hide <--> show
        $(allContent).not(targetContent).hide();
        $(allSummary).not(targetSummary).show();
        $(this).find(targetContent).toggle();
        $(this).find(targetSummary).toggle();
        // scroll to article top
        scrollToTop(this, barHeight);
    });

    // if part of progress bar is clicked, redirect to corresponding tag page
    $('.progress-bar').click(function(){
        reLink = $(this).children('a').attr('href');
        console.log('redirect to: %s', reLink);
        window.location.href = reLink;
    });

});

// to stick
function stick(target, threshold, width){
    var windowTop = $(window).scrollTop();
    if (windowTop > threshold){  // to compare with threshold
        $(target).css({'position': 'fixed', 'top': 0, 'width': width, 'z-index': 1});  // to maintain the initial and precise width
    }else{
        $(target).css('position', 'static');
    }
}

// to dynamically change content while scrolling
function dyChange(floatingBar, monthBar, monthBarContent, offset){
    // store top value of monthBars into array as top may change
    var topArray = [];
    for(var i = 0; i < monthBar.length; i++){
        topArray.push($(monthBar[i]).offset().top - offset);
    }
    console.log('monthBar top: [%s]', topArray.toString());

    var floatingBarTop = $(floatingBar).offset().top;  // top of the component whose content will be changed
    for(var i = topArray.length - 1; i >= 0; i--){  // to determine the range and change content
        if(floatingBarTop >= topArray[i]){
            console.log('pos: %f in [%f, %f]', floatingBarTop, topArray[i],  topArray[i + 1]);
            $(floatingBar).html(monthBarContent[i]);
            break;
        }
    }
    return;
}

// to scroll to top of given element minus offset
function scrollToTop(element, offset){
    var topOfElement = $(element).offset().top;
    $('html, body').animate({
        scrollTop: topOfElement - offset
        }, 'slow');
}

// to paint suitable color on tag-related stuff
function paintTag(){
    var colors = ['#33B5E5', '#99CC00', '#AA66CC', '#FF4444', '#FF8800'];
    var counter = [0, 0, 0, 0, 0];
    var tags = ['busi', 'tech', 'campus', 'film', 'novel'];
    var tagColor = '';
    // paint title bar
    $('.index-title').each(function(){
        var tag = this.className.split(' ')[1];
        switch(tag) {
            case tags[0]:
                tagColor = colors[0];
                counter[0]++;
                break;
            case tags[1]:
                tagColor = colors[1];  
                counter[1]++;
                break;
            case tags[2]:
                tagColor = colors[2];
                counter[2]++;
                break;
            case tags[3]:
                tagColor = colors[3];
                counter[3]++;
                break;
            case tags[4]:
                tagColor = colors[4];
                counter[4]++;
                break;
            default:
                throw 'unexpected tag';
        }
        $(this).css('border-left-color', tagColor);
    });
    // paint progress bar
    var articleSum = counter.reduce(function(total, num){return total+num}, 
                                                    0);
    console.log('sum of article on this page: %d', articleSum);
    $('.progress-bar').each(function(index){
        $(this).css({'width': counter[index]/articleSum*100+'%', 'background-color': colors[index]});
    });
}
