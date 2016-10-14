var time = $(".time");
function writeTime() {
    var date = new Date;
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    m = (m < 10) ? ("0" + m) : m;
    s = (s < 10) ? ("0" + s) : s;
    time.text(h + ":" + m + ":" + s);
}
writeTime();
var t = setInterval(writeTime, 500);
var tudos = [];
var content = $('.content');
var input = $('#input');
var all = $('.all');
if (localStorage.datetudos) {
    tudos = JSON.parse(localStorage.datetudos);
    render();
} else {
    localStorage.datetudos = JSON.stringify(tudos);
}
function render() {
    content.empty();
    localStorage.datetudos = JSON.stringify(tudos);
    $.each(tudos, function (i, v) {
        $('<li><span class=" finished icon-font icon-wancheng"></span> <input type="text" class="desearch" value="'+v.title+'"/><span class="delete icon-font icon-lajixiang"></span></li>').addClass(function () {
            if (v.state) {
                return "done";
            }
        }).appendTo('.content');
        $('#input').val("");
    })
}
//    分类选项卡
all.addClass('active');
all.on('click', function () {
    $('.link li').removeClass('active');
    $(this).addClass('active');
    $('.content li').css({display: "block"});
    $('.num').text(0);
    numb();
});
$('.end').on('click', function () {
    $('.link li').removeClass('active');
    $(this).addClass('active');
    $('.content li').css({display: "none"})
    $('.content .done').css({display: "block"});
    numb();
});
$('.wei').on('click', function () {
    $('.link li').removeClass('active');
    $(this).addClass('active');
    $('.content li').css({display: "block"});
    $('.done').css({display: "none"});
    numb();
});
$('.clear').on('click', function () {
    $(this).addClass('active');
    // $(tudos).each(function (i, v) {
    //     console.log(v);
    //     if (v.state) {
    //         tudos.splice(i, 1);
    //     }
    // });
    for(var i=$(tudos).length-1;i>=0;i--){
        if($(tudos)[i].state){
            tudos.splice(i, 1);
        }
    }
    render();
    numb();
});
$(".add").on("click", function () {
    tudos.push({
        title:'请输入新任务',
        state:0,
        isDel:0
    })
    localStorage.datetudos = JSON.stringify(tudos);
    render();
})
// content.on("click", 'li p', function () {
//     var text = $(this).text();
//     $(this).text("");
//     $("<input>").appendTo($(this).parent()).val(text).focus();
// })
// content.on("blur", 'li input', function () {
//     var val = $(this).val();
//     $(this).closest($("p")).text(val);
// })
content.on('click', 'li .finished', function () {
    var li = $(this).closest('li');
    var i = li.index();
    li.toggleClass('done');
    tudos[i].state = 1;
    localStorage.datetudos = JSON.stringify(tudos);
    numb()
});
content.on('click', 'li .delete', function () {
    $(this).closest('li').addClass('feichu').queue(function () {
        $(this).delay(800).dequeue();
    });
    var i = $(this).closest('li').index();
    tudos.splice(i, 1);
    localStorage.datetudos = JSON.stringify(tudos);
    render();
    numb();

});
$(".content").on('blur', 'li input', function () {
    var val=$(this).val();
    var index=$(this).closest("li").index();
    tudos[index].title=val;
    render();
    localStorage.datetudos=JSON.stringify(tudos);
});
input.focus();

//滑动事件
var left = null;
content.on('touchstart', 'li', function (e) {
    left = e.originalEvent.changedTouches[0].pageX;
});

content.on('touchmove', 'li', function (e) {
    n = e.originalEvent.changedTouches[0].pageX;
    if (n - left > 40) {
        $(this).addClass('done');
        tudos[$(this).index()].state = 1;
        // .closest('li').css("transform","translate3d(0.4rem,0,0)")
    }
    if (n - left < -30) {
        $(this).removeClass('done');
        // .closest('li').css("transform","translate3d(0,0,0)")
        tudos[$(this).index()].state = 0;
        // render();
    }
    localStorage.datetudos = JSON.stringify(tudos);
});
content.on('touchend', 'li', function (e) {
    n = e.originalEvent.changedTouches[0].pageX;
    if (n - left > 40) {
        // $(this).css("transform","translate3d(0.3rem,0,0)")
    }
});


//空格键
function numb() {
    var reg = /active/g;
    var l = $('.done').length
    if (reg.test($('.all').attr('class'))) {
        $('.num').text($('.content li').length);
    }
    if (reg.test($('.end').attr('class'))) {
        $('.num').text(l);
    }
    if (reg.test($('.wei').attr('class'))) {
        $('.num').text($('.content li').length - l);
    }
}
numb();
$(document).on('keyup', function (e) {
    var text = $('#input').val();
    if (text.length == 0) {
        return;
    }
    if (e.keyCode == 13) {
        tudos.push({title: text, state: 0, isDel: 0});
        render();
        numb();
    }
});

var arr=[];
var desearch=$(".desearch");
for(var i=0;i<desearch.length;i++){
    arr.push(desearch.eq(i).val())
}
var bb="任务2";
var reg=new RegExp(bb);
for(var i=0;i<arr.length;i++){
    console.log(reg.test(arr[i]));
}
