/*
* 我的自定义JS
* @Author: iceStone
* @Date: 	2017-12-05 14:06:55
* @Last Modified by: 	iceStone
* @Last Modified time: 2017-12-05 14:06:55
*/

$(function () {
	function resize() {
		// 获取屏幕宽度
		var windowWidth = $(window).width();
		// 判断屏幕是否小于768;
		var isSmallScreen = windowWidth < 768;
		// 根据大小为界面上的轮播图设置背景图片
		// $("#main_ad > .carousel > .item") 获取到的是一个DOM数组
		$("#main_ad > .carousel-inner > .item").each(function (i,item) {
			// 因为拿到的是DOM对象,需要转换为jQuery对象才能操作
			var $item = $(item);
			// 如果屏幕宽度(windowWidth)大于768就取lg的值,否则就取xs的值
			// $element.data() 是一个函数,专门用于取元素上的自定义属性(data-xxx)或者(data-xxx-yyy)
			// 函数的参数是我们要取的属性名称(xxx)或者(xxx-yyy)
			// var imgSrc = isSmallScreen ? $item.data("image-xs"): $item.data("image-lg"); 等同于以下
			var imgSrc = $item.data(isSmallScreen ? "image-xs": "image-lg");
			// 设置背景图片
			$item.css("backgroundImage", "url('" + imgSrc + "')");
			// 因为切换为小图时需要跟随网页尺寸等比例变化,所以小图时使用img方式
			if (isSmallScreen) {
				$item.html('<img src="' + imgSrc + '" alt="" />');
			} else {
				$item.empty();
			}
		});
		// 控制标签页的标签容器宽度
		var $ulContainer = $(".nav-tabs");
		// 获取所有子元素的宽度之和
		var width = 30; // 因为原本ul上有padding-left,所以加上30
		$ulContainer.children().each(function (index, element) {
			//console.log(element.clientWidth);
			//console.log($(element).width());
			width += element.clientWidth;
		});
		// 判断当前ul的宽度是否超出屏幕,如果超出就显示横向滚动条
		if (width > $(window).width()) {
			$ulContainer.css("width", width).parent().css("overflow-x", "scroll");
		} else {
			$ulContainer.css("width", "100%").parent().css("overflow-x", "auto");
		}
	}
	// trigger 让window对象立即触发一次resize函数
	$(window).on("resize", resize).trigger("resize");
	// 初始化tooltips插件
	$('[data-toggle="tooltip"]').tooltip();
	// 给新闻区域a注册点击事件
	var $newsTitle = $(".news-title");
	$("#news .nav-pills a").on("click", function () {
		// 获取当前点击元素
		var $this = $(this);
		// 获取对应的title值
		var title = $this.data("title");
		// 将title值设置到相应的位置
		$newsTitle.text(title);
	});


	// 1.获取手指在轮播图上的滑动方向(左右)
	// 触摸开始时记录手指所在X坐标
	// 触摸结束时记录手指所在X坐标
	// 比较大小
	// 获取轮播图容器
	var $carousels = $(".carousel");
	var startX,endX;
	var offset = 50;
	// 注册滑动事件
	// 触摸开始
	$carousels.on("touchstart", function (e) {
		startX = e.originalEvent.touches[0].clientX;
		//console.log(startX);
	});
	// 触摸结束时无法获取坐标,所以会报错
	/*$carousels.on("touchend", function (e) {
	 console.log(e.originalEvent.touches[0].clientX)
	 });*/
	// 滑动过程事件中记录手指坐标
	$carousels.on("touchmove", function (e) {
		// 滑动过程中变量重复赋值
		endX = e.originalEvent.touches[0].clientX;
	});
	// 触摸结束获取endX变量最后的值
	$carousels.on("touchend", function (e) {
		//console.log(endX);
		// 控制精度: 获取每次运动事件的距离,当距离大于一定的值时才认定有方向变化
		var distance = Math.abs(startX - endX);
		if (distance > offset) {
			//console.log(startX > endX ? "左": "右");
			// 2.根据获得到的方向选择上一张或者下一张
			// 用原生的carousel方法实现选择上一张或者下一张 http://v3.bootcss.com/javascript/#carousel-methods
			$(this).carousel(startX > endX ? "next": "prev");
		}
	});
});