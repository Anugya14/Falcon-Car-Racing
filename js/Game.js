class Game {
  constructor(){
this.leaderBoardTitle= createElement("h2");
this.leader1=createElement("h2");
this.leader2=createElement("h2");
this.leader3=createElement("h2");
this.leader4=createElement("h2");
}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    //this.handleElements();
    //this.showLeaderboard();
    Player.getPlayerInfo();
    player.getCarsatEnd();

    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
        fill("red");
        ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3560){
      gameState = 2;
      player.rank+=1   
    Player.updateCarsatEnd(player.rank);
    }

    
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank)
    this.handleElements();
    this.showLeaderboard();
  }

  handleElements(){
    this.leaderBoardTitle.html("Leader Board");
    this.leaderBoardTitle.position(width/3-60,40);
    this.leader1.position(width/3-50,80);
    this.leader2.position(width/3-50,120);
    this.leader3.position(width/3-50,160);
    this.leader4.position(width/3-50,200);
  }
  showLeaderboard(){
    var leader1, leader2, leader3, leader4;
    var players=Object.values(allPlayers);
    if((players[0].rank===0&&players[1].rank===0)||(players[0].rank===1)){
    leader1=players[0].rank+"&emsp;"+players[0].name+"&emsp;"+players[0].score+"&emsp;"
    }
    if(player[1].rank===1){
      leader1=players[1].rank+"emsp;"+players[1].name+"emsp;"+players[1].score+"emsp;"
    }
  }
}
