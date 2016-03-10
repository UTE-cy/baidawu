;(function($){
	var login = function(){
		var checkInput = function(){			
			var phone = $.trim($('#phone').val()),
				pwd = $.trim($('#password').val()),
				newphone = phone.replace(/\D/,''),
				loginBtn = $('#login');
			$('#phone').val(newphone);
			if($('#phone').val().length>0 && pwd.length>0){
				loginBtn.addClass('on');
			}else{
				loginBtn.removeClass('on');
			}
		},
		checkUser=function(data){
			if(data.code == '1'){
				location.href = 'register.html';
			}else if(data.code =='2'){
				common.warning('用户名或密码不正确！');
				return;
			}else if(data.code =='0'){
				var url = sessionStorage.getItem("url");
				location.href=url;
			}
		},
		checkLogin = function(){
			if($(this).hasClass('on')){							
				var phone = $.trim($('#phone').val()),
					pwd = $.trim($('#password').val());
				if(!common.checkPhone(phone)){
					common.warning('手机格式有误！');
					return;
				}
				if(!common.checkPwd(pwd)){
					common.warning('请输入6-12位字符！');
					return;
				}
				common.access_server('../server/checkuser.php',{'phone':phone,'pwd':pwd},checkUser);								
			}
		},
		findUser = function(){
			location.href = 'findUser.html';
		},
		bindEvent = function(){
			$('#phone').on('propertychange input',checkInput);
			$('#password').on('propertychange input',checkInput);
			$('#login').on('click',checkLogin);
			$('#forget').on('click',findUser);
		}
		return {
			userLogin:function(){
				bindEvent();
			}
		}
	}()
	window.login=login;
})(Zepto)