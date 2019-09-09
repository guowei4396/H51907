function subst(obj1, obj2) {
    for (var key in obj1) {
        obj2[key] = obj1[key];
    }
    return obj2;
}

function belarge(obj) {
    var defaultobj = {
        scale: 2,
        speed: 1
    }
    subst(obj, defaultobj);

    var gleft = document.getElementById(defaultobj.ele);
    var smallPic = gleft.getElementsByClassName('smallPic')[0];//渲染小图
    var picArr = defaultobj.imgsrc;
    smallPic.innerHTML = picArr.map(function (item) {
        return `<li>
                <img src="${item}" alt="">
                </li>`;
    }).join('');

    //渲染完后再找节点
    var bigger = gleft.getElementsByClassName('bigger')[0];
    var norPic = gleft.getElementsByClassName('img')[0];
    var bigPic = document.querySelector('.bigger img');
    var showPic = document.querySelector('.img img');
    var shade = gleft.getElementsByClassName('shade')[0];
    var img = gleft.getElementsByClassName('img')[0];
    var leftbot = gleft.getElementsByClassName('leftbot')[0];
    var prev = gleft.getElementsByClassName('prev')[0];
    var next = gleft.getElementsByClassName('next')[0];

    //放大倍数
    bigPic.style.width = showPic.offsetWidth * defaultobj.scale + 'px';
    bigPic.style.height = showPic.offsetHeight * defaultobj.scale + 'px';

    //小图换大图(用事件委托)
    smallPic.onmouseover = function (ev) {
        if (ev.target.tagName.toLowerCase() == 'img') {
            var src = ev.target.src;
            // console.log(src);
            bigPic.src = showPic.src = src;
        }
    }

    if (smallPic.children.length <= 5) {
        prev.style.backgroundColor = '#ccc';
        next.style.backgroundColor = '#ccc';
    }

    //进入img就出现遮罩和大图
    img.onmouseover = function () {
        shade.style.display = 'block';
        bigger.style.display = 'block';
    }

    //鼠标抚摸事件
    img.onmousemove = function (ev) {
        var x = ev.clientX;
        var y = ev.clientY;
        var sTop = y - img.offsetTop - (shade.offsetHeight / 2);
        var sLeft = x - img.offsetLeft - (shade.offsetWidth / 2);
        if (sTop <= 0) {
            sTop = 0;
        } else if (sTop >= img.offsetHeight - shade.offsetHeight) {
            sTop = img.offsetHeight - shade.offsetHeight;
        }
        if (sLeft <= 0) {
            sLeft = 0;
        } else if (sLeft >= img.offsetWidth - shade.offsetWidth) {
            sLeft = img.offsetWidth - shade.offsetWidth;
        }
        shade.style.top = sTop + 'px';
        shade.style.left = sLeft + 'px';
        var scaleY = sTop / (img.offsetHeight - shade.offsetHeight);
        var scaleX = sLeft / (img.offsetWidth - shade.offsetWidth);
        bigPic.style.top = '-' + scaleY * (bigPic.offsetHeight - bigger.offsetHeight) + 'px';
        bigPic.style.left = '-' + scaleX * (bigPic.offsetWidth - bigger.offsetWidth) + 'px';
        // bigPic.style.top = '-' + sTop * 2 + 'px';
        // bigPic.style.left = '-' + sLeft * 2 + 'px';
    }

    //鼠标离开就又隐藏
    img.onmouseout = function () {
        shade.style.display = 'none';
        bigger.style.display = 'none';
    }

    //上一张、下一张
    var spee = (smallPic.children[0].offsetWidth + 10) * defaultobj.speed;
    prev.onclick = function () {
        move(spee);
        if (smallPic.children.length >= 7) {
            next.style.backgroundColor = '#666';
        }
    }

    next.onclick = function () {
        move(-spee);
        if (smallPic.children.length >= 7) {
            prev.style.backgroundColor = '#666';
        }
    }

    function move(speed) {
        if (smallPic.children.length >= 7) {
            var left = smallPic.offsetLeft + speed;
            if (left <= leftbot.offsetWidth - smallPic.offsetWidth) {
                left = leftbot.offsetWidth - smallPic.offsetWidth;
                next.style.backgroundColor = '#ccc';
                // prev.style.backgroundColor = '#666';
            } else if (left >= 0) {
                left = 0;
                prev.style.backgroundColor = '#ccc';
                // next.style.backgroundColor = '#666';
            }
            smallPic.style.left = left + 'px';
        }
    }
}