class Quiz {
  constructor(){
    this.title = createElement("h2")
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

  getContestantInfo(){
    var contestantInfoRef = database.ref('contestants')
        contestantInfoRef.on("value",function(data){
        allContestants = data.val();
      })
    }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){

    background("Yellow");
    
    fill("Chocolate");
    textSize(30);
    text("RESULTS of the QUIZ",270, 50);
    text("___________________",260,50);
    text("___________________",260,55);

    Contestant.getPlayerInfo();
    if(allContestants !== undefined){
        var display_Answers = 230;
          fill("Grey");
          textSize(25);
          text("NOTE : Contestants who answered correct are highlighted in GreenColor",30,230);

      for(var plr in allContestants){
        var correctAns = "2";
            if(correctAns === allContestants[plr].answer){
               fill("Green");
            } else {
               fill("red");
            }
        display_Answers+=40;
        textSize(20);
        text(allContestants[plr].name + "  ===>  " + allContestants[plr].answer, 50,display_Answers)
      }
    }
  }
}