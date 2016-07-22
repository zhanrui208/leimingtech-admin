$(document).ready(
		function() {
			//列表下拉
			$('img[nc_type="flex"]').click(
				function() {
					var status = $(this).attr('status');
					if (status == 'open') {
						var pr = $(this).parent('td').parent('tr');
						var id = $(this).attr('fieldid');
						var obj = $(this);
						var level = $(this).attr('level');
						
						$(this).attr('status', 'none');
						//ajax
						$.ajax({
							url : APP_BASE + '/frontMenu/child?id='	+ id + '&level=' + (Number(level) + 1),
							dataType : 'json',
							success : function(data) {
								var src = '';
								for ( var i = 0; i < data.length; i++) {
									var tmp_vertline = "<img class='preimg' src='templates/images/vertline.gif'/>";
									src += "<tr class='" + pr.attr('class')	+ " row" + id + "'>";
									src += "<td class='w36'><input type='checkbox' name='ids' value='"+data[i].id+"' class='checkitem' />";
									if (data[i].hasChild != 0) {
										src += "<img fieldid='"+data[i].id+"' status='open' nc_type='flex' src='"+APP_BASE+"/res/images/tv-expandable.gif' />";
									} else {
										src += "<img fieldid='"+data[i].id+"' status='none' nc_type='flex' src='"+APP_BASE+"/res/images/tv-item.gif' />";
									} 
									//图片
									src += "</td><td class='sort'>";
									
									src += "<span class='editable'  nc_type='inline_edit' required='1' fieldname='sort' fieldid='"+data[i].id+"' modUrl='"+APP_BASE+"/frontMenu/editSort' >"	+ data[i].sort	+ "</span>";
									
									src += "</td><td class='name'>";
									
									if (data[i].have_child != 0) {
										src += " <img fieldid='"+data[i].id+"' status='open' nc_type='flex' src='"+APP_BASE+"/res/images/tv-item1.gif' />";
									} else {
										src += " <img fieldid='"+data[i].id+"' status='none' nc_type='flex' src='"+APP_BASE+"/res/images/tv-expandable1.gif' />";
									} 
									
									src += "<span class='editable' nc_type='inline_edit' >"	+ data[i].name	+ "</span>";
									
									src += "</td><td class='name'>";

									src += "<span class='editable'  nc_type='inline_edit' required='1' fieldname='url' fieldid='"+data[i].id+"' modUrl='"+APP_BASE+"/frontMenu/editUrl' >"	+ data[i].url	+ "</span>";
									
									//名称
									src += "</td><td class='name'>";
									for ( var tmp_i = 1; tmp_i < (data[i].deep - 1); tmp_i++) {
										src += tmp_vertline;
									}
									src += "<span  class='node_name editable' nc_type='inline_edit'>"  + data[i].description + "</span>";
									
									//新增下级
									src += "</td>";

									//操作
									src += "<td class='w84 align-center'>";
									src += "<a href=\"JavaScript:void(0);\" onclick=\"delClassid("+data[i].id+")\">删除</a>";
									src += "</td>";
									src += "</tr>";
								}
								//插入
								pr.after(src);
								obj.attr('status','close');
								obj.attr('src',	obj.attr('src').replace(
									"tv-expandable",
									"tv-collapsable"));
								$('img[nc_type="flex"]').unbind('click');
								$('span[nc_type="inline_edit"]').unbind('click');
								//重现初始化页面
								$.getScript(APP_BASE + "/res/js/jquery.edit.js");
								$.getScript(APP_BASE + "/res/js/jquery.menu.js");
								$.getScript(APP_BASE + "/res/js/admincp.js"); 
							},
							error : function() {
								alert('获取信息失败');
							}
						});
					}
					if (status == 'close') {
						$(".row" + $(this).attr('fieldid')).remove();
						$(this).attr('src',$(this).attr('src').replace("tv-collapsable","tv-expandable"));
							$(this).attr('status', 'open');
					}
				});
});
