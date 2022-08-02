class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leaderBord = createElement("h2");
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
  }

  getState() {
    var stateref = database.ref("gameState");
    stateref.on("value", (data) => {
      mygameState = data.val();
    });
  }

  updateState(state) {
    database.ref("/").update({
      gameState: state,
    });
  }

  start() {
    myform = new Form();
    myform.display();

    myplayer = new Player();
    myplayer.getCount();

    car1 = createSprite(width / 2 - 100, height - 100);
    car1.addImage("car1", car1Image);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2Image);
    car2.scale = 0.07;

    cars = [car1, car2];

    // fuels
    fuelGroup = new Group();
    this.addSprites(fuelGroup, 30, fuelImage, 0.02);

    conisGroup = new Group();
    this.addSprites(conisGroup, 30, coinsImage, 0.09);
  }

  play() {
    myform.hide();
    myform.titleImg.position(100, 50);
    myform.titleImg.class("changeImage");

    this.resetTitle.html("Reset Game");
    this.resetTitle.position(width / 2 + 200, 40);
    this.resetTitle.class("resetText");

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

    this.leaderBord.html("Leader Board");
    this.leaderBord.position(width / 3 - 60, 40);
    this.leaderBord.class("resetText");

    this.leader1.position(width / 3 - 50, 80);
    this.leader2.position(width / 3 - 50, 130);

    this.leader1.class("leadersText");
    this.leader2.class("leadersText");
    Player.getPlayerInfo();
    myplayer.getCarsInfo();

    if (allPlayers !== undefined) {
      image(trackImage, 0, -height * 5, width, height * 6);

      this.handleResetButton();
      this.showleaderBorad();

      // i means indiviual players in allplayers variable
      // i=player1 ,player2
      var index = 0;
      for (var i in allPlayers) {
        // increase the index of the player
        index = index + 1;

        // accessing indiviual x and y position of the player from firebase
        var x = allPlayers[i].positionX;
        var y = height - allPlayers[i].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        // 1=1 2=2
        if (index === myplayer.index) {
          // camera.position.x= cars[index-1].position.x
          camera.position.y = cars[index - 1].position.y;
          this.handleFuel(index);
          this.handleCoins(index);
        }
      }

      const finsihsline = height * 6 - 100;
      if (myplayer.positionY > finsihsline) {
        mygameState = 2;
        myplayer.rank += 1;
        myplayer.updatePlayerInfo();
        Player.updateCarInfo(myplayer.rank);
        this.showrank();
      }
      drawSprites();
      this.handlePlayers();
    }
  }

  handlePlayers() {
    if (keyIsDown(UP_ARROW)) {
      myplayer.positionY += 10;
      myplayer.updatePlayerInfo();
    }
    if (keyIsDown(LEFT_ARROW) && myplayer.positionX > width / 3 - 50) {
      myplayer.positionX -= 10;
      myplayer.updatePlayerInfo();
    }
    if (keyIsDown(RIGHT_ARROW) && myplayer.positionX < width / 2 + 300) {
      myplayer.positionX += 10;
      myplayer.updatePlayerInfo();
    }
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").update({
        gameState: 0,
        playerCount: 0,
        players: {},
        carsAtEnd: 0,
      });

      window.location.reload();
    });
  }

  addSprites(spriteGroup, numberOfSprites, SpriteImage, scale) {
    for (var i = 0; i < numberOfSprites; i += 1) {
      var x, y;

      x = random(width / 2 + 200, width / 2 - 200);
      y = random(-height * 4.5, height - 400);

      var sprite = createSprite(x, y);
      sprite.addImage("sprite", SpriteImage);
      spriteGroup.add(sprite);
      sprite.scale = scale;
    }
  }

  handleFuel(index) {
    // sprite.overlap(taget,function)
    cars[index - 1].overlap(fuelGroup, function (collecter, collected) {
      collected.remove();
    });
  }

  handleCoins(index) {
    cars[index - 1].overlap(conisGroup, function (collecter, collected) {
      collected.remove();
      myplayer.score += 20;
      myplayer.updatePlayerInfo();
    });
  }
  showleaderBorad() {
    var myleader1, myleader2;
    var players = Object.values(allPlayers);

    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      myleader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
      myleader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }

    if (players[1].rank === 1) {
      myleader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
      myleader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }

    this.leader1.html(myleader1);
    this.leader2.html(myleader2);
  }

  showrank() {
    swal({
      title: "Awesome",
      text: "you reached the final boss",
      imageUrl:
        "//raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmbutton: "ok",
    });
  }
  end() {}
}
