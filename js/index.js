
function Spirit(x, y, src) {
	var img = document.createElement("IMG");
	this.img = img;
	this.posX = x;
	this.posY = y;
	this.setImg("./img/"+src);
}

Spirit.prototype.setImg = function(src) {
	var drawTarget = document.getElementById("main-game");
	this.img.style.position = 'absolute';
	this.img.style.left = this.posX + 'px';
	this.img.style.top = this.posY + 'px';
	this.img.src = src;	
	drawTarget.appendChild(this.img);
	if (src=="./img/tree.png") this.img.style.zIndex = 1;
};
Spirit.prototype.AI=function  (obj) {
	//document.getElementById('mx').innerHTML=obj.posX+","+obj.posY;
	var direction = ['n', 'e', 's', 'w'];
	var d = Math.floor(Math.random() * 70);
	if (d > 3) this.direction = this.direction;
	else this.direction = direction[d];
}
/*
Spirit.prototype.AI=function  (obj) {
	document.getElementById('mx').innerHTML=obj.posX+","+obj.posY+"  "+this.posX+","+this.posY;
	var close=[];
	var open=[];
	var start={posX:this.posX,posY:this,posY};
	open.push(start);
	for(var i=0;i<open.length;i++)
	{
		Gscore=
		var block={direction:'s',Gscore:1,Hscore:}
		open.push()
	}
}
*/

Spirit.prototype.updatePostion = function( params) {
	//if (params == 'enemy') this.AI();
	if (this instanceof BulletSpirit) {
		switch (this.direction) {
			case 'w':
				if (this.canMoveL == true) {
					this.img.style.left = this.img.offsetLeft - this.speed + "px";
					this.img.style.webkitTransform = "rotate(-90deg)";
				};
				break;
			case 'e':
				if (this.canMoveR == true) {
					this.img.style.left = this.img.offsetLeft + this.speed + "px";
					this.img.style.webkitTransform = "rotate(90deg)";
				};
				break;
			case 'n':
				if (this.canMoveT == true) {
					this.img.style.top = this.img.offsetTop - this.speed + "px";
					this.img.style.webkitTransform = "rotate(0deg)";
				};
				break;
			case 's':
				if (this.canMoveB == true) {
					this.img.style.top = this.img.offsetTop + this.speed + "px";
					this.img.style.webkitTransform = "rotate(180deg)";
				};
				break;
		};
	}
	else
	{
		switch (this.direction) {
			case 'w':
				if (this.canMoveL == true) {
					this.img.style.left = this.img.offsetLeft - this.speed + "px";
					this.img.style.webkitTransform = "rotate(-90deg)";
				};
				break;
			case 'e':
				if (this.canMoveR == true) {
					this.img.style.left = this.img.offsetLeft + this.speed + "px";
					this.img.style.webkitTransform = "rotate(90deg)";
				};
				break;
			case 'n':
				if (this.canMoveT == true) {
					this.img.style.top = this.img.offsetTop - this.speed + "px";
					this.img.style.webkitTransform = "rotate(0deg)";
				};
				break;
			case 's':
				if (this.canMoveB == true) {
					this.img.style.top = this.img.offsetTop + this.speed + "px";
					this.img.style.webkitTransform = "rotate(180deg)";
				};
				break;
		};
		//this.canMove=false;
		//setTimeout((function(thisTank) {
		//	return function() {
		//		thisTank.ca= true;
		//	}
		//})(this), 1200);
	}
	if (this instanceof TankSpirit || this instanceof BulletSpirit) {
		var main = document.getElementById('main-game');
		var leftBorder = main.offsetLeft;
		var rightBorder = main.offsetLeft + main.offsetWidth;
		var topBorder = main.offsetTop;
		var bottomBorder = main.offsetTop + main.offsetHeight;
		if (this instanceof TankSpirit) {
			this.img.offsetLeft <= leftBorder && (this.img.style.left = leftBorder + "px");
			this.img.offsetTop <= topBorder && (this.img.style.top = topBorder + "px");
			rightBorder - this.img.offsetLeft - this.img.offsetWidth <= 0 && (this.img.style.left = rightBorder - this.img.offsetWidth + "px");
			bottomBorder - this.img.offsetTop - this.img.offsetHeight <= 0 && (this.img.style.top = bottomBorder - this.img.offsetHeight + "px")
		} else {
			this.img.offsetLeft <= leftBorder && (this.img.setAttribute("class", "destruct"));
			this.img.offsetTop <= topBorder && (this.img.setAttribute("class", "destruct"));
			rightBorder - this.img.offsetLeft - this.img.offsetWidth <= 0 && (this.img.setAttribute("class", "destruct"));
			bottomBorder - this.img.offsetTop - this.img.offsetHeight <= 0 && (this.img.setAttribute("class", "destruct"));
			var destruct = document.getElementsByClassName('destruct');
			for (var i = 0; i < destruct.length; i++) {
				if (destruct[i] != null) {
					destruct[i].parentNode.removeChild(destruct[i]);
					params.obj[params.Index] = null;
					//params.obj.splice(params.Index, 1);///////////////////////////////////border ok
				}
			}
		}
	}
	this.posX = this.img.offsetLeft;
	this.posY = this.img.offsetTop;
	return this;
}
function inherit(obj) {
	if (Object.create) {
		return Object.create(obj);
	} else if (typeof obj != 'function' && typeof obj != 'object') {
		function f() {};
		f.prototype = obj;
		return new f();
	};
}

function MapSpirit(x, y, character) {
	var content = {
		"#": "hardWall.png",
		" ": "empty.png",
		"*": "softWall.png",
		"s": "sea.png",
		"t": "tree.png",
		"B": "base.png"
	}[character];
	this.content=content;
	if (content=='softWall.png') {
		this.status='complete';
	}; 
	Spirit.apply(this, [x, y, content]);
}
MapSpirit.prototype = inherit(Spirit.prototype);
MapSpirit.prototype.constructor = MapSpirit;

function TankSpirit(params) {
	this.speed = params.speed;
	this.life = params.life;
	this.canMove=true;
	this.direction = params.dir;
	this.canMoveT = this.canMoveB = this.canMoveL = this.canMoveR = this.canShot = true;
	Spirit.apply(this, [params.x, params.y, params.src]);
}
TankSpirit.prototype = inherit(Spirit.prototype);
TankSpirit.prototype.constructor = TankSpirit;
TankSpirit.prototype.wallCollide = function(obstruction) {
	var objMiddle = this.img.offsetLeft + this.img.offsetWidth / 2;
	var distance, wall, countNS, wallS, distanceS, wallL, distanceL, countLR, wallR, distanceR;
	distance = distanceL = 9999;
	distanceS = distanceR = -9999;
	wall = wallS = wallL = wallR = null;
	countNS = countLR = 0;
	for (var i = 0; i < obstruction.length; i++) {
		var wallLeft = obstruction[i].img.offsetLeft;
		var wallRight = obstruction[i].img.offsetWidth + obstruction[i].img.offsetLeft;
		var wallTop = obstruction[i].img.offsetTop;
		var wallBottom = obstruction[i].img.offsetHeight + obstruction[i].img.offsetTop;
		var objLeft = this.img.offsetLeft;
		var objRight = this.img.offsetLeft + this.img.offsetWidth;
		if (obstruction[i] instanceof MapSpirit&&obstruction[i].content=='softWall.png'&&obstruction[i].status!='complete') {
			if (obstruction[i].status=='half-top') {
				wallBottom=obstruction[i].img.offsetHeight*0.5 + obstruction[i].img.offsetTop;
			}
			else if (obstruction[i].status=='half-bottom') {
				wallTop=obstruction[i].img.offsetHeight*0.5 + obstruction[i].img.offsetTop;
			}
			else if (obstruction[i].status=='half-left') {
				
				wallRight=obstruction[i].img.offsetWidth*0.5 + obstruction[i].img.offsetLeft;
			}
			else if (obstruction[i].status=='half-right') {
				wallLeft=obstruction[i].img.offsetLeft+0.5*obstruction[i].img.offsetWidth;
			}
			obstruction[i].status == 'te' &&
				(wallLeft = obstruction[i].img.offsetLeft + 0.5 * obstruction[i].img.offsetWidth,
					wallBottom = obstruction[i].img.offsetHeight * 0.5 + obstruction[i].img.offsetTop);
			obstruction[i].status == 'tw' &&
				(wallRight=obstruction[i].img.offsetWidth*0.5 + obstruction[i].img.offsetLeft,
					wallBottom = obstruction[i].img.offsetHeight * 0.5 + obstruction[i].img.offsetTop);	
			obstruction[i].status == 'be' &&
				(wallLeft = obstruction[i].img.offsetLeft + 0.5 * obstruction[i].img.offsetWidth,
					wallTop=obstruction[i].img.offsetHeight*0.5 + obstruction[i].img.offsetTop);
			obstruction[i].status == 'bw' &&
				(wallTop=obstruction[i].img.offsetHeight*0.5 + obstruction[i].img.offsetTop,
					wallRight=obstruction[i].img.offsetWidth*0.5 + obstruction[i].img.offsetLeft);
			obstruction[i].status == 'ln' &&
				(wallRight=obstruction[i].img.offsetWidth*0.5 + obstruction[i].img.offsetLeft,
					wallBottom = obstruction[i].img.offsetHeight * 0.5 + obstruction[i].img.offsetTop);	
			obstruction[i].status == 'ls' &&
				(wallTop=obstruction[i].img.offsetHeight*0.5 + obstruction[i].img.offsetTop,
					wallRight=obstruction[i].img.offsetWidth*0.5 + obstruction[i].img.offsetLeft);
			obstruction[i].status == 'rn' &&
				(wallLeft = obstruction[i].img.offsetLeft + 0.5 * obstruction[i].img.offsetWidth,
					wallBottom = obstruction[i].img.offsetHeight * 0.5 + obstruction[i].img.offsetTop);
			obstruction[i].status == 'rs' &&
				(wallLeft = obstruction[i].img.offsetLeft + 0.5 * obstruction[i].img.offsetWidth,
					wallTop=obstruction[i].img.offsetHeight*0.5 + obstruction[i].img.offsetTop);		
		}
		if (((objMiddle >= wallLeft && objMiddle <= wallRight) || (objLeft <= wallRight && objRight >= wallRight) || (objLeft <= wallLeft && objRight >= wallLeft)) && this.img.offsetTop >= wallBottom) {
			wall = (this.img.offsetTop - wallBottom <= distance ? (distance = this.img.offsetTop - wallBottom, obstruction[i]) : wall);

		} else if (((objMiddle >= wallLeft && objMiddle < wallRight) || (objLeft <= wallRight && objRight >= wallRight) || (objLeft <= wallLeft && objRight >= wallLeft)) && this.img.offsetTop + this.img.offsetHeight <= wallTop) {
			wallS = (this.img.offsetTop + this.img.offsetHeight - wallTop > distanceS ? (distanceS = this.img.offsetTop + this.img.offsetHeight - wallTop, obstruction[i]) : wallS);

		} else if ((this.img.offsetLeft >= wallRight) && ((wallTop >= this.img.offsetTop && wallTop <= this.img.offsetTop + this.img.offsetHeight) ||
				(wallBottom >= this.img.offsetTop && wallBottom <= this.img.offsetHeight + this.img.offsetTop) ||
				(this.img.offsetTop >= wallTop && this.img.offsetTop <= wallBottom && this.img.offsetTop + this.img.offsetHeight >= wallTop && this.img.offsetTop + this.img.offsetHeight <= wallBottom) ||
				(wallBottom <= this.img.offsetWidth + this.img.offsetTop && wallTop >= this.img.offsetTop))) {
			wallL = (this.img.offsetLeft - wallRight < distanceL ? (distanceL = this.img.offsetLeft - wallRight, obstruction[i]) : wallL);

		} else if ((wallLeft >= this.img.offsetLeft + this.img.offsetWidth) && ((wallTop >= this.img.offsetTop && wallTop <= this.img.offsetTop + this.img.offsetHeight) || (this.img.offsetTop >= wallTop && this.img.offsetTop <= wallBottom && this.img.offsetTop + this.img.offsetHeight >= wallTop && this.img.offsetTop + this.img.offsetHeight <= wallBottom) ||
				(wallBottom >= this.img.offsetTop && wallBottom <= this.img.offsetHeight + this.img.offsetTop) ||
				(wallBottom <= this.img.offsetWidth + this.img.offsetTop && wallTop >= this.img.offsetTop))) {
			wallR = (this.img.offsetLeft + this.img.offsetWidth - wallLeft > distanceR ? (distanceR = this.img.offsetLeft + this.img.offsetWidth - wallLeft, obstruction[i]) : wallR);

		}
		if (!((objMiddle >= wallLeft && objMiddle <= wallRight) || (objLeft <= wallRight && objRight >= wallRight) || (objLeft <= wallLeft && objRight >= wallLeft))) countNS++;
		if (!((wallTop >= this.img.offsetTop && wallTop <= this.img.offsetTop + this.img.offsetHeight) ||
				(this.img.offsetTop >= wallTop && this.img.offsetTop <= wallBottom && this.img.offsetTop + this.img.offsetHeight >= wallTop && this.img.offsetTop + this.img.offsetHeight <= wallBottom) ||
				(wallBottom >= this.img.offsetTop && wallBottom <= this.img.offsetHeight + this.img.offsetTop) ||
				(wallBottom <= this.img.offsetWidth + this.img.offsetTop && wallTop >= this.img.offsetTop))) countLR++;
		countNS == obstruction.length && (wall = undefined, wallS = undefined);
		countLR == obstruction.length && (wallL = undefined, wallR = undefined);
	}
	if (wall && distance < 4) this.canMoveT = false;
	else this.canMoveT = true;
	if (wallS && distanceS > -4) this.canMoveB = false;
	else this.canMoveB = true;
	if (wallL && distanceL < 4) this.canMoveL = false;
	else this.canMoveL = true;
	if (wallR && distanceR > -4) this.canMoveR = false;
	else this.canMoveR = true;
}
TankSpirit.prototype.shot=function  () {
	this.canShot = false;
	setTimeout((function(thisTank) {
		return function() {
			thisTank.canShot = true;
		}
	})(this), 1200);
}

function BulletSpirit(params){
	this.direction=params.bulletDir;
	this.speed=6;
	this.id=params.id;
	var x,y;
	if (this.direction=='n') {
		x=params.x+10;
		y=params.y;
	}
	else if (this.direction=='s') {
		x=params.x+12;
		y=params.y+16;
	}
	else if (this.direction=='e') {
		x=params.x+19;
		y=params.y+8;
	}
	else if (this.direction=='w') {
		x=params.x+3;
		y=params.y+10;
	}
	this.canMoveT = this.canMoveB = this.canMoveL = this.canMoveR = this.canShot = true;
	Spirit.apply(this, [x, y, "bullet.png"]);
}
BulletSpirit.prototype = inherit(Spirit.prototype);
BulletSpirit.prototype.constructor = BulletSpirit;
/*BulletSpirit.prototype.bulletCollide = function(enemyTarget, wallTarget,params,callback) {
	var garbageCollection= function() {
		var destruct = document.getElementsByClassName('destruct');
		for (var i = 0; i < destruct.length; i++) {
			if (destruct[i] != null)
				destruct[i].parentNode.removeChild(destruct[i]);
		}
	}
	for (var j = 0; j < enemyTarget.length; j++) {
		if (enemyTarget[j]) {
			var etank = enemyTarget[j];
			if (etank.img.offsetLeft - this.img.offsetLeft < 20 &&
				etank.img.offsetLeft - this.img.offsetLeft > -20 &&
				etank.img.offsetTop - this.img.offsetTop < 20 &&
				etank.img.offsetTop - this.img.offsetTop > -20 && this.id != 'enemy') {
				etank.life = etank.life - 1;
			               if (etank.life==3) {
			               	etank.img.src = "en.png";
			               };
				this.img.setAttribute("class", "destruct");///////////////////////////////////enemy
				//params.obj.splice(params.Index, 1);//orign
				if (etank.life == 0) {
					etank.img.src = "boom.png";
					enemyTarget.splice(j, 1);
					setTimeout((function(thisTank) {
						return function() {
							thisTank.img.src = "bigboom.png";
						}
					})(etank), 120);
					var timer= function  () {
						setTimeout((function(thisTank,x) {
							return function() {
								thisTank.img.setAttribute("class", "destruct");
								x();
								callback();
							}
						})(etank,garbageCollection), 285);
					} 
					timer();
					//params.obj.splice(params.Index, 1);//new
				};
			};
		}
	}
	
	for (var j = wallTarget.length - 1; j >= 0; j--) {
		var wallLeft = wallTarget[j].img.offsetLeft;
		var wallRight = wallTarget[j].img.offsetWidth + wallTarget[j].img.offsetLeft;
		var wallTop = wallTarget[j].img.offsetTop;
		var wallBottom = wallTarget[j].img.offsetHeight + wallTarget[j].img.offsetTop;
		var wallCenterX = wallTarget[j].img.offsetLeft + wallTarget[j].img.offsetWidth / 2;
		var wallCenterY = wallTarget[j].img.offsetTop + wallTarget[j].img.offsetHeight / 2;
		//bug
		if (wallTarget[j].content != "sea.png" && this.img.offsetLeft - wallCenterX < 19 && this.img.offsetTop - wallCenterY > -17 && this.img.offsetLeft - wallCenterX > -19 && this.img.offsetTop - wallCenterY < 17) {
			//params.obj.splice(params.Index, 1);//orgin
			this.img.setAttribute("class", "destruct");//////////////////////////////////////wall
			if (wallTarget[j].content == "softWall.png") {
				wallTarget[j].img.src = "boom.png";
				var timer=function  () {
					setTimeout((function(w,x) {
						return function() {
							w.img.setAttribute("class", "destruct");
							x();
						}
					})(wallTarget[j],garbageCollection), 30);
				} 
				timer();
				//params.obj.splice(params.Index, 1);/////new ok?
				wallTarget.splice(j,1);
			}
		}	
	}
	garbageCollection();
}*/
BulletSpirit.prototype.bulletCollide = function(enemyTarget, wallTarget,params,callback) {
	var garbageCollection= function() {
		var destruct = document.getElementsByClassName('destruct');
		for (var i = 0; i < destruct.length; i++) {
			if (destruct[i] != null)
				destruct[i].parentNode.removeChild(destruct[i]);
		}
	}
	for (var j = 0; j < enemyTarget.length; j++) {
		if (enemyTarget[j]) {
			var etank = enemyTarget[j];
			if (etank.img.offsetLeft - this.img.offsetLeft < 20 &&
				etank.img.offsetLeft - this.img.offsetLeft > -20 &&
				etank.img.offsetTop - this.img.offsetTop < 20 &&
				etank.img.offsetTop - this.img.offsetTop > -20 && this.id != 'enemy') {
				etank.life = etank.life - 1;
			               if (etank.life==3) {
			               	etank.img.src = "en.png";
			               };
				this.img.setAttribute("class", "destruct");///////////////////////////////////enemy
				//params.obj.splice(params.Index, 1);//orign
				if (etank.life == 0) {
					etank.img.src = "./img/boom.png";
					enemyTarget.splice(j, 1);
					setTimeout((function(thisTank) {
						return function() {
							thisTank.img.src = "./img/bigboom.png";
						}
					})(etank), 120);
					var timer= function  () {
						setTimeout((function(thisTank,x) {
							return function() {
								thisTank.img.setAttribute("class", "destruct");
								x();
								callback();
							}
						})(etank,garbageCollection), 285);
					} 
					timer();
					//params.obj.splice(params.Index, 1);//new
				};
			};
		}
	}
	
	for (var j = wallTarget.length - 1; j >= 0; j--) {
		var wallLeft = wallTarget[j].img.offsetLeft;
		var wallRight = wallTarget[j].img.offsetWidth + wallTarget[j].img.offsetLeft;
		var wallTop = wallTarget[j].img.offsetTop;
		var wallBottom = wallTarget[j].img.offsetHeight + wallTarget[j].img.offsetTop;
		var wallCenterX = wallTarget[j].img.offsetLeft + wallTarget[j].img.offsetWidth / 2;
		var wallCenterY = wallTarget[j].img.offsetTop + wallTarget[j].img.offsetHeight / 2;
		//bug
		if (wallTarget[j].content != "sea.png" && this.img.offsetLeft - wallCenterX < 19 && this.img.offsetTop - wallCenterY > -17 && this.img.offsetLeft - wallCenterX > -19 && this.img.offsetTop - wallCenterY < 17) {
			this.img.setAttribute("class", "destruct");
			if (wallTarget[j].content == "softWall.png") {
				if (wallTarget[j].status=='complete') {
					if (this.direction=='n') {
						wallTarget[j].img.style.clip="rect(0px,"+wallTarget[j].img.offsetWidth+"px,"+wallTarget[j].img.offsetHeight*0.5+"px,0px)";
						wallTarget[j].status='half-top';
					}
					else if (this.direction=='s') {
						wallTarget[j].img.style.clip="rect("+wallTarget[j].img.offsetHeight*0.5+"px,"+wallTarget[j].img.offsetWidth+"px,"+wallTarget[j].img.offsetHeight+"px,0px)";
						wallTarget[j].status='half-bottom';
					}
					else if (this.direction=='e') {
						wallTarget[j].img.style.clip="rect(0px,"+wallTarget[j].img.offsetWidth+"px,"+wallTarget[j].img.offsetHeight+"px,"+wallTarget[j].img.offsetWidth*0.5+"px)";
						wallTarget[j].status='half-right';
					}
					else if (this.direction=='w') {
						wallTarget[j].img.style.clip="rect(0px,"+wallTarget[j].img.offsetWidth*0.5+"px,"+wallTarget[j].img.offsetHeight+"px,0px)";
						wallTarget[j].status='half-left';
					}	
				}
				else if (wallTarget[j].status=='half-top') {
					 if (this.direction=='e') {
						wallTarget[j].img.style.clip="rect(0px,"+wallTarget[j].img.offsetWidth+"px,"+wallTarget[j].img.offsetHeight*0.5+"px,"+wallTarget[j].img.offsetWidth*0.5+"px)";
						wallTarget[j].status='te';
					}
					else if (this.direction=='w') {
						wallTarget[j].img.style.clip="rect(0px,"+wallTarget[j].img.offsetWidth*0.5+"px,"+wallTarget[j].img.offsetHeight*0.5+"px,0px)";
						wallTarget[j].status='tw';
					}	
					else  wallTarget[j].status='destruct';
				}
				else if (wallTarget[j].status=='half-bottom') {
					 if (this.direction=='e') {
						wallTarget[j].img.style.clip="rect("+wallTarget[j].img.offsetHeight*0.5+"px,"+wallTarget[j].img.offsetWidth+"px,"+wallTarget[j].img.offsetHeight+"px,"+wallTarget[j].img.offsetWidth*0.5+"px)";
						wallTarget[j].status='be';
					}
					else if (this.direction=='w') {
						wallTarget[j].img.style.clip="rect("+wallTarget[j].img.offsetHeight*0.5+"px,"+wallTarget[j].img.offsetWidth*0.5+"px,"+wallTarget[j].img.offsetHeight+"px,0px)";
						wallTarget[j].status='bw';
					}	
					else  wallTarget[j].status='destruct';
				}
				else if (wallTarget[j].status=='half-left') {
					 if (this.direction=='n') {
						wallTarget[j].img.style.clip="rect(0px,"+wallTarget[j].img.offsetWidth*0.5+"px,"+wallTarget[j].img.offsetHeight*0.5+"px,0px)";
						wallTarget[j].status='ln';
					}
					else if (this.direction=='s') {
						wallTarget[j].img.style.clip="rect("+wallTarget[j].img.offsetHeight*0.5+"px,"+wallTarget[j].img.offsetWidth*0.5+"px,"+wallTarget[j].img.offsetHeight+"px,0px)";
						wallTarget[j].status='ls';
					}	
					else  wallTarget[j].status='destruct';
				}
				else if (wallTarget[j].status=='half-right') {
					 if (this.direction=='n') {
						wallTarget[j].img.style.clip="rect(0px,"+wallTarget[j].img.offsetWidth+"px,"+wallTarget[j].img.offsetHeight*0.5+"px,"+wallTarget[j].img.offsetWidth*0.5+"px)";
						wallTarget[j].status='rn';
					}
					else if (this.direction=='s') {
						wallTarget[j].img.style.clip="rect("+wallTarget[j].img.offsetHeight*0.5+"px,"+wallTarget[j].img.offsetWidth+"px,"+wallTarget[j].img.offsetHeight+"px,"+wallTarget[j].img.offsetWidth*0.5+"px)";
						wallTarget[j].status='rs';
					}	
					else  wallTarget[j].status='destruct';
				}
				else {
					wallTarget[j].status='destruct';
				}
				 if (wallTarget[j].status=='destruct') {
					wallTarget[j].img.src = "./img/boom.png";
					var timer = function() {
						setTimeout((function(w, x) {
							return function() {
								w.img.setAttribute("class", "destruct");
								x();
							}
						})(wallTarget[j], garbageCollection), 30);
					}
					timer();
					wallTarget.splice(j, 1);
				}
			}
		}
	}
	garbageCollection();
}

window.onload = function() {
	(function() {
		//var start = document.getElementById('start');
		var main = document.getElementById('main');
		main.style.width =1016+"px" //start.style.width = 1016+"px";//screen.width * 0.8 - 8 + 'px';
		main.style.height = 642+"px"//start.style.height = 642+"px";//screen.height * 0.8 + 2 + 'px';
		//main.style.left = screen.width * 0.1 + 'px';
		//start.style.left=screen.width * 0.5 + 'px';
		//var level = 0;
		//var startfun = function() {
		//	if (level < 230) {
		//		start.style.left= start.offsetLeft - 3+'px';
		//		level = level + 1;
		//		setTimeout(startfun,0);
		//	}
		//}
		//setTimeout(startfun,1000)
	})();
	var Director = (function() {
		var instance;
		var load=0;
		function init() {
			var posX = 0;
			var posY = 0;
			var flag = 1;
			var nowRound=1;
			var killNum=0;
			var tank = new TankSpirit({
				speed: 3,
				life: 100,
				dir: 'n',
				src: 'n.png',
				x: 300,
				y: 500
			});
			var myBullet=[];
			var enemyBullet=[];
			var Wall=[];
			var Bullet=[];
			var timer;
			var enemyTank=[];
			var  dirtyValue=false;
			var round1 = {
					map: [  "     #*#     **    @",
						"t    ###         t @",
						"                   @",
						"                   @",
						"**sstt       ******@",
						"     t     t       @",
						"                   @",
						"        #  t*******@",
						"          tttttt**@",
						"       ** ***ssst**@",
						"  ******     ssst*t@",
						"                   @",
						"    sss   tt* *t #t@",
						"    ***   *ttttt tt@",
						"  ttttt** ***t***ss@",
						"  t***t#   #*#   ss@",
						"**t***t#   #       @",
						"**t***t          #@",
						"        ###     s @",
						"ss      #B#     ss@",
					],
					enemyNum: 15
				};
			var round2 = {
					map: [  "     #*#     **    @",
						"t    #        t @",
						"                   @",
						"                   @",
						"**s**@",
						"     t     t       @",
						"                   @",
						"        #  ***@",
						"        t**@",
						"       ** ***ssst**@",
						"  ******     ssst*t@",
						"                   @",
						"    sss   tt* *t #t@",
						"    ***  tt@",
						"  ts@",
						"  t***t   ss@",
						"**  #       @",
						"**             #@",
						"        *** s @",
						"ss      *B*     ss@",
					],
					enemyNum: 15
				};	
			function schedule() {
				if (nowRound == 1 && killNum == 0) {
					enemyTank.push(new TankSpirit({
						speed: 2,
						life: 2,
						dir: 'n',
						src: 'en.png',
						x: 10,
						y: 490
					}));
					enemyTank.push(new TankSpirit({
						speed: 2,
						life: 7,
						dir: 'n',
						src: 'en3.png',
						x: 360,
						y: 130
					}));
					enemyTank.push(new TankSpirit({
						speed: 2,
						life: 3,
						dir: 'n',
						src: 'en2.png',
						x: 200,
						y: 150
					}));
					enemyTank.push(new TankSpirit({
						speed: 2,
						life: 3,
						dir: 'n',
						src: 'en.png',
						x: 400,
						y: 90
					}));
					dirtyValue=true;
				}
				else if (nowRound==1&&killNum==1) {
					enemyTank.push(new TankSpirit({
						speed: 2,
						life: 7,
						dir: 'n',
						src: 'en3.png',
						x: 400,
						y: 500
					}));
					enemyTank.push(new TankSpirit({
						speed: 4,
						life: 3,
						dir: 'n',
						src: 'en2.png',
						x: 90,
						y: 500
					}));
					enemyTank.push(new TankSpirit({
						speed: 2,
						life: 3,
						dir: 'n',
						src: 'en.png',
						x: 400,
						y: 100
					}));
					dirtyValue=true;
				};
			};
			function GC () {
				Bullet.splice(1,25);
			}
			return {
				//public
				setScene: function(param) {
					var round={
						"round1":round1,
						"round2":round2,
					}[param];
					for (var y = 0; y < round.map.length; y++) {
						var line = round.map[y];
						for (var x = 0; x < line.length; x++) {
							if (line.charAt(x) == " ") posX = posX + 33;
							else if (line.charAt(x) == "@") {
								posY = posY + 32;
								posX = 0;
							} else {
								var tile=new MapSpirit(posX, posY, line.charAt(x));
								if (line.charAt(x)=="*"||line.charAt(x)=="s"||line.charAt(x)=="#") {
									Wall.push(tile);
								};
								posX = posX + 33;
							}
						}
					}
					return this;	
				},
				reSet:function  () {
					var main=document.getElementById('main-game');
					posX = 0;
					posY = 0;
					flag = 1;
					nowRound = 1;
					killNum = 0;
					myBullet = [];
					enemyBullet = [];
					Wall = [];
					Bullet = [];
					enemyTank = [];
					clearInterval(timer);
					dirtyValue = false;
					while(main.lastChild)
					{
						main.removeChild(main.lastChild);
					}
					tank = new TankSpirit({
						speed: 3,
						life: 100,
						dir: 'n',
						src: 'n.png',
						x: 100,
						y: 100
					});
					return this;
				},
				startGame: function() {
					var left = Top = right = bottom = space = false;
					document.onkeydown = function(event) {
						if (tank.canMove) {
							switch ((event || window.event).keyCode) {
								case 32:
									space = true;
									break;
								case 37:
								               tank.img.style.webkitTransform = "rotate(-90deg)";
									left = true;
									Top = bottom = false;
									tank.direction = 'w';
									break;
								case 38:
								               tank.img.style.webkitTransform = "rotate(0deg)";
									Top = true;
									right = left = false;
									tank.direction = 'n';
									break;
								case 39:
								               tank.img.style.webkitTransform = "rotate(90deg)";
									right = true;
									Top = bottom = false;
									tank.direction = 'e';
									break;
								case 40:
								                tank.img.style.webkitTransform = "rotate(180deg)";
									bottom = true;
									right = left = false;
									tank.direction = 's';
									break;
							}
						};
						//return false;
					};

					if (/ipad|iphone|android/i.test(navigator.userAgent)) {
						if (!load) {
							var left = document.createElement("div");
							left.style.position = "absolute";
							left.style.width = 300 + "px";
							left.style.height = 100 + "px";
							left.setAttribute("class", "direction")
							left.setAttribute("id", "left")
							left.style.left = 10 + "px";
							left.style.top = 800 + "px";
							document.body.appendChild(left);

							var right = document.createElement("div");
							right.style.position = "absolute";
							right.style.width = 300 + "px";
							right.style.height = 100 + "px";
							right.setAttribute("class", "direction")
							right.setAttribute("id", "right")
							right.style.left = 500 + "px";
							right.style.top = 800 + "px";
							document.body.appendChild(right);

							var top = document.createElement("div");
							top.style.position = "absolute";
							top.style.width = 200 + "px";
							top.style.height = 100 + "px";
							top.setAttribute("class", "direction")
							top.setAttribute("id", "top")
							top.style.left = 300 + "px";
							top.style.top = 700 + "px";
							document.body.appendChild(top);

							var bottom = document.createElement("div");
							bottom.style.position = "absolute";
							bottom.style.width = 200 + "px";
							bottom.style.height = 100 + "px";
							bottom.setAttribute("class", "direction")
							bottom.setAttribute("id", "buttom")
							bottom.style.left = 300 + "px";
							bottom.style.top = 900 + "px";
							document.body.appendChild(bottom);

							var space= document.createElement("div");
							space.style.position = "absolute";
							space.style.width = 500 + "px";
							space.style.height = 100 + "px";
							space.setAttribute("class", "direction")
							space.setAttribute("id", "buttom")
							space.style.left = 150 + "px";
							space.style.top = 1100 + "px";
							document.body.appendChild(space);
							load = 1;

						};
						var obj = left;
						obj.addEventListener('touchstart', function(event) {
							if (event.targetTouches.length == 1) {　　　　
								if (tank.canMove) {
									tank.img.style.webkitTransform = "rotate(-90deg)";
									left = true;
									Top = bottom = false;
									tank.direction = 'w';
								}
							}
						}, false);
						obj.addEventListener('touchend', function(event) {
							if (event.targetTouches.length == 1) {　　　　
								left=false;
							}
						}, false);
					              obj=right;
					              obj.addEventListener('touchstart', function(event) {
							if (event.targetTouches.length == 1) {　　　　
								if (tank.canMove) {
									   tank.img.style.webkitTransform = "rotate(90deg)";
									right = true;
									Top = bottom = false;
									tank.direction = 'e';
								}
							}
						}, false);
					              obj.addEventListener('touchend', function(event) {
							if (event.targetTouches.length == 1) {　　　　
								right=false;
							}
						}, false);
					              obj=top;
					              obj.addEventListener('touchstart', function(event) {
							if (event.targetTouches.length == 1) {　　　　
								if (tank.canMove) {
									  tank.img.style.webkitTransform = "rotate(0deg)";
									Top = true;
									right = left = false;
									tank.direction = 'n';
								}
							}
						}, false);
					              obj.addEventListener('touchend', function(event) {
							if (event.targetTouches.length == 1) {　　　　
								top=false;
							}
						}, false);
					              obj=bottom;
					               obj.addEventListener('touchstart', function(event) {
							if (event.targetTouches.length == 1) {　　　　
								if (tank.canMove) {
									   tank.img.style.webkitTransform = "rotate(180deg)";
									bottom = true;
									right = left = false;
									tank.direction = 's';
								}
							}
						}, false);
					               obj.addEventListener('touchend', function(event) {
							if (event.targetTouches.length == 1) {　　　　
								bottom=false;
							}
						}, false);
					               obj=space;
					                obj.addEventListener('touchstart', function(event) {
							if (event.targetTouches.length == 1) {　　　　
									space = true;
								
							}
						}, false);
					                obj.addEventListener('touchend', function(event) {
							if (event.targetTouches.length == 1) {　　　　
								space=false;
							}
						}, false);
					}

					document.onkeyup = function(event) {
						switch ((event || window.event).keyCode) {
							case 32:
								space = false;
								break;
							case 37:
								left = false;
								break;
							case 38:
								Top = false;
								break;
							case 39:
								right = false;
								break;
							case 40:
							bottom = false;
							break;
						}
					};
					//alert(tank instanceof TankSpirit);
					var protectTime = setInterval(function() {
						setTimeout(function(argument) {
							tank.img.src = "./img/protect1.png";
						}, 100);
						protecttime= setTimeout(function() {
							tank.img.src = "./img/protect2.png";
						}, 270);
					}, 30);
					setTimeout(function(fun1) {
						return function() {
							clearInterval(fun1);							
						}
					}(protectTime), 3000);
					setTimeout(function  (argument) {
						tank.img.src = "./img/n.png";
					} ,3500);
					timer = setInterval(function() {
						if (Bullet.length>70) GC();
						if (dirtyValue==false)  schedule();
						var obstruction = [];
						
						obstruction.push(tank);
						Array.prototype.push.apply(obstruction, Wall);
						Array.prototype.push.apply(obstruction, enemyTank);
						//if (enemyTank[0]) {
						//	document.getElementById('main-text').innerHTML=Bullet[0]+" <br>BLength "+Bullet.length+"<br>Enum"+enemyTank.length+"<br>"+Wall[0].content+"<br>Elife:"+enemyTank[0].life+"<br>ObNum:"+obstruction.length+"<br>Knum:"+killNum;
						//}
						//else{
						//	document.getElementById('main-text').innerHTML=Bullet[0]+" <br>BLength "+Bullet.length+"<br>Enum"+enemyTank.length+"<br>ObNum:"+obstruction.length+"<br>Knum:"+killNum;;
					//	}
						
						if (left && tank.canMoveL) {
							tank.updatePostion();
						} else if (right && tank.canMoveR) {
							tank.updatePostion();
						} else if (Top && tank.canMoveT) {
							tank.updatePostion();
						} else if (bottom && tank.canMoveB) {
							tank.updatePostion();
						}
						tank.wallCollide(obstruction);
						if (space && tank.canShot) {
							tank.canShot = false;
							var mBullet=new BulletSpirit({
								bulletDir: tank.direction,
								x: tank.posX,
								y: tank.posY,
								id:'my'
							});
							myBullet.push(mBullet);
							Bullet.push(mBullet);
							setTimeout(function() {
								tank.canShot = true;
							}, 600);
						}
						for (var i = 0; i < Bullet.length; i++) {
							if (Bullet[i] != undefined) {
								Bullet[i].updatePostion({
									Index: i,
									obj: Bullet
								}).bulletCollide(enemyTank, Wall,{
									Index:i,
									obj:Bullet
								},function(){
									killNum=killNum+1;
									dirtyValue=false;
								});
							};
						}
						for (var i = 0; i < enemyTank.length; i++) {
							setTimeout((function(thisTank) {
								return function() {
									if (thisTank.canShot&&thisTank.life) {
										thisTank.shot();	
										var eBullet=new BulletSpirit({
											bulletDir: thisTank.direction,
											x: thisTank.posX,
											id:'enemy',
											y: thisTank.posY
										});
										enemyBullet.push(eBullet);
										Bullet.push(eBullet);
										
									}
									if(thisTank.canMove)
										thisTank.updatePostion();
									thisTank.AI(tank);
									thisTank.wallCollide(obstruction);
								}
							})(enemyTank[i]), 0);
						}
					}, 30);
			                 }
		                };
		};
		return {
		getInstance: function() {
			if (!instance) {
				instance = init();
			};
			return instance;
		}
	}
})();

	//document.getElementById('start').onclick=function()
	// {
	 //	document.getElementById('start').style.display='none';
		Director.getInstance().setScene("round1").startGame();
	//};
	document.getElementById('select-round').onclick=function()
	{
		Director.getInstance(). reSet().setScene("round2").startGame();
	}
	if (/android/i.test(navigator.userAgent)) {
		// todo : android
	}


}

