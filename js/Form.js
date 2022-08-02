class Form {
  constructor() {
    this.titleImg = createImg("assets/title.png", "gameTitle")
    this.inputbox = createInput("").attribute("placeholder", "Enter Your Name")
    this.playbutton = createButton("Play")
    this.greeting = createElement("h2")

  }
  hide() {
    this.inputbox.hide()
    this.playbutton.hide()
    this.greeting.hide()
  }

  setPosition() {
    this.titleImg.position(130, 100)
    this.inputbox.position(width / 2 - 100, height / 2 - 80)
    this.playbutton.position(width / 2 - 90, height / 2 - 20)
    this.greeting.position(width / 2 - 90, height / 2 - 20)
  }

  setStyle() {
    this.titleImg.class("gameTitle")
    this.inputbox.class("customInput")
    this.playbutton.class("customButton")
    this.greeting.class("greeting")
  }

  handlemousePressed() {
    this.playbutton.mousePressed(() => {
      this.inputbox.hide()
      this.playbutton.hide()

      var message = `Hello ${this.inputbox.value()}
      <br/>
      for other playes`
      this.greeting.html(message)

      myplayerCount += 1
      myplayer.updateCount(myplayerCount)

      myplayer.index = myplayerCount
      myplayer.name = this.inputbox.value()
      myplayer.addPlayers()
      myplayer.getDistance()
    })

  }

  display() {
    this.setPosition()
    this.setStyle()
    this.handlemousePressed()
  }

}
