(function(){

	// 插入 <ul> 之 <li> 樣板


	var tmpl = '<li><input type="text"><span></span></li>',
		addButton = $('#add'),     
		connected = $('.connected'),
		placeholder = $('#placeholder'), 
		mainUl = $('.main'),
		deleteUl = $('.delete'),
		doneUl = $('.done');    



// 點擊按鈕時，插入新項目
addButton.on('click', function(){
		$(tmpl).prependTo(mainUl).addClass('is-editing').find('input').focus();});


	//按下Enter鍵 會完成並存黨
mainUl.on('keyup','input',function(e){
		if(e.which === 13){
			var input = $(this),
				li = input.parents('li');

			//將input的狀態 複製到 span
			li.find('span').text(input.val());

			//取消 <li> 的編輯模式
			li.removeClass('is-editing');

			//存檔
			save();			
		}
	});
	
	


// 從localStorage讀出整個表 放進Ul
load();

//	準備好要裝各個項目的空陣列
function save(){
		var arr = [];
		mainUl.find('li').each(function(){
		arr.push($(this).find('span').text());
		});
		localStorage.todoItems = JSON.stringify(arr);
}


function load(){
	if(!localStorage.todoItems){return;}
		var arr = JSON.parse(localStorage.todoItems),i,li;

	for(i=0; i<arr.length; i++){
		li= $(tmpl);
	li.appendTo(mainUl).find('span').text(arr[i]);
	}
}

	
	
	


// 讓按鈕可以拖來拖去
connected.sortable({
		//项目被双向连接
		connectWith:connected,  
		
		//"intersect"：项目至少 50% 重叠在其他项目上。
		//"pointer"：鼠标指针重叠在其他项目上
		tolerance:'pointer'		
});


	

// 拖曳時顯示隱藏兩個選單	
mainUl.on('sortstart',function(){
	placeholder.addClass('is-dragging');
}).on('sortstop',function(){
	placeholder.removeClass('is-dragging');
	save();
});

	
// 刪除項目	
deleteUl.on('sortreceive',function(e,ui){
	ui.item.remove();
	save();
});

	


// 完成項目的樣子	
	
doneUl.on( 'sortreceive', function( event, ui ) {
	ui.item.addClass('is-done').appendTo(mainUl);
	save();
} );
		

}());