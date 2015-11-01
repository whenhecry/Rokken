// jQuery Method is with $()
$(document).ready(function(){  // wait for document to be ready
    //~ // resize imgs
    //~ resizeImg();

    // initialize a floatingbar
    var monthBar1 = document.getElementById('monthBar1');
    var monthBarWidth = monthBar1.getBoundingClientRect().width;  // value will be rounded without getBoundingClientRect()
    var floatingBar = monthBar1.cloneNode(true);  // clone from monthbar
    floatingBar.id = 'floatingBar';  // set new id
    $(floatingBar).removeClass('staticMonthBar');  // remove the class to avoid conflict during update
    document.getElementById('banner').appendChild(floatingBar);  // append it somewhere
    $(floatingBar).css({'position': 'fixed', 'top': 0, 'width': monthBarWidth, 'z-index': -1});  // reset its position to the top and hide it behind
    // the first update is necessary
    updateFloatingBar(floatingBar);

    // paint color tags
    paintTag();

    // scroll event
    $(window).scroll(function(){
        updateFloatingBar(floatingBar);
    });

    // click event
    // if an article is clicked, toggle its status
    $('.index-container').click(function(){
        updateFloatingBar(floatingBar);
        var floatingBarHeight = $(floatingBar).outerHeight();
        var contentClass = 'index-content';
        var summaryClass = 'index-summary';
        var allContent = document.getElementsByClassName(contentClass);
        var allSummary = document.getElementsByClassName(summaryClass);

        // get target
        var targetContent = this.getElementsByClassName(contentClass)[0];
        var targetSummary = this.getElementsByClassName(summaryClass)[0];
        // hide all content/show all summary but remain target unchanged --> toggle target summary/content
        // toggle: hide <--> show
        $(allContent).not(targetContent).hide();
        $(allSummary).not(targetSummary).show();
        $(targetContent).toggle();
        $(targetSummary).toggle();
        // resize img size of article
        resizeImg(targetContent);
        // scroll to article top
        scrollToTop(this, floatingBarHeight);
    });

    // click event
    // if part of progress bar is clicked, redirect to corresponding tag page
    $('.progress-bar').click(function(){
        reLink = $(this).children('a').attr('href');
        console.log('redirect to: %s', reLink);
        window.location.href = reLink;
    });

});

// to update top value/content of  staticMonthBars
function updateMonthBarsStat(){
    var monthBars = document.getElementsByClassName('staticMonthBar');
    var monthBarsTop = [];
    var monthBarsContent = [];
    for(var i = 0; i < monthBars.length; i++){
        monthBarsTop.push($(monthBars[i]).offset().top);
        monthBarsContent.push($(monthBars[i]).html());
    }
    return [monthBarsTop, monthBarsContent]
}

// to update the floatingBar
function updateFloatingBar(floatingBar){
    var floatingBarTop = $(floatingBar).offset().top;
    var floatingBarHeight = $(floatingBar).outerHeight();
    monthBarsStat = updateMonthBarsStat();
    monthBarsTop = monthBarsStat[0];
    monthBarsContent = monthBarsStat[1];

    // show floatingbar when it is below monthbar1
    if (floatingBarTop >= monthBarsTop[0]){
        $(floatingBar).css({'z-index': 1});
    }else{
        $(floatingBar).css({'z-index': -1});
    }

    // change floatingbar content accordingly
    console.log('floatingBarTop: %f, monthBarstop: [%s]', floatingBarTop, monthBarsTop.toString());
    for(var i = monthBarsTop.length - 1; i >= 0; i--){
        if(floatingBarTop >= monthBarsTop[i] - floatingBarHeight){
            console.log('%f in [%f, %f]', floatingBarTop, monthBarsTop[i],  monthBarsTop[i + 1]);
            $(floatingBar).html(monthBarsContent[i]);
            break;
        }
    }
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
    var colors = ['#33B5E5', '#FF8800', '#99CC00', '#AA66CC', '#FF4444'];
    var counter = [0, 0, 0, 0, 0];
    var tags = ['busi', 'novel', 'tech', 'campus', 'film'];
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

// to resize width of img of given article element
function resizeImg(articleContent){
    // get column width of content
    colWidth = articleContent.getBoundingClientRect().width;
    // set img width the same as column if former is larger than latter
    imgs = $(articleContent).find('img');
    for(var i = 0; i < imgs.length; i++){
        img = imgs[i];
        imgWidth = imgs[i].getBoundingClientRect().width;
        if (imgWidth > colWidth){
            $(img).css('width', colWidth);
        }
    }
}
