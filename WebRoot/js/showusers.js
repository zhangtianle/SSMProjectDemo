		//定义文件菜单
        var menu1 = { width: 120, items:
            [
            {
                text: '文件', children:
                [
                    { text: 'Excel', click: itemclick },
                    { text: 'Word', click: itemclick },
                    { text: 'PDF', click: itemclick }
                ]
            },
            ]
        };
        
        //临时用来测试的函数
        function itemclick(item)
        {
            alert(item.text);
        }
         
        //声明grid的值
        var g;
        
        //初始化函数
        $(function ()
        {
        	//定义菜单条
            $("#topmenu").ligerMenuBar({ items: [
                { text: '导出', menu: menu1 }
            ]
            });
            
        	//初始化grid表格
            g = $("#maingrid").ligerGrid({
                height: '100%',
                columns: [
				{ display: '用户ID',name: 'userid',hide:true},
                { display: '姓名', name: 'username',  width: 100 },
                { display: '性别', name: 'usersex', Width: 100 },
                { display: '年龄', name: 'userage', Width: 140 },
                { display: '出生日期', name: 'userbirthdy'}                
                ],checkbox: true,isScroll:true,
                url:'User/getUserData.do', //向后台加载数据
                dataAction : 'local',
                pageSize: 20,
                usePager :true,
                rownumbers: true
            });
        	
 
          //加载工具条
          $("#toptoolbar").ligerToolBar({ items: [
              {
                text: '增加', click:addUser, icon:'add'},
              { line:true },
              { text: '修改', click: modifyUser,icon:'modify' },
              { line:true },
              { text: '删除', click: deleteUser,icon:'delete' },
              { line:true },
              { text: '查询', click: filter, icon: 'search'}
          ]
          });
          
          function filter()
          {
              //g.options.data = $.extend(true,{}, );
              //g.showFilter();
        	  //var filter = $("#filter").ligerFilter({ fields: fields });
          }
          
                    
            //增加用户
            function addUser(item){
            	 $.ligerDialog.open({
                     height:400,
                     width: 500,
                     title : "增加用户", 
                     target:$("#addUser"),
                     showMax: false,
                     showToggle: true,
                     showMin: false,
                     isResize: true,
                     slide: false
                 });
            }
            
            //修改用户
            function modifyUser(user){
            	var userids = g.getSelecteds();
            	if(userids.length == 0){ //没有选择用户
            		$.ligerDialog.warn('请选择要修改的用户');
            	}else if(userids.length > 1){//选择了多个用户
            		$.ligerDialog.warn('请选择要修改的用户只能是一个');
            	}else{
            		var id = {
            				"id" : userids[0].userid
            		}; 
            		//先查询出数据
            		$.ajax({
                  	  url: "User/getUserByID.do",
                  	  type: "POST",
                  	  cache: false,
                  	  dataType: "json",
                  	  async : false,
                  	  contentType:"application/json", //这个属性必须加上去，否则后台无法接受数据
                  	  data : JSON.stringify(id),
                  	  success: function(json){                  		  
                  		  var data = json["result"].data;    
                  		  if(json["result"].state == 1){
                  			  $("#tid").val(data["userid"]); //需要先把id设置到一个隐藏的input中，方便在后面向数据库提交数据的时候把id提交过去
                  			  $("#userName").val(data["username"]);
                  			  $("#userSex").val(data["usersex"]);
                  			  $("#userAge").val(data["userage"]);
                  			  $("#userBirthdy").val(data["userbirthdy"]);
                  			  $.ligerDialog.open({
                                height:400,
                                width: 500,
                                title : "修改用户", 
                                target:$("#modifyUser"),
                                showMax: false,
                                showToggle: true,
                                showMin: false,
                                isResize: true,
                                slide: false
                              }); 
                  		  }
                  	  }
                    });
            	}
            }
            
            //删除用户
            function deleteUser(){
            	var userids = g.getSelecteds();
            	if(userids.length == 0){ //没有选择用户的情况
            		$.ligerDialog.error('请选择要删除的用户');
            	}else{
            		var ids = [];
            		$.each(userids,function(i,data){//遍历取出的id,把这些数据放到数组中，穿到后台
            			ids.push(data.userid);
            		});
            		
            		$.ajax({
                    	  url: "User/deleteUser.do",
                    	  cache: false,
                    	  type: "POST",
                    	  dataType: "json",
                    	  data : JSON.stringify(ids),
                    	  contentType:"application/json", //这个属性必须加上去，否则后台无法接受数据
                    	  success: function(json){
                    		 var message =  json["result"].message;
                       		 if(json["result"].state == 1){
                       			 $.ligerDialog.alert(message);
                       			 reload();//删除用户后重新加载数据
                       		 }else{
                       			$.ligerDialog.error(message);
                       		 }
                    	  }
                    });
            	}
            } 
            
            //重新加载grid中的数据            
            function reload(){
            	g.reload();
            }
             
            
            //增加验证方法
            $.validator.addMethod(
                    "notnull",
                    function (value, element, regexp)
                    {
                        if (!value) return true;
                        return !$(element).hasClass("l-text-field-null");
                    },
                    "不能为空"
            );
            
            //设置元数据为需要验证的
            $.metadata.setType("attr", "validate");
            
            //增加用户的弹出框form
            var v = $("#addUserForm").validate({
                errorPlacement: function (lable, element)
                {
                    if (element.hasClass("l-textarea"))
                    {
                        element.addClass("l-textarea-invalid");
                    }
                    else if (element.hasClass("l-text-field")){
                        element.parent().addClass("l-text-invalid");
                    }
                    $(element).removeAttr("title").ligerHideTip();
                    $(element).attr("title", lable.html()).ligerTip();
                },
                success: function (lable)
                {
                    var element = $("#" + lable.attr("for"));
                    if (element.hasClass("l-textarea"))
                    {
                        element.removeClass("l-textarea-invalid");
                    }
                    else if (element.hasClass("l-text-field"))
                    {
                        element.parent().removeClass("l-text-invalid");
                    }
                    $(element).removeAttr("title").ligerHideTip();
                },
                submitHandler: function ()//验证成功之后
                {
                	var txtName = $("#txtName").ligerGetTextBoxManager().getValue();
                	var txtSex = $("#txtSex").val();
                	var txtAge = $("#txtAge").val();
                	var txtBirthdy = $("#txtBirthdy").val();
                	
                	var user = {
                		"username" : txtName,
                		"usersex" : txtSex,
                		"userage" : txtAge,
                		"userbirthdy" : txtBirthdy                		
                	};
                	
                	//向后台增加用户
                	$.ajax({
                  	  url: "User/addUser.do",
                  	  cache: false,
                  	  type: "POST",
                  	  dataType: "json",
                  	  data : JSON.stringify(user),
                  	  contentType:"application/json", //这个属性必须加上去，否则后台无法接受数据
                  	  success: function(json){
                  		 var message =  json["result"].message;
                  		 if(json["result"].state == 1){
                  			 $.ligerDialog.alert(message);
                  			 reload();
                  		 }else{
                  			$.ligerDialog.error(message);
                  		 }
                  	  }
                  });
                }
            });
            
            //修改用户信息的弹出框
            var v1 = $("#modifyUserForm").validate({
                errorPlacement: function (lable, element)
                {
                    if (element.hasClass("l-textarea"))
                    {
                        element.addClass("l-textarea-invalid");
                    }
                    else if (element.hasClass("l-text-field")){
                        element.parent().addClass("l-text-invalid");
                    }
                    $(element).removeAttr("title").ligerHideTip();
                    $(element).attr("title", lable.html()).ligerTip();
                },
                success: function (lable)
                {
                    var element = $("#" + lable.attr("for"));
                    if (element.hasClass("l-textarea"))
                    {
                        element.removeClass("l-textarea-invalid");
                    }
                    else if (element.hasClass("l-text-field"))
                    {
                        element.parent().removeClass("l-text-invalid");
                    }
                    $(element).removeAttr("title").ligerHideTip();
                },
                submitHandler: function ()//验证成功之后
                {
                	
                	var userName = $("#userName").ligerGetTextBoxManager().getValue();
                	var userSex = $("#userSex").val();
                	var userAge = $("#userAge").val();
                	var userBirthdy = $("#userBirthdy").val();
                	var tid = $("#tid").val();
                	
                	var tuser = {
                		"username" : userName,
                		"usersex" : userSex,
                		"userage" : userAge,
                		"userbirthdy" : userBirthdy,
                		"userid" : tid //此处要先获得要修改用户的id，和其他数据一起传到后台去
                	};
                	
                	$.ajax({
                  	  url: "User/modifyUser.do",
                  	  cache: false,
                  	  type: "POST",
                  	  dataType: "json",
                  	  data : JSON.stringify(tuser),
                  	  contentType:"application/json", //这个属性必须加上去，否则后台无法接受数据
                  	  success: function(json){
                  		 var message =  json["result"].message;
                 		 if(json["result"].state == 1){
                 			 $.ligerDialog.alert(message);
                 			 reload();
                 		 }else{
                 			$.ligerDialog.error(message);
                 		 }
                  	  }
                  });
                }
            });
            
            //将所有的form表单都设置为ligerUI的form表单
            $("form").ligerForm();
        }); 