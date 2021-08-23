window.addEventListener('load', function () {
    //获取元素
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    //鼠标经过 显示左右隐藏按钮
    focus.addEventListener('mouseenter', function () {
        prev.style.display = 'block';
        next.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function () {
        prev.style.display = 'none';
        next.style.display = 'none';
        timer = setInterval(function () {
            //手动调用点击事件
            next.click();
        }, 2000);
    })
    //动态生成小圆圈 有几张图片就有几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.promo-nav');
    for (var i = 0; i < ul.children.length; i++) {
        //创建li
        var li = document.createElement('li');
        //记录当前小圆圈的索引号 通过自定义属性来实现
        li.setAttribute('index', i);
        //把li插入到ol中
        ol.appendChild(li);
        //小圆圈到排他思想 在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            //清除所有的li的selected类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //将当前的li设置selected类名
            this.className = 'selected';
            //点击小圆圈 移动图片 注意移动的是ul
            //ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
            //当我们点击了某个li 就获取当前li的索引号
            var index = this.getAttribute('index');
            //当我们点击了某个li 就要把这个 li 的索引号给 num
            num = index;
            //当我们点击了某个li 就要把这个 li 的索引号给 circle
            circle = index;
            //num = circle = index;
            animate(ul, -index * focusWidth)
        })
    }
    //把ol中第一个li设置类名为 selected
    ol.children[0].className = 'selected';
    //克隆第一张图片 放置ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    var num = 0;
    //circle控制小圆圈的播放
    var circle = 0;
    //flag 节流阀
    var flag = true;
    //点击右侧按钮 图片向后滚动一张
    next.addEventListener('click', function () {
        if (flag) {
            flag = false; //关闭节流阀
            //如果走到了最后复制的一张图片 此时ul要快速复原 left改为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true; //打开节流阀
            })
            //点击右侧按钮 小圆圈跟随一起变化
            circle++;
            //circle == 4 意味着图片走到了克隆的那一张 我们需要复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleSelected();
        }
    })
    //点击左侧按钮 图片向前滚动一张
    prev.addEventListener('click', function () {
        if (flag) {
            flag = false; //关闭节流阀
            //如果走到了最前面的一张图片 此时ul要快速复原 left改为 -focusWidth * num + 'px' 记得单位
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -focusWidth * num + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true; //打开节流阀
            })
            //点击左侧按钮 小圆圈跟随一起变化
            circle--;
            //circle == 0 意味着图片走到了第一张 我们需要复原
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleSelected();
        }
    })
    function circleSelected() {
        //清除其余小圆圈的selected类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //记录当下小圆圈的selected类名
        ol.children[circle].className = 'selected';
    }
    var timer = setInterval(function () {
        //手动调用点击事件
        next.click();
    }, 2000);

    var slider_bar = document.querySelector('.slider_bar');
    var recom = document.querySelector('.recom');
    var recomTop = recom.offsetTop;
    var userLike = document.querySelector('.userLike');
    var goBack = document.querySelector('.goBack');
    var userLikeTop = userLike.offsetTop;

    document.addEventListener('scroll', function () {
        if (window.pageYOffset >= recomTop) {
            slider_bar.style.position = 'fixed';
            slider_bar.style.top = '0px';
        } else {
            slider_bar.style.position = 'absolute';
            slider_bar.style.top = '660px';
        }
        if (window.pageYOffset >= userLikeTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    })

})