window.onload=initial;

//初始化函数
function initial(){
    setStep();
    displayPapers();
}

/*BEGIN 注册步骤控制*/
//设置注册步骤
function setStep(){
    // var step1Btn=document.getElementById('step1');
    /**
     * 1、获取可能会操作到的数据（次数>=2）；
     * 2、判断url属于那个step？
     * 3、修改每个表单的display属性
     * 4、修改step样式
     */
    var url = window.location.href;
    var steps = [
        /.*#!step1$|.*\.html$/,
        /.*#!step2$/,
        /.*#!step3$/,
        /.*#!step4$/,
    ];
    var stepIndex = 1;

    if(steps[0].test(url)) {//检测第一步的url
        stepIndex = 1;
    } else if(steps[1].test(url)) {//检测第二步的url
        stepIndex = 2;
    } else if(steps[2].test(url)) {//检测第三步的url
        stepIndex = 3;
    } else if(steps[3].test(url)) {//检测第四步的url
        stepIndex = 4;
    } else {
        // alert(url);/*无操作：或者可以返回登录界面 */
    }
    displayStep(stepIndex);
}
/**随着步骤改变样式的函数 */
function displayStep(num) {
    //获取四个表单数组
    var stepForms=document.getElementsByClassName('register-form');
    //获取进度条
    var personProgress=document.getElementById('person-progress');
    var organizationProgress=document.getElementById('organization-progress');
    //获取步骤序号
    var stepOrders=document.getElementsByClassName('order');
    //获取步骤序号父节点div数组
    var orderParents = document.getElementsByClassName('order-parent')[0].childNodes;
    //创建字体图标新节点
    var newNode = document.createElement('i');
    newNode.setAttribute('class','fa fa-check');

    //设置步骤隐藏和显示
    stepForms[0].style.display = num == 1 ? 'block' : 'none';
    stepForms[1].style.display = num == 2 ? 'block' : 'none';
    stepForms[2].style.display = num == 3 ? 'block' : 'none';
    stepForms[3].style.display = num == 4 ? 'block' : 'none';

    //控制进度条的长度
    personProgress.style.width = num * 33.3 +'%';
    organizationProgress.style.width = num * 25 +'%';

    //控制步骤序号的背景色，同时设置字体图标
    for(var i=0; i<num-1; i++) {
        stepOrders[i].style.background = '#FF6161';
        stepOrders[i].style.borderColor = '#FF6161';
        orderParents[i].insertBefore(newNode.cloneNode(true), orderParents[i].childNodes[1]);
    }
}
/*END 注册步骤控制*/

/*BEGIN 证件上传*/
function displayPapers(){
    //获取两个单选按钮
    var notThreeInOne = document.getElementById('notThreeInOne');
    var threeInOne = document.getElementById('threeInOne');
    //获取两个显示div
    var notThreeInOneDiv = document.getElementById('notThreeInOneDiv');
    var threeInOneDiv = document.getElementById('threeInOneDiv');
    //判断按钮是否被选中，若选中则依次选择显示的证件照片
    if(threeInOne.checked){
        console.log(notThreeInOne.value);
        alert(notThreeInOne.value);
        // threeInOneDiv.style.display = 'block';
        // notThreeInOneDiv.style.display = 'none';
    }else{
        console.log(notThreeInOne.value);
        // notThreeInOneDiv.style.display = 'block';
        // threeInOneDiv.style.display = 'none';
    }
}
/*END 证件上传*/

/*图片上传预览    IE是用了滤镜。*/
function previewImage(file,previewID)
{
    var MAXWIDTH  = 353; 
    var MAXHEIGHT = 200;
    var div = document.getElementById(previewID);
    if (file.files && file.files[0])
    {
        div.innerHTML ='<img id=imghead'+ previewID + '>';
        var img = document.getElementById('imghead' + previewID);
        img.onload = function(){
        // var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        // img.width  =  rect.width;
        // img.height =  rect.height;
        // img.style.marginTop = rect.top+'px';
        img.setAttribute('width','100%');
        img.setAttribute('height','auto');

        }
        var reader = new FileReader();
        reader.onload = function(evt){img.src = evt.target.result;}
        reader.readAsDataURL(file.files[0]);
    }
    else //兼容IE
    {
    var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
    file.select();
    var src = document.selection.createRange().text;
    div.innerHTML = '<img id=imghead'+ previewID + '>';
    var img = document.getElementById('imghead' + previewID);
    img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
    var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
    status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
    div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
    }
}
function clacImgZoomParam( maxWidth, maxHeight, width, height ){
    var param = {top:0, left:0, width:width, height:height};
    if( width>maxWidth || height>maxHeight )
    {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;
            
        if( rateWidth > rateHeight )
        {
            param.width =  maxWidth;
            param.height = Math.round(height / rateWidth);
        }else
        {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }
    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}
/*END PREVIEW*/
