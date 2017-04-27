/**
 * Created by Arezo on 3/8/2017.
 */
var clicked = 'false';
var JavadCategorySelectorClickedItem;
var javadCategorySelectorString = "javadCategory-";
var JavadCategorySelectorForResize;
var javadCategoryInnerContainerSelectorString = "javadCategoryInnerContainer";
var list = [];
var subList = [];
var javadCategoryCatSelector;
var normalMarginLeft = 0;
var internalRowsNum = 0;
var firstCatWidthMargin = 0;
var clickedBackgroundImage = "";
$(document).ready(function () {

    // alert(javadCategoryCatSelector[1].className.substr(javadCategoryCatSelector[1].className.indexOf("javadCategoryPics") + 17));

    javadCategoryCatSelector = $(".javadCategoryOuterContainer [class*='javadCategory-']");
    function setAndShowPics() {
        for (var i = 0; i < javadCategoryCatSelector.length; i++) {
            if (javadCategoryCatSelector[i].className.indexOf("javadCategoryPics") != -1) {
                var javadCategoryClassSubName = javadCategoryCatSelector[i].className.substr(javadCategoryCatSelector[i].className.indexOf("javadCategoryPics") + 17);
                javadCategoryCatSelector.eq(i).css({
                    "background-image": "url('pics/Articles/" + javadCategoryClassSubName + ".png')"
                });
            }
            subList[i] = [];
            for (var j = 0; j < javadCategoryCatSelector.eq(i).children().length; j++){
                // alert("Parent: " + javadCategoryCatSelector[i].className + "\nChild:" + javadCategoryCatSelector.eq(i).children()[j].className);
                subList[i][j] = "مقاله " + (j + 1);
            }
        }
        // alert(subList.length);
    }

    setAndShowPics();
    function clickAnimation(_this, removeSelector, clickedLevel) {
        if (_this.className.indexOf(clickedLevel) == '-1') {
            $(_this).siblings().addClass("javadCategoryRemoveTransition");
            $(_this).addClass("javadCategoryTransitionOn");
            var categoryOuterContainerSelector = $(".javadCategoryOuterContainer").parent();
            var containerWidth = categoryOuterContainerSelector.width();
            var containerHeight = categoryOuterContainerSelector.height();
            if ($(_this).css('background-image') != 'none') {
                $(_this).siblings().css({
                    'width': '0',
                    'height': '0',
                    'padding': '0 0 0 0',
                    'background-color': 'rgba(12, 50, 130, 0)',
                    'margin': '0'
                });

                $(_this).css({
                    'width': containerWidth + "px",
                    'height': containerHeight + "px",
                    'background-color': 'rgba(12, 50, 130, 0)',
                    'filter': 'blur(10px) opacity(20%)'
                });
                // alert($(_this).css("width"));
            } else {
                $(_this).siblings().css({
                    'padding': '0 0 0 0',
                    'background-color': 'rgba(12, 50, 130, 0)',
                    'margin': '0'
                });
                $(_this).css({
                    'background-color': 'rgba(12, 50, 130, 0)',
                    'padding': containerHeight + "px " + containerWidth + "px 0 0"
                });
            }

            //for not showing hand icon after click
            $(_this).css({
                'cursor': 'auto',
                '-webkit-touch-callout': 'none', /* iOS Safari */
                '-webkit-user-select': 'none', /* Chrome/Safari/Opera */
                '-khtml-user-select': 'none', /* Konqueror */
                '-moz-user-select': 'none', /* Firefox */
                '-ms-user-select': 'none', /* Internet Explorer/Edge */
                'user-select': 'none' /* Non-prefixed version, currently*/
            });

            $(_this).addClass(clickedLevel);
            JavadCategorySelectorClickedItem = $(".javadCategoryOuterContainer .javadCategoryTransitionOn");
            // setTimeout(javadCategoryDeleteCatEnd, 500);
            // var javadCategoryClassNameClicked = _this.className;
            $(".javadCategoryTitleOnHover").replaceWith("");
            setTimeout(function () {
                javadCategoryDetailsCat(removeSelector, clickedLevel);
            }, 600);
            clicked = 'true';
        }
    }

    function javadCategoryDetailsCat(removeExtraCategorySelector, clickedLevel, finalLevel) {
        // debugger;
        removeExtraCategorySelector.remove();
        var javadCategoryCatSelector = $(".javadCategoryOuterContainer ." + clickedLevel + " [class*='javadCategoryDetails']");
        javadCategoryCatSelector.css({
            'display': 'block'

        });
        javadCategoryCatSelector.addClass("javadCategoryDetailsOn");
        javadCategorySelectorString = "javadCategoryDetailsOn";
        javadCategoryInnerContainerSelectorString = clickedLevel;
        clicked = 'false';
        JavadCategorySelectorForResize = $("." + javadCategorySelectorString + "End");
        javadCategoryController(internalRowsNum, list, finalLevel);
        $(".javadCategoryTitleOnHover").replaceWith("");
    }

    $(".javadCategoryOuterContainer").on("click", ".javadCategoryDetailsOn",function () {
        var removeSelector = $(".javadCategoryDetailsOnEnd");
        var clickedLevel = "javadCategoryDetailsClicked";
        clickAnimation(this, removeSelector, clickedLevel);
        $(this).children().css({
            'display': 'block'
        });
        // alert();
    });
    javadCategoryCatSelector.click(function () {
        var removeSelector = $(".javadCategory-End");
        var clickedLevel = "javadCategoryClicked";
        clickAnimation(this, removeSelector, clickedLevel);
    });


    var ReturnClicked = false;
    javadCategoryCatSelector.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
        // alert(this.className.indexOf("javadCategoryTransitionOn"));
        if(JavadCategorySelectorClickedItem.length == 1 && this.className.indexOf("javadCategoryTransitionOn") != -1){
            // alert("s");
            $(".javadCategoryNavButtonContainer").css({
                "display": 'block'
            });
            JavadCategorySelectorClickedItem.removeClass("javadCategoryTransitionOn");
            $(".javadCategoryRemoveTransition").css("display", "none");
            var $javadCategoryClicked = $(".javadCategoryClicked");
            clickedBackgroundImage = $javadCategoryClicked.css("background-image");
            $javadCategoryClicked.css({
                "display": 'block' ,
                "background-image": "",
                'filter': 'blur(0px) opacity(100%)',
                "padding": '0',
                "width": 'inherit',
                "height": 'inherit',
                'margin': '0'
            });
        }
        if(ReturnClicked && this.className.indexOf("javadCategoryClicked") != -1) {
            ReturnClicked = false;
            javadCategoryOnResize();
            $(this).removeClass("javadCategoryClicked");
        }
    });


    $(".javadCategoryNavigationHome").click(function () {

        ReturnClicked = true;
        javadCategoryInnerContainerSelectorString = "javadCategoryInnerContainer";
        javadCategorySelectorString = "javadCategory-";
        $(".javadCategoryOuterContainer .javadCategoryClicked [class*='javadCategoryDetails']").css({
            "display": 'none',
            "margin-left": ''
        }).removeClass("javadCategoryDetailsOn");
        $(".javadCategoryOuterContainer .javadCategoryClicked [class*='javadCategoryDetailsOnEnd']").remove();
        $(".javadCategoryClicked").css({
            "background-image": clickedBackgroundImage
        });
        $(".javadCategoryRemoveTransition, .javadCategoryClicked").css({
            "display": 'block',
            "margin": '',
            "width": '',
            "height": '',
            "padding": '',
            "background-color": '',
            "filter": '',
            "cursor": '',
            "-moz-user-select":''
        }).removeClass("javadCategoryRemoveTransition");
        $(this).parent().css({
            "display": 'none'
        });
    });
    var javadCategoryTitleMouseEnter = "false";
    var jvadCategoryTitleMouseleave = "true";
    var javadcategoryPicsMouseEnter = "false";

    var $javadCategoryInnerContainer = $(".javadCategoryInnerContainer");
    $javadCategoryInnerContainer.on("click", ".javadCategoryTitleOnHover", function(){
        $(this).next().click();
    });
    $javadCategoryInnerContainer.on("mouseenter", ".javadCategoryTitleOnHover", function(){
        // alert("s");
        javadCategoryTitleMouseEnter = "true";
        jvadCategoryTitleMouseleave = "false";
    }).on("mouseleave", ".javadCategoryTitleOnHover", function(){
        // alert("ss");
        jvadCategoryTitleMouseleave = "true";
        javadcategoryPicsMouseEnter = "false";
        // alert(javadcategoryPicsMouseEnter);
        setTimeout(function() {
            // alert(javadcategoryPicsMouseEnter);
            if(javadcategoryPicsMouseEnter == "false"){
                $(".javadCategoryTitleOnHover").replaceWith("");
                $("[class*='javadCategory']").removeClass("javadCategoryPicsOnJqueryHover");
                javadCategoryTitleMouseEnter = "false";
                jvadCategoryTitleMouseleave = "true";
                javadcategoryPicsMouseEnter = "false";
            }
        }, 5);

    });
    function hoverShowTitle(_this, list_subList){
        if(!ReturnClicked) {
            javadcategoryPicsMouseEnter = "true";
            // if($(".javadCategoryTitleOnHover").length > 0){
            $(".javadCategoryTitleOnHover").replaceWith("");
            $("[class*='javadCategory']").removeClass("javadCategoryPicsOnJqueryHover");
            javadCategoryTitleMouseEnter = "false";
            jvadCategoryTitleMouseleave = "true";
            // }
            // alert(javadCategoryTitleMouseEnter);
            if (javadCategoryTitleMouseEnter == "false") {
                var list_subListName;
                if (list_subList == "list") {
                    list_subListName = (list[$(_this).index()] == undefined) ? "خالی" : list[$(_this).index()];
                } else if (list_subList == "subList") {
                    list_subListName = (subList[$(_this).parent().index()][$(_this).index()] == undefined) ? "خالی" : subList[$(_this).parent().index()][$(_this).index()];
                }
                // $(_this).wrap("<span class='javadCategoryWrapperOnHover'></span>");
                $(_this).before("<span class='javadCategoryTitleOnHover'>" + list_subListName + "</span>");
                // debugger;
                var _thisPosition = $(_this).position();
                var _thisHeight = ($(_this).innerHeight() / 2);
                // alert($(_this).innerHeight());
                var _thisHeightOffset = ($(_this).outerHeight(true) - $(_this).innerHeight()) / 2;
                var titleHeight = $(_this).prev().outerHeight(true) / 2;
                var _thisWidth = ($(_this).innerWidth() / 2);
                var _thisWidthOffset = ($(_this).outerWidth(true) - $(_this).innerWidth());
                var titleWidth = $(_this).prev().outerWidth(true) / 2;
                var scrollLeftPos = $(".javadCategoryOuterContainer").scrollLeft();
                var titleTopPos = _thisPosition.top + _thisHeight + _thisHeightOffset - titleHeight;
                var titleLeftPos = _thisPosition.left + _thisWidth + _thisWidthOffset - titleWidth + scrollLeftPos;
                // alert($(".javadCategoryOuterContainer").scrollLeft());
                $(_this).prev().css({
                    'top': titleTopPos + 'px',
                    'left': titleLeftPos + 'px'
                });
                $(_this).addClass("javadCategoryPicsOnJqueryHover");
            }
        }
    }
    function hoverOutRemoveTitle(_this) {
        if(!ReturnClicked) {
            javadcategoryPicsMouseEnter = "false";
            // alert(" ");
            setTimeout(function () {
                if (jvadCategoryTitleMouseleave == "true") {
                    // alert("s");
                    javadCategoryTitleMouseEnter = "false";
                }
                if (javadCategoryTitleMouseEnter == "false") {
                    // alert("w");
                    javadcategoryPicsMouseEnter = "false";
                    jvadCategoryTitleMouseleave = "false";
                    // alert(_this.className + " ||| " + javadCategoryTitleMouseEnter);
                    $(_this).removeClass("javadCategoryPicsOnJqueryHover");
                    $(_this).prev(".javadCategoryTitleOnHover").replaceWith("");
                }
            }, 5);
        }
    }
    $javadCategoryInnerContainer.on("mouseenter", "[class*='javadCategory-']:not(.javadCategoryClicked)", function(){
        hoverShowTitle(this, "list");
    }).on("mouseleave", "[class*='javadCategory-']", function(){
        hoverOutRemoveTitle(this);
    });
    $javadCategoryInnerContainer.on("mouseenter", "[class*='javadCategoryDetails']", function(){
        hoverShowTitle(this, "subList");
    }).on("mouseleave", "[class*='javadCategoryDetails']", function(){
        hoverOutRemoveTitle(this);
    });

});
function javadCategoryOnResize() {
    JavadCategorySelectorForResize.remove();
    javadCategoryController(internalRowsNum, list);
}
$(window).resize(function () {
    // alert(javadCategorySelectorString);
    javadCategoryOnResize();
});
function javadCategoryController(rowsNum, javadCategoryList) {

    if(javadCategoryList != null){
        for(var i = 0 ; i < javadCategoryList.length; i++){
            list[i] = javadCategoryList[i];
        }
    }
    if(clicked == 'true'){
        return;
    }
    internalRowsNum = rowsNum;
    var categoryOuterContainerSelector = $(".javadCategoryOuterContainer");
    var categoryInnerContainerSelector = $("." + javadCategoryInnerContainerSelectorString + "");

    var categorySelector = $(".javadCategoryOuterContainer [class*='" + javadCategorySelectorString + "']");
    normalMarginLeft = (normalMarginLeft == 0) ? parseInt(categorySelector.css('margin-left')) : normalMarginLeft;
    categorySelector.css('margin-left', normalMarginLeft);
    var catWidthMargin = (firstCatWidthMargin == 0) ?(categorySelector.outerWidth(true)) : firstCatWidthMargin; // take width + margin
    firstCatWidthMargin = catWidthMargin;
    var catCount = categorySelector.length; // how many category element i Have
    var containerWidth = categoryOuterContainerSelector.width();
    var numOfElemsInContainer = parseInt((containerWidth + normalMarginLeft) / catWidthMargin); // how many category element my Container can contain
    var catSelectorExceptLastInContainer = $(".javadCategoryOuterContainer [class*='" + javadCategorySelectorString + "']:not(:nth-child(" + (numOfElemsInContainer) + "))");
    var excessiveMargin = (containerWidth - (numOfElemsInContainer * catWidthMargin) + normalMarginLeft) / (numOfElemsInContainer - 1);
    //if catCount < numOfElemsInContainer add extra element to the end of container
    categoryOuterContainerSelector.removeClass("javadCategoryScroll");
    if (catCount < numOfElemsInContainer && rowsNum == 1) {
        for (i = catCount; i < numOfElemsInContainer; i++) {
            categoryInnerContainerSelector.append("<span class=\"" + javadCategorySelectorString + "End\"></span>");
        }
        catSelectorExceptLastInContainer.css('margin-left', normalMarginLeft + excessiveMargin + 'px');

    } else {
        var javadCategoryInnerContainerWidth;
        if (rowsNum == 1) {
            javadCategoryInnerContainerWidth = (catCount * catWidthMargin) - normalMarginLeft;
            categoryOuterContainerSelector.addClass("javadCategoryScroll");
            categoryInnerContainerSelector.css('width', javadCategoryInnerContainerWidth);
        } else if (rowsNum > 1) {
            var numOfCatItemsInRow = 0;
            var remainsCatItems = catCount;
            var javadCategoryNthChild;
            var catSelectorExceptLastItemIndexCalculated;

            if (catCount > (numOfElemsInContainer * rowsNum)) {
                // alert("WWWWW");
                categoryOuterContainerSelector.addClass("javadCategoryScroll");
                var maxOfnumOfCatItemsInRow = 0;
                for (i = 0; i < rowsNum; i++) {
                    remainsCatItems = remainsCatItems - numOfCatItemsInRow;
                    numOfCatItemsInRow = Math.ceil(remainsCatItems / (rowsNum - i));
                    if(numOfCatItemsInRow > maxOfnumOfCatItemsInRow){
                        maxOfnumOfCatItemsInRow = numOfCatItemsInRow;
                    }
                    javadCategoryNthChild = ((catCount - remainsCatItems) + numOfCatItemsInRow);
                    // catSelectorExceptLastItemIndexCalculated = categorySelector.slice((catCount - remainsCatItems), javadCategoryNthChild - 1);
                    // catSelectorExceptLastItemIndexCalculated.css('margin-left', parseInt(catSelectorExceptLastItemIndexCalculated.css('margin-left')) + excessiveMargin + 'px');

                    if(numOfCatItemsInRow == maxOfnumOfCatItemsInRow){
                        var javadCategoryNthChildSelector = $(".javadCategoryOuterContainer [class*='" + javadCategorySelectorString + "']:nth-child(" + (javadCategoryNthChild) + ")");
                        javadCategoryNthChildSelector.css('margin-left', "0");
                    }

                    if(i == 0){
                        // catWidthMargin = categorySelector.outerWidth(true);
                        javadCategoryInnerContainerWidth = (numOfCatItemsInRow * catWidthMargin) - normalMarginLeft;
                        categoryInnerContainerSelector.css('width', javadCategoryInnerContainerWidth);
                    }
                }
            }else{
                for (i = catCount; i < (numOfElemsInContainer * rowsNum); i++) {
                    categoryInnerContainerSelector.append("<span class=\"" + javadCategorySelectorString + "End\"></span>");
                }
                catCount = numOfElemsInContainer * rowsNum;
                remainsCatItems = catCount;
                categorySelector = $(".javadCategoryOuterContainer [class*='" + javadCategorySelectorString + "']");
                for (i = 0; i < rowsNum; i++) {
                    remainsCatItems = remainsCatItems - numOfCatItemsInRow;
                    numOfCatItemsInRow = numOfElemsInContainer;
                    if(remainsCatItems <= numOfElemsInContainer){
                        javadCategoryNthChild = catCount;
                    }else{
                        javadCategoryNthChild = ((catCount - remainsCatItems) + numOfCatItemsInRow);
                    }
                    catSelectorExceptLastItemIndexCalculated = categorySelector.slice((catCount - remainsCatItems), javadCategoryNthChild - 1);
                    catSelectorExceptLastItemIndexCalculated.css('margin-left', normalMarginLeft + excessiveMargin + 'px');
                    $(".javadCategoryOuterContainer [class*='" + javadCategorySelectorString + "']:nth-child(" + (javadCategoryNthChild) + ")").css('margin-left', "0");
                    if(i == 0){
                        catWidthMargin = categorySelector.eq(0).outerWidth(true);
                        javadCategoryInnerContainerWidth = (numOfCatItemsInRow * catWidthMargin) - (normalMarginLeft + excessiveMargin);
                        categoryInnerContainerSelector.css('width', javadCategoryInnerContainerWidth);
                    }
                }
            }
        }
    }

    JavadCategorySelectorForResize = $("." + javadCategorySelectorString + "End");

}

function showPosition(position) {
    $.ajax({
        url: "DBModify.php",
        type: "get",
        data: { longitude: position.coords.longitude, latitude: position.coords.latitude } ,
        success: function (response) {
            // you will get response from your php page (what you echo or print)
            alert(response);

        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(textStatus + " :::: " + errorThrown);
        }


    });
}
// Take input value of how many rows you want
// Standard box size 150px * 150px
// Standard box margin 0 0 0 25px
// Take input value of how many items you want FROM <span class="javadCategory-......>
// Get the parent(container) Width / (150 + 25) = result(integer value)
// Based on "result" measure new left-margin for box except last one
// If the items number is more than the items container capacity and rows capacity create horizontal scrollbars
// On resize if the above problem happens do so

