//自调用函数-----游戏对象

	(function () {
		var that = null;//该变量的目的就是为了保存游戏Game的实例对象

		//游戏的构造函数
		function Game(map) {
			this.food = new Food();//食物对象
			this.snake = new Snake();//小蛇对象
			this.map = map;//地图
			that = this;//保存当前的实例对象到that变量中----此时that就是this
		}

		//初始化游戏-----可以设置小蛇和食物显示出来
		Game.prototype.init = function () {
			//初始化游戏
			//食物初始化
			this.food.init(this.map);
			//小蛇初始化
			this.snake.init(this.map);
			//调用小蛇自动移动的方法
			this.runSnake(this.food, this.map);
			//调用案件的方法
			this.bindKey();
		};

	

		//添加原型的方法----设置小蛇可以自动跑起来
		Game.prototype.runSnake = function (food, map) {
			//自动地去移动
			

			//设置小蛇移动速度的时间间隔
			timeInterval = 190;

			var timeId = setInterval(function () {


				//此时的this是window
				//移动小蛇
				this.snake.move(food, map);
				//初始化小蛇
				this.snake.init(map);
				//横坐标的最大值
				var maxX = map.offsetWidth / this.snake.width;
				//纵坐标的最大值
				var maxY = map.offsetHeight / this.snake.height;
				//小蛇的头的坐标
				var headX = this.snake.body[0].x;
				var headY = this.snake.body[0].y;
				//横坐标
				if (headX < 0 || headX > maxX - 1) {
					//撞墙了，停止定时器
					clearInterval(timeId);
					alert("Game Over  (〒︿〒)");
					//点击关闭弹窗后立即刷新页面，重新开始游戏
					location.reload();
				}
				//纵坐标
				if (headY < 0 || headY > maxY - 1) {
					//撞墙了，停止计时器
					clearInterval(timeId);
					alert("Game Over  (〒︿〒)");
					//点击关闭弹窗后立即刷新页面，重新开始游戏
					location.reload();
				}
			}.bind(that), timeInterval);
		};



		//添加原型方法----设置button改变方向
		Game.prototype.changeDirection = function (cd) {
			switch (cd) {
				//向左
				case 0:
					this.snake.direction = "left";
					document.querySelector(".btnLeft").style.backgroundImage = "url(images/clickLeft.png)";
					break;
				//向上
				case 1:
					this.snake.direction = "top";
					document.querySelector(".btnUp").style.backgroundImage = "url(images/clickUp.png)";
					break;
				//向右
				case 2:
					this.snake.direction = "right";
					document.querySelector(".btnRight").style.backgroundImage = "url(images/clickRight.png)";
					break;
				//向下
				case 3:
					this.snake.direction = "bottom";
					document.querySelector(".btnDown").style.backgroundImage = "url(images/clickDown.png)";
					break;
			}
		};
		

		//添加原型方法----更改鼠标移到button上的样式
		Game.prototype.changeBtnColorMove = function (cbcm) {
			switch (cbcm) {
				case 0:
					document.querySelector(".btnLeft").style.backgroundImage = "url(images/clickLeft.png)";
					break;
				case 1:
					document.querySelector(".btnUp").style.backgroundImage = "url(images/clickUp.png)";
					break;
				case 2:
					document.querySelector(".btnRight").style.backgroundImage = "url(images/clickRight.png)";
					break;
				case 3:
					document.querySelector(".btnDown").style.backgroundImage = "url(images/clickDown.png)";
					break;
			}
		};


		//添加原型方法----更改鼠标移出button时的样式
		Game.prototype.changeBtnColorOut = function (cbco) {
			switch (cbco) {
				case 0:
					document.querySelector(".btnLeft").style.backgroundImage = "url(images/left.png)";
					break;
				case 1:
					document.querySelector(".btnUp").style.backgroundImage = "url(images/up.png)";
					break;
				case 2:
					document.querySelector(".btnRight").style.backgroundImage = "url(images/right.png)";
					break;
				case 3:
					document.querySelector(".btnDown").style.backgroundImage = "url(images/down.png)";
					break;
			}
		};



		//添加原型方法----设置用户按键，改变小蛇移动的方向
		Game.prototype.bindKey = function () {
			//获取用户的按键，改变小蛇的方向
			document.addEventListener("keydown",function (e) {

				//这里的this应该是触发keydown的事件的对象----document
				//所以，这里的this就是document
				//获取按键的值
				switch (e.keyCode) {
					//方向键左
					case 37:
						this.snake.direction = "left";
						break;
					//键盘按键A
					case 65:
						this.snake.direction = "left";
						break;
					//方向键上
					case 38:
						this.snake.direction = "top";
						break;
					//键盘按键W
					case 87:
						this.snake.direction = "top";
						break;
					//方向键右
					case 39:
						this.snake.direction = "right";
						break;
					//键盘按键D
					case 68:
						this.snake.direction = "right";
						break;
					//方向键下
					case 40:
						this.snake.direction = "bottom";
						break;
					//键盘按键S
					case 83:
						this.snake.direction = "bottom";
						break;
				}
			}.bind(that),false);
		};

		//把Game暴露给window，外部就可以访问Game对象了
		window.Game = Game;
	}());