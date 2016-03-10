;(function($){
	var indent=function(){
		var renderDom=function(){
			var post_data=null,
				param=common.getParam(location.search),
				city_id=param.city_id,
				city_name=decodeURI(param.city_name),
				date_in=removeYear(param.date_in),
				date_out=removeYear(param.date_out),
				img=param.img_src,
				hotel_name=param.hotel_name,
				bed=param.bed,
				name=param.name,
				price=param.roomPrice,
				$dateIn=$('#date_in'),
			    $dateOut=$('#date_out');
			var html='';
				html='<div class="hotel_con">'
						+'<img src="'+img+'">'
							+'<div class="hotel_tit">'
								+'<h2>'+hotel_name+'</h2>'
								+'<h2>'+bed+'</h2>'
								+'<p><span>￥ '+price+'</span><i>担保</i></p>'
							+'</div>'
						+'</div>'
						+'<div class="date_inout">'
							+'<div class="date_in">'
								+'<label for="">入住</label>'
								+'<span>'+date_in+'</span>'
							+'</div>'	
							+'<div class="date_out">'
								+'<label for="">离店</label>'
								+'<span>'+date_out+'</span>'
							+'</div>'	
						'</div>';
			$(html).appendTo($('#hotel_name'));
			$('#total').text(price*1);
			$('#h_total').val(price);
			$('#user_form input[type=text]').on('propertychange input',showClose);
			$('#user_form span').on('click',emptyInput);
		},
		countTotal=function(){
			var num=$('#nums').val(),
				price=$('#h_total').val(),
				total=num*price;
			$('#total').text(total);
		},
		emptyInput=function(){
			$(this).prev().val('');
			$(this).css('display','none');
		},
		showClose=function(){
			var close=$(this).next();
			if(!$(this).val()==''){
				close.css('display','block');
			}else{
				close.css('display','none');
			}			
		},
		addDom=function(){
			var html='',i=$('#nums').val();
				html='<ul class="user_row">'
						+'<li><label for="">姓名'+i+'</label><input type="text" placeholder="每间只需填写一个姓名" id="u_name_'+i+'"><span></span></li>'
						+'<li><label for="">证件'+i+'</label><input type="text" placeholder="入住人身份证号/护照号" id="u_card_'+i+'"><span></span></li>'
					  +'</ul>';			
			$(html).appendTo($('#user_msg'));			
			$('#user_form input[type=text]').on('propertychange input',showClose);
			$('#user_form span').on('click',emptyInput);
		},
		removeDom=function(){
			$('#user_msg').children('ul.user_row').last().remove();
		},
		total=function(){
			var $sub=$('#sub'),
				$add=$('#add'),
				$nums=$('#nums'),
				$total=$('#total');
			$sub.on('tap click',function(){
				if($(this).hasClass('cur')){
					common.warning('不能取消订单');
					return;
				}else{
					$add.removeClass('cur');	
					var num=$nums.val()*1-1;
					if(num<=1){
						$(this).addClass('cur');
					}
					$nums.val(num);
					countTotal();
					removeDom();
				}
			})
			$add.on('tap click',function(){
				if($(this).hasClass('cur')){
					common.warning('房间数量不能超过5间');
					return;
				}else{	
					$sub.removeClass('cur');				
					var num=($nums.val())*1+1;
					if(num>=5){
						$(this).addClass('cur');
					}
					$nums.val(num);
					countTotal();
					addDom();
				}
			})
		},
		verify=function(){
			$('#user_form input[type=text]').each(function(i,dom){
				var con=$(dom).val();
				if(con==''){
					common.warning('请完善个人信息！');
					return;
				}
				if(!$('#u_name_'+(i+1)).val()) return;
				var name=$('#u_name_'+(i+1)).val();
				if(!common.checkName(name)){
					common.warning('姓名为2~7个中文或3~10个英文',function(){
						$('#u_name_'+(i+1)).val('');
						$('#u_name_'+(i+1)).focus();
					});
					return;
				}
				if(!$('#u_card_'+(i+1)).val()) return;				
				var card=$('#u_card_'+(i+1)).val();
				if(!common.checkCard(card)){
					common.warning('请输入正确的证件号码！',function(){
						$('#u_card_'+(i+1)).val('');
						$('#u_card_'+(i+1)).focus();
					});
					return;
				}
				var lname=$('#l_name').val();
				if(!common.checkName(lname)){
					common.warning('联系人请填写真实姓名！',function(){
						$('#l_name').val('');
						$('#l_name').focus();
					});
					return;
				}
				var phone=$('#l_phone').val();
				if(!common.checkPhone(phone)){
					common.warning('请输入正确的手机号码！',function(){
						$('#l_phone').val('');
						$('#l_phone').focus();
					});
					return;
				}
			})
		},
		bindEvent=function(){
			$('#reserve_btn').on('tap click',verify);
			renderDom();
			total();
		}
		return {			
			Dom:function(){
				bindEvent();
			}
		}
	}()
	window.indent=indent;
})(Zepto)



// ;(function($){
// 	$.extend($.fn,{
// 		showClose:function(){
// 			var closeBtn=$(this).next(),
// 				_this=$(this);
// 				$(this).on('propertychange input',function(){
// 					if(_this.val()==''){
// 						closeBtn.hide();
// 					}else{
// 						closeBtn.show();
// 					}
// 				})
// 		},
// 		clearInputy:function(){
// 				$(this).on('tap',function(){
// 					$(this).prev().val('');
// 					$(this).hide();	
// 				})
// 		}
// 	})
// })(Zepto)
// $('#cantantInfo input[type=text]').each(function(){
// 	$(this).showClose();
// })
// $('#cantantInfo span.clear_input').each(function(){
// 	$(this).clearInputy();
// })

