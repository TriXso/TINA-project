// **************************************

// Javascript subor pre hru Tripple Triad

// **************************************

    // ************************
    // Funkcionalita & Logika
    // ************************

var cardsOfPlayer1 = [[],[],[],[],[]];
var cardsOfPlayer2 = [[],[],[],[],[]];


var cardsOnBoard0 = [['null'],['null'],['null']];
var cardsOnBoard1 = [['null'],['null'],['null']];
var cardsOnBoard2 = [['null'],['null'],['null']];

var cardsBool = [['nulle','nulle','nulle'],['nulle','nulle','nulle'],['nulle','nulle','nulle']];

var green = 0, red = 1;

var cardActivated = false;
var activeCard;
var playersTurn;
var from;
var fromPlayer;
var fromCard;
var hore = 0, napravo = 0, dole = 0, nalavo = 0;
var scoreOne = 0, scoreTwo = 0;

var cardsPlayed = 0;

function getRandomNumber() {
    var randomNumber = Math.floor( ( ( (Math.random()*100) + 1) % 10 ) + 1 );
    return randomNumber;
}

function activateCard(card, isPlayerCard, player, cardNumber, boardRow, boardColumn) {
  if(player == 1 && playersTurn == 1) {
    if(!cardActivated && isPlayerCard){
    cardActivated = true;
    activeCard = card.childNodes[1];
    card.style.borderColor = "red";
    from = card;
    fromPlayer = player;
    fromCard = cardNumber;
  }
  }
    else if(player == 2 && playersTurn == 2) {
    if(!cardActivated && isPlayerCard){
    cardActivated = true;
    activeCard = card.childNodes[1];
    card.style.borderColor = "red";
    from = card;
    fromPlayer = player;
    fromCard = cardNumber;
    }
  }
  else if (cardActivated && !isPlayerCard) {
    if(cardsBool[boardRow][boardColumn]=='nulle'){
    $(activeCard.childNodes).prependTo(card);
    cardActivated = false; 
    from.style.borderColor = "#cccccc";
    from.childNodes[1].style.backgroundColor = "white";
    
    moveCard(boardRow, boardColumn);
    
    if (playersTurn == 1) {
      playersTurn = 2;
      document.getElementById("turn").innerHTML = "Na ťahu je hráč: " + playersTurn;
      document.getElementsByClassName("playerName")[1].style.backgroundColor = "#FBFFC1";
      document.getElementsByClassName("playerName")[1].style.borderColor = "#FFB33F";
      document.getElementsByClassName("playerName")[0].style.backgroundColor = "#f2f2f2";
      document.getElementsByClassName("playerName")[0].style.borderColor = "grey";
    }
    else {
      playersTurn = 1;
      document.getElementById("turn").innerHTML = "Na ťahu je hráč: " + playersTurn;
      document.getElementsByClassName("playerName")[0].style.backgroundColor = "#FBFFC1";
      document.getElementsByClassName("playerName")[0].style.borderColor = "#FFB33F";
      document.getElementsByClassName("playerName")[1].style.backgroundColor = "#f2f2f2";
      document.getElementsByClassName("playerName")[1].style.borderColor = "grey";
    }       
   }
  }
}

function moveCard(boardRow, boardColumn) {
    if(fromPlayer==1 && boardRow == 0){
      cardsOnBoard0[boardColumn] = cardsOfPlayer1[fromCard];
      cardsBool[boardRow][boardColumn] = green;
      cardsPlayed++;
      runAround(boardRow, boardColumn);
    }
    else if(fromPlayer==1 && boardRow == 1){
      cardsOnBoard1[boardColumn] = cardsOfPlayer1[fromCard];
      cardsBool[boardRow][boardColumn] = green;
      cardsPlayed++;
      runAround(boardRow, boardColumn);
    } 
    else if(fromPlayer==1 && boardRow == 2){
      cardsOnBoard2[boardColumn] = cardsOfPlayer1[fromCard];
      cardsBool[boardRow][boardColumn] = green;
      cardsPlayed++;
      runAround(boardRow, boardColumn);
    }
    else if(fromPlayer==2 && boardRow == 0){
      cardsOnBoard0[boardColumn] = cardsOfPlayer2[fromCard];
      cardsBool[boardRow][boardColumn] = red;
      cardsPlayed++;
      runAround(boardRow, boardColumn);
    }
    else if(fromPlayer==2 && boardRow == 1){
      cardsOnBoard1[boardColumn] = cardsOfPlayer2[fromCard];
      cardsBool[boardRow][boardColumn] = red;
      cardsPlayed++;
      runAround(boardRow, boardColumn);
    } 
    else if(fromPlayer==2 && boardRow == 2){
      cardsOnBoard2[boardColumn] = cardsOfPlayer2[fromCard];
      cardsBool[boardRow][boardColumn] = red;
      cardsPlayed++;
      runAround(boardRow, boardColumn);
    }
    
}

function refreshScore() {
  document.getElementById("playerScoreOne").innerHTML = "Skóre: " + scoreOne;
  document.getElementById("playerScoreTwo").innerHTML = "Skóre: " + scoreTwo;
}

function runAround(boardRow,boardColumn) {
      
    // ************************
    // Karta od hráča 1
    // ************************
      
      if(fromPlayer == 1) {
        if(boardRow == 0) {
        
        // ************************
        // 00
        // ************************
        
          if(boardColumn == 0) {
            if(cardsOnBoard0[1]== 'null'){
              napravo = 0;
            }
            else {
              napravo = 1;
            }
            
            if(cardsOnBoard1[0]=='null'){
              dole = 0;
            }
            else {
              dole = 1;
            }
            
            
            document.getElementById("cardContainerX00").style.backgroundColor = "#72F89F";
            scoreOne++;
            
            if(napravo == 0 && dole == 0) {
               
            }
            else {
              if (napravo == 1 && cardsBool[0][1]!=green) {
                if(cardsOnBoard0[0][1]>cardsOnBoard0[1][3]){
                  scoreOne++;
                  document.getElementById("cardContainerX01").style.backgroundColor = "#72F89F";
                  cardsBool[0][1]=green;
                }
              }
              if (dole == 1 && cardsBool[1][0]!=green) {
                if(cardsOnBoard0[0][2]>cardsOnBoard1[0][0]){
                  scoreOne++;
                  document.getElementById("cardContainerX10").style.backgroundColor = "#72F89F";
                  cardsBool[1][0]=green;
                }
              }
            }
            refreshScore();
          }
        // ************************
        // 01
        // ************************
         
          else if(boardColumn == 1) {
            if(cardsOnBoard0[2]=='null'){
              napravo = 0;
            }
            else {
              napravo = 1;
            }
            
            if(cardsOnBoard1[1]=='null'){
              dole = 0;
            }
            else {
              dole = 1;
            }
            
            if(cardsOnBoard0[0]=='null'){
              nalavo = 0;
            }
            else {
              nalavo = 1;
            }
            
            document.getElementById("cardContainerX01").style.backgroundColor = "#72F89F";
            scoreOne++;
            
            if(napravo == 0 && dole == 0 && nalavo == 0) {
               
            }
            if(napravo == 1 && cardsBool[0][2]!=green) {
              if(cardsOnBoard0[1][1]>cardsOnBoard0[2][3]) {
                document.getElementById("cardContainerX02").style.backgroundColor = "#72F89F";
                cardsBool[0][2]=green;
                scoreOne++;
              }
            }
            if(dole == 1 && cardsBool[1][1]!=green) {
              if(cardsOnBoard0[1][2]>cardsOnBoard1[1][0]) {
                document.getElementById("cardContainerX11").style.backgroundColor = "#72F89F";
                cardsBool[1][1]=green;
                scoreOne++;
              }
            }
            if(nalavo == 1 && cardsBool[0][0]!=green) {
              if(cardsOnBoard0[1][3]>cardsOnBoard0[0][1]) {
                document.getElementById("cardContainerX00").style.backgroundColor = "#72F89F";
                cardsBool[0][0]=green;
                scoreOne++;
              }
            }

           refreshScore();
          }
          
          // ************************
          // 02
          // ************************
          
          else if(boardColumn == 2) {
             if(cardsOnBoard0[1]=='null'){
              nalavo = 0;
            }
            else {
              nalavo = 1;            
            }
            
            if(cardsOnBoard1[2]=='null'){
              dole = 0;
            }
            else {
              dole = 1;
            }
            
            document.getElementById("cardContainerX02").style.backgroundColor = "#72F89F";
            scoreOne++;
            
            if(nalavo == 0 && dole == 0) {
               document.getElementById("cardContainerX02").style.backgroundColor = "#72F89F";
            }
            if(dole == 1 && cardsBool[1][2]!=green) {
              if(cardsOnBoard0[2][2]>cardsOnBoard1[2][0]) {
                document.getElementById("cardContainerX12").style.backgroundColor = "#72F89F";
                cardsBool[1][2]=green;
                scoreOne++;
              }
            }
            if(nalavo == 1 && cardsBool[0][1]!=green) {
              if(cardsOnBoard0[2][3]>cardsOnBoard0[1][1]) {
                document.getElementById("cardContainerX01").style.backgroundColor = "#72F89F";
                cardsBool[0][1]=green;
                scoreOne++;
              }
            }

           refreshScore();          
          }
        }
        else if(boardRow == 1) {
        
          // ************************
          // 10
          // ************************
        
          if(boardColumn == 0) {
            if(cardsOnBoard0[0]=='null'){
              hore = 0;
            }
            else {
              hore = 1;
            }
            
            if(cardsOnBoard1[1]=='null'){
              napravo = 0;
            }
            else {
              napravo = 1;
            }
            
            if(cardsOnBoard2[0]=='null'){
              dole = 0;
            }
            else {
              dole = 1;
            }
            
            document.getElementById("cardContainerX10").style.backgroundColor = "#72F89F";
            scoreOne++;
            
            if(hore == 0 && napravo == 0 && dole == 0) {
               
            }
            if(hore == 1 && cardsBool[0][0]!=green) {
              if(cardsOnBoard1[0][0]>cardsOnBoard0[0][2]) {
                document.getElementById("cardContainerX00").style.backgroundColor = "#72F89F";
                cardsBool[0][0]=green;
                scoreOne++;
              }
            }
            if(napravo == 1 && cardsBool[1][1]!=green) {
              if(cardsOnBoard1[0][1]>cardsOnBoard1[1][3]) {
                document.getElementById("cardContainerX11").style.backgroundColor = "#72F89F";
                cardsBool[1][1]=green;
                scoreOne++;
              }
            }
            if(dole == 1 && cardsBool[2][0]!=green) {
              if(cardsOnBoard1[0][2]>cardsOnBoard2[0][0]) {
                document.getElementById("cardContainerX20").style.backgroundColor = "#72F89F";
                cardsBool[2][0]=green;
                scoreOne++;
              }
            }

           refreshScore(); 
          }
          
          // ************************
          // 11
          // ************************
          
          else if(boardColumn == 1) {
            if(cardsOnBoard0[1]=='null'){
              hore = 0;
            }
            else {
              hore = 1;            
            }
            
            if(cardsOnBoard1[2]=='null'){
              napravo = 0;
            }
            else {
              napravo = 1;
            }
            
            if(cardsOnBoard2[1]=='null'){
              dole = 0;
            }
            else {
              dole = 1;
            }
            
            if(cardsOnBoard1[0]=='null'){
              nalavo = 0;
            }
            else {
              nalavo = 1;
            }
            
            document.getElementById("cardContainerX11").style.backgroundColor = "#72F89F";
            scoreOne++;
            
            if(hore == 0 && napravo == 0 && dole == 0 && nalavo == 0) {
               
            }
            if(hore == 1 && cardsBool[0][1]!=green) {
              if(cardsOnBoard1[1][0]>cardsOnBoard0[1][2]) {
                document.getElementById("cardContainerX01").style.backgroundColor = "#72F89F";
                cardsBool[0][1]=green;
                scoreOne++;
              }
            }
            if(napravo == 1 && cardsBool[1][2]!=green) {
              if(cardsOnBoard1[1][1]>cardsOnBoard1[2][3]) {
                document.getElementById("cardContainerX12").style.backgroundColor = "#72F89F";
                cardsBool[1][2]=green;
                scoreOne++;
              }
            }
            if(dole == 1 && cardsBool[2][1]!=green) {
              if(cardsOnBoard1[1][2]>cardsOnBoard2[1][0]) {
                document.getElementById("cardContainerX21").style.backgroundColor = "#72F89F";
                cardsBool[2][1]=green;
                scoreOne++;
              }
            }
            if(nalavo == 1 && cardsBool[1][0]!=green) {
              if(cardsOnBoard1[1][3]>cardsOnBoard1[0][1]) {
                document.getElementById("cardContainerX10").style.backgroundColor = "#72F89F";
                cardsBool[1][0]=green;
                scoreOne++;
              }
            }

           refreshScore();
          }
          
          // ************************
          // 12
          // ************************
          
          else if(boardColumn == 2) {
            if(cardsOnBoard0[2]=='null'){
              hore = 0;
            }
            else {
              hore = 1;
            }
            
            if(cardsOnBoard2[2]=='null'){
              dole = 0;
            }
            else {
              dole = 1;
            }
            
            if(cardsOnBoard1[1]=='null'){
              nalavo = 0;
            }
            else {
              nalavo = 1;
            }
            
            document.getElementById("cardContainerX12").style.backgroundColor = "#72F89F";
            scoreOne++;
            
            if(hore == 0 && dole == 0 && nalavo == 0) {
               
            }
            if(hore == 1 && cardsBool[0][2]!=green) {
              if(cardsOnBoard1[2][0]>cardsOnBoard0[2][2]) {
                document.getElementById("cardContainerX02").style.backgroundColor = "#72F89F";
                cardsBool[0][2]=green;
                scoreOne++;
              }
            }
            if(dole == 1 && cardsBool[2][2]!=green) {
              if(cardsOnBoard1[2][2]>cardsOnBoard2[2][0]) {
                document.getElementById("cardContainerX22").style.backgroundColor = "#72F89F";
                cardsBool[2][2]=green;
                scoreOne++;
              }
            }
            if(nalavo == 1 && cardsBool[1][1]!=green) {
              if(cardsOnBoard1[2][3]>cardsOnBoard1[1][1]) {
                document.getElementById("cardContainerX11").style.backgroundColor = "#72F89F";
                cardsBool[1][1]=green;
                scoreOne++;
              }
            }

           refreshScore();
          }
        }
        else if(boardRow == 2) {
        
          // ************************
          // 20
          // ************************
        
          if(boardColumn == 0) {
            if(cardsOnBoard1[0]=='null'){
              hore = 0;
            }
            else {
              hore = 1;            
            }
            
            if(cardsOnBoard2[1]=='null'){
              napravo = 0;
            }
            else {
              napravo = 1;
            }
            
            document.getElementById("cardContainerX20").style.backgroundColor = "#72F89F";
            scoreOne++;
            
            if(hore == 0 && napravo == 0) {
               
            }
            if(hore == 1 && cardsBool[1][0]!=green) {
              if(cardsOnBoard2[0][0]>cardsOnBoard1[0][2]) {
                document.getElementById("cardContainerX10").style.backgroundColor = "#72F89F";
                cardsBool[1][0]=green;
                scoreOne++;
              }
            }
            if(napravo == 1 && cardsBool[2][1]!=green) {
              if(cardsOnBoard2[0][1]>cardsOnBoard2[1][3]) {
                document.getElementById("cardContainerX21").style.backgroundColor = "#72F89F";
                cardsBool[2][1]=green;
                scoreOne++;
              }
            }

           refreshScore();
          }
          
          // ************************
          // 21
          // ************************
          
          else if(boardColumn == 1) {
            if(cardsOnBoard1[1]=='null'){
              hore = 0;
            }
            else {
              hore = 1;
            }
            
            if(cardsOnBoard2[2]=='null'){
              napravo = 0;
            }
            else {
              napravo = 1;
            }
            
            if(cardsOnBoard2[0]=='null'){
              nalavo = 0;
            }
            else {
              nalavo = 1;
            }
            
            document.getElementById("cardContainerX21").style.backgroundColor = "#72F89F";
            scoreOne++;
            
            if(hore == 0 && napravo == 0 && nalavo == 0) {
               
            }
            if(hore == 1 && cardsBool[1][1]!=green) {
              if(cardsOnBoard2[1][0]>cardsOnBoard1[1][2]) {
                document.getElementById("cardContainerX11").style.backgroundColor = "#72F89F";
                cardsBool[1][1]=green;
                scoreOne++;
              }
            }
            if(napravo == 1 && cardsBool[2][2]!=green) {
              if(cardsOnBoard2[1][1]>cardsOnBoard2[2][3]) {
                document.getElementById("cardContainerX22").style.backgroundColor = "#72F89F";
                cardsBool[2][2]=green;
                scoreOne++;
              }
            }
            if(nalavo == 1 && cardsBool[2][0]!=green) {
              if(cardsOnBoard2[1][3]>cardsOnBoard2[0][1]) {
                document.getElementById("cardContainerX20").style.backgroundColor = "#72F89F";
                cardsBool[2][0]=green;
                scoreOne++;
              }
            }

           refreshScore();
          }
          
          // ************************
          // 22
          // ************************
          
          else if(boardColumn == 2) {
            if(cardsOnBoard1[2]=='null'){
              hore = 0;
            }
            else {
              hore = 1;
            }
            
            if(cardsOnBoard2[1]=='null'){
              nalavo = 0;
            }
            else {
              nalavo = 1;
            }
            
            document.getElementById("cardContainerX22").style.backgroundColor = "#72F89F";
            scoreOne++;
            
            if(hore == 0 && nalavo == 0) {
               
            }
            if(hore == 1 && cardsBool[1][2]!=green) {
              if(cardsOnBoard2[2][0]>cardsOnBoard1[2][2]) {
                document.getElementById("cardContainerX12").style.backgroundColor = "#72F89F";
                cardsBool[1][2]=green;
                scoreOne++;
              }
            }
            if(nalavo == 1 && cardsBool[1][1]!=green) {
              if(cardsOnBoard2[2][3]>cardsOnBoard2[1][1]) {
                document.getElementById("cardContainerX21").style.backgroundColor = "#72F89F";
                cardsBool[2][1]=green;
                scoreOne++;
              }
            }

           refreshScore();
          }
        }
      }
      else {
      
// **********************************************************
// Karta od hráča 2
// ***********************************************************
      
               if(boardRow == 0) {
        
        // ************************
        // 00
        // ************************
        
          if(boardColumn == 0) {
            if(cardsOnBoard0[1]== 'null'){
              napravo = 0;
            }
            else {
              napravo = 1;
            }
            
            if(cardsOnBoard1[0]=='null'){
              dole = 0;
            }
            else {
              dole = 1;
            }
            
            
            document.getElementById("cardContainerX00").style.backgroundColor = "#FB7F6C";
            scoreTwo++;
            
            if(napravo == 0 && dole == 0) {
               
            }
            else {
              if (napravo == 1 && cardsBool[0][1]!=red) {
                if(cardsOnBoard0[0][1]>cardsOnBoard0[1][3]){
                  scoreTwo++;
                  document.getElementById("cardContainerX01").style.backgroundColor = "#FB7F6C";
                  cardsBool[0][1]=red;
                }
              }
              if (dole == 1 && cardsBool[1][0]!=red) {
                if(cardsOnBoard0[0][2]>cardsOnBoard1[0][0]){
                  scoreTwo++;
                  document.getElementById("cardContainerX10").style.backgroundColor = "#FB7F6C";
                  cardsBool[1][0]=red;
                }
              }
            }
            refreshScore();
          }
        // ************************
        // 01
        // ************************
         
          else if(boardColumn == 1) {
            if(cardsOnBoard0[2]=='null'){
              napravo = 0;
            }
            else {
              napravo = 1;
            }
            
            if(cardsOnBoard1[1]=='null'){
              dole = 0;
            }
            else {
              dole = 1;
            }
            
            if(cardsOnBoard0[0]=='null'){
              nalavo = 0;
            }
            else {
              nalavo = 1;
            }
            
            document.getElementById("cardContainerX01").style.backgroundColor = "#FB7F6C";
            scoreTwo++;
            
            if(napravo == 0 && dole == 0 && nalavo == 0) {
               
            }
            if(napravo == 1 && cardsBool[0][2]!=red) {
              if(cardsOnBoard0[1][1]>cardsOnBoard0[2][3]) {
                document.getElementById("cardContainerX02").style.backgroundColor = "#FB7F6C";
                cardsBool[0][2]=red;
                scoreTwo++;
              }
            }
            if(dole == 1 && cardsBool[1][1]!=red) {
              if(cardsOnBoard0[1][2]>cardsOnBoard1[1][0]) {
                document.getElementById("cardContainerX11").style.backgroundColor = "#FB7F6C";
                cardsBool[1][1]=red;
                scoreTwo++;
              }
            }
            if(nalavo == 1 && cardsBool[0][0]!=red) {
              if(cardsOnBoard0[1][3]>cardsOnBoard0[0][1]) {
                document.getElementById("cardContainerX00").style.backgroundColor = "#FB7F6C";
                cardsBool[0][0]=red;
                scoreTwo++;
              }
            }

           refreshScore();
          }
          
          // ************************
          // 02
          // ************************
          
          else if(boardColumn == 2) {
             if(cardsOnBoard0[1]=='null'){
              nalavo = 0;
            }
            else {
              nalavo = 1;            
            }
            
            if(cardsOnBoard1[2]=='null'){
              dole = 0;
            }
            else {
              dole = 1;
            }
            
            document.getElementById("cardContainerX02").style.backgroundColor = "#FB7F6C";
            scoreTwo++;
            
            if(nalavo == 0 && dole == 0) {
               document.getElementById("cardContainerX02").style.backgroundColor = "#FB7F6C";
               cardsBool[0][2]=red;
            }
            if(dole == 1 && cardsBool[1][2]!=red) {
              if(cardsOnBoard0[2][2]>cardsOnBoard1[2][0]) {
                document.getElementById("cardContainerX12").style.backgroundColor = "#FB7F6C";
                cardsBool[1][2]=red;
                scoreTwo++;
              }
            }
            if(nalavo == 1 && cardsBool[0][1]!=red) {
              if(cardsOnBoard0[2][3]>cardsOnBoard0[1][1]) {
                document.getElementById("cardContainerX01").style.backgroundColor = "#FB7F6C";
                cardsBool[0][1]=red;
                scoreTwo++;
              }
            }

           refreshScore();          
          }
        }
        else if(boardRow == 1) {
        
          // ************************
          // 10
          // ************************
        
          if(boardColumn == 0) {
            if(cardsOnBoard0[0]=='null'){
              hore = 0;
            }
            else {
              hore = 1;
            }
            
            if(cardsOnBoard1[1]=='null'){
              napravo = 0;
            }
            else {
              napravo = 1;
            }
            
            if(cardsOnBoard2[0]=='null'){
              dole = 0;
            }
            else {
              dole = 1;
            }
            
            document.getElementById("cardContainerX10").style.backgroundColor = "#FB7F6C";
            scoreTwo++;
            
            if(hore == 0 && napravo == 0 && dole == 0) {
               
            }
            if(hore == 1 && cardsBool[0][0]!=red) {
              if(cardsOnBoard1[0][0]>cardsOnBoard0[0][2]) {
                document.getElementById("cardContainerX00").style.backgroundColor = "#FB7F6C";
                cardsBool[0][0]=red;
                scoreTwo++;
              }
            }
            if(napravo == 1 && cardsBool[1][1]!=red) {
              if(cardsOnBoard1[0][1]>cardsOnBoard1[1][3]) {
                document.getElementById("cardContainerX11").style.backgroundColor = "#FB7F6C";
                cardsBool[1][1]=red;
                scoreTwo++;
              }
            }
            if(dole == 1 && cardsBool[2][0]!=red) {
              if(cardsOnBoard1[0][2]>cardsOnBoard2[0][0]) {
                document.getElementById("cardContainerX20").style.backgroundColor = "#FB7F6C";
                cardsBool[2][0]=red;
                scoreTwo++;
              }
            }

           refreshScore(); 
          }
          
          // ************************
          // 11
          // ************************
          
          else if(boardColumn == 1) {
            if(cardsOnBoard0[1]=='null'){
              hore = 0;
            }
            else {
              hore = 1;            
            }
            
            if(cardsOnBoard1[2]=='null'){
              napravo = 0;
            }
            else {
              napravo = 1;
            }
            
            if(cardsOnBoard2[1]=='null'){
              dole = 0;
            }
            else {
              dole = 1;
            }
            
            if(cardsOnBoard1[0]=='null'){
              nalavo = 0;
            }
            else {
              nalavo = 1;
            }
            
            document.getElementById("cardContainerX11").style.backgroundColor = "#FB7F6C";
            scoreTwo++;
            
            if(hore == 0 && napravo == 0 && dole == 0 && nalavo == 0) {
               
            }
            if(hore == 1 && cardsBool[0][1]!=red) {
              if(cardsOnBoard1[1][0]>cardsOnBoard0[1][2]) {
                document.getElementById("cardContainerX01").style.backgroundColor = "#FB7F6C";
                cardsBool[0][1]=red;
                scoreTwo++;
              }
            }
            if(napravo == 1 && cardsBool[1][2]!=red) {
              if(cardsOnBoard1[1][1]>cardsOnBoard1[2][3]) {
                document.getElementById("cardContainerX12").style.backgroundColor = "#FB7F6C";
                cardsBool[1][2]=red;
                scoreTwo++;
              }
            }
            if(dole == 1 && cardsBool[2][1]!=red) {
              if(cardsOnBoard1[1][2]>cardsOnBoard2[1][0]) {
                document.getElementById("cardContainerX21").style.backgroundColor = "#FB7F6C";
                cardsBool[2][1]=red;
                scoreTwo++;
              }
            }
            if(nalavo == 1 && cardsBool[1][0]!=red) {
              if(cardsOnBoard1[1][3]>cardsOnBoard1[0][1]) {
                document.getElementById("cardContainerX10").style.backgroundColor = "#FB7F6C";
                cardsBool[1][0]=red;
                scoreTwo++;
              }
            }

           refreshScore();
          }
          
          // ************************
          // 12
          // ************************
          
          else if(boardColumn == 2) {
            if(cardsOnBoard0[2]=='null'){
              hore = 0;
            }
            else {
              hore = 1;
            }
            
            if(cardsOnBoard2[2]=='null'){
              dole = 0;
            }
            else {
              dole = 1;
            }
            
            if(cardsOnBoard1[1]=='null'){
              nalavo = 0;
            }
            else {
              nalavo = 1;
            }
            
            document.getElementById("cardContainerX12").style.backgroundColor = "#FB7F6C";
            scoreTwo++;
            
            if(hore == 0 && dole == 0 && nalavo == 0) {
               
            }
            if(hore == 1 && cardsBool[0][2]!=red) {
              if(cardsOnBoard1[2][0]>cardsOnBoard0[2][2]) {
                document.getElementById("cardContainerX02").style.backgroundColor = "#FB7F6C";
                cardsBool[0][2]=red;
                scoreTwo++;
              }
            }
            if(dole == 1 && cardsBool[2][2]!=red) {
              if(cardsOnBoard1[2][2]>cardsOnBoard2[2][0]) {
                document.getElementById("cardContainerX22").style.backgroundColor = "#FB7F6C";
                cardsBool[2][2]=red;
                scoreTwo++;
              }
            }
            if(nalavo == 1 && cardsBool[1][1]!=red) {
              if(cardsOnBoard1[2][3]>cardsOnBoard1[1][1]) {
                document.getElementById("cardContainerX11").style.backgroundColor = "#FB7F6C";
                cardsBool[1][1]=red;
                scoreTwo++;
              }
            }

           refreshScore();
          }
        }
        else if(boardRow == 2) {
        
          // ************************
          // 20
          // ************************
        
          if(boardColumn == 0) {
            if(cardsOnBoard1[0]=='null'){
              hore = 0;
            }
            else {
              hore = 1;            
            }
            
            if(cardsOnBoard2[1]=='null'){
              napravo = 0;
            }
            else {
              napravo = 1;
            }
            
            document.getElementById("cardContainerX20").style.backgroundColor = "#FB7F6C";
            scoreTwo++;
            
            if(hore == 0 && napravo == 0) {
               
            }
            if(hore == 1 && cardsBool[1][0]!=red) {
              if(cardsOnBoard2[0][0]>cardsOnBoard1[0][2]) {
                document.getElementById("cardContainerX10").style.backgroundColor = "#FB7F6C";
                cardsBool[1][0]=red;
                scoreTwo++;
              }
            }
            if(napravo == 1 && cardsBool[2][1]!=red) {
              if(cardsOnBoard2[0][1]>cardsOnBoard2[1][3]) {
                document.getElementById("cardContainerX21").style.backgroundColor = "#FB7F6C";
                cardsBool[2][1]=red;
                scoreTwo++;
              }
            }

           refreshScore();
          }
          
          // ************************
          // 21
          // ************************
          
          else if(boardColumn == 1) {
            if(cardsOnBoard1[1]=='null'){
              hore = 0;
            }
            else {
              hore = 1;
            }
            
            if(cardsOnBoard2[2]=='null'){
              napravo = 0;
            }
            else {
              napravo = 1;
            }
            
            if(cardsOnBoard2[0]=='null'){
              nalavo = 0;
            }
            else {
              nalavo = 1;
            }
            
            document.getElementById("cardContainerX21").style.backgroundColor = "#FB7F6C";
            scoreTwo++;
            
            if(hore == 0 && napravo == 0 && nalavo == 0) {
               
            }
            if(hore == 1 && cardsBool[1][1]!=red) {
              if(cardsOnBoard2[1][0]>cardsOnBoard1[1][2]) {
                document.getElementById("cardContainerX11").style.backgroundColor = "#FB7F6C";
                cardsBool[1][1]=red;
                scoreTwo++;
              }
            }
            if(napravo == 1 && cardsBool[2][2]!=red) {
              if(cardsOnBoard2[1][1]>cardsOnBoard2[2][3]) {
                document.getElementById("cardContainerX22").style.backgroundColor = "#FB7F6C";
                cardsBool[2][2]=red;
                scoreTwo++;
              }
            }
            if(nalavo == 1 && cardsBool[2][0]!=red) {
              if(cardsOnBoard2[1][3]>cardsOnBoard2[0][1]) {
                document.getElementById("cardContainerX20").style.backgroundColor = "#FB7F6C";
                cardsBool[2][0]=red;
                scoreTwo++;
              }
            }

           refreshScore();
          }
          
          // ************************
          // 22
          // ************************
          
          else if(boardColumn == 2) {
            if(cardsOnBoard1[2]=='null'){
              hore = 0;
            }
            else {
              hore = 1;
            }
            
            if(cardsOnBoard2[1]=='null'){
              nalavo = 0;
            }
            else {
              nalavo = 1;
            }
            
            document.getElementById("cardContainerX22").style.backgroundColor = "#FB7F6C";
            scoreTwo++;
            
            if(hore == 0 && nalavo == 0) {
               
            }
            if(hore == 1 && cardsBool[1][2]!=red) {
              if(cardsOnBoard2[2][0]>cardsOnBoard1[2][2]) {
                document.getElementById("cardContainerX12").style.backgroundColor = "#FB7F6C";
                cardsBool[1][2]=red;
                scoreTwo++;
              }
            }
            if(nalavo == 1 && cardsBool[2][1]!=red) {
              if(cardsOnBoard2[2][3]>cardsOnBoard2[1][1]) {
                document.getElementById("cardContainerX21").style.backgroundColor = "#FB7F6C";
                cardsBool[2][1]=red;
                scoreTwo++;
              }
            }

           refreshScore();
          }
        }
      }
      
      if(cardsPlayed==9) {
        if(scoreOne>scoreTwo){
          var winner = 1;
        }
        else if(scoreOne=scoreTwo) {
          var winner = 0;
        }
        else winner = 2;
        
        if(winner==0) {
          var winText = 'Remíza!';
        }
        else if(winner = 1) {
          var winText = 'Víťazom je Hráč 1!';
        }
        else if(winner = 2) {
          var winText = 'Víťazom je Hráč 2!';
        }
        
        document.getElementById('winnerContainerText').innerHTML = winText;
        document.getElementById('winnerWrapper').style.display = "block";
      }
}

    // ************************
    // Po načítaní stránky
    // ************************

$(document).ready(function(){
    generateCards();
    playersTurn = (getRandomNumber() % 2) + 1
    document.getElementById("turn").innerHTML = "Na ťahu je hráč: " + playersTurn;
    document.getElementById("playerScoreOne").innerHTML = "Skóre: " + scoreOne;
    document.getElementById("playerScoreTwo").innerHTML = "Skóre: " + scoreTwo;
    if(playersTurn==1){
    document.getElementsByClassName("playerName")[0].style.backgroundColor = "#FBFFC1";
    document.getElementsByClassName("playerName")[0].style.borderColor = "#FFB33F";  
    }
    else {
    document.getElementsByClassName("playerName")[1].style.backgroundColor = "#FBFFC1";
    document.getElementsByClassName("playerName")[1].style.borderColor = "#FFB33F";
    }  
});

    // ************************
    // Generate & Draw Cards
    // ************************

function generateCards() {
    for(var i = 0; i < 5; i++) {
      for(var w = 0; w < 4; w++) {
        cardsOfPlayer1[i][w] = getRandomNumber();
        cardsOfPlayer2[i][w] = getRandomNumber();
      }
    }    
    drawCards();
}

function drawCards() {
    
    // ************************
    // Draw Cards of player One
    // ************************
    
    // Card 1 player 1
    document.getElementById("topx10").innerHTML = cardsOfPlayer1[0][0];
    document.getElementById("rightx10").innerHTML = cardsOfPlayer1[0][1]; 
    document.getElementById("bottomx10").innerHTML = cardsOfPlayer1[0][2]; 
    document.getElementById("leftx10").innerHTML = cardsOfPlayer1[0][3];
    // Card 2 player 1
    document.getElementById("topx11").innerHTML = cardsOfPlayer1[1][0];
    document.getElementById("rightx11").innerHTML = cardsOfPlayer1[1][1]; 
    document.getElementById("bottomx11").innerHTML = cardsOfPlayer1[1][2]; 
    document.getElementById("leftx11").innerHTML = cardsOfPlayer1[1][3];
    // Card 3 player 1
    document.getElementById("topx12").innerHTML = cardsOfPlayer1[2][0];
    document.getElementById("rightx12").innerHTML = cardsOfPlayer1[2][1]; 
    document.getElementById("bottomx12").innerHTML = cardsOfPlayer1[2][2]; 
    document.getElementById("leftx12").innerHTML = cardsOfPlayer1[2][3];
    // Card 4 player 1
    document.getElementById("topx13").innerHTML = cardsOfPlayer1[3][0];
    document.getElementById("rightx13").innerHTML = cardsOfPlayer1[3][1]; 
    document.getElementById("bottomx13").innerHTML = cardsOfPlayer1[3][2]; 
    document.getElementById("leftx13").innerHTML = cardsOfPlayer1[3][3];
    // Card 5 player 1
    document.getElementById("topx14").innerHTML = cardsOfPlayer1[4][0];
    document.getElementById("rightx14").innerHTML = cardsOfPlayer1[4][1]; 
    document.getElementById("bottomx14").innerHTML = cardsOfPlayer1[4][2]; 
    document.getElementById("leftx14").innerHTML = cardsOfPlayer1[4][3];
    
    // ************************
    // Draw Cards of player Two
    // ************************
    
    // Card 1 player 2
    document.getElementById("topx20").innerHTML = cardsOfPlayer2[0][0];
    document.getElementById("rightx20").innerHTML = cardsOfPlayer2[0][1]; 
    document.getElementById("bottomx20").innerHTML = cardsOfPlayer2[0][2]; 
    document.getElementById("leftx20").innerHTML = cardsOfPlayer2[0][3];
    // Card 2 player 2
    document.getElementById("topx21").innerHTML = cardsOfPlayer2[1][0];
    document.getElementById("rightx21").innerHTML = cardsOfPlayer2[1][1]; 
    document.getElementById("bottomx21").innerHTML = cardsOfPlayer2[1][2]; 
    document.getElementById("leftx21").innerHTML = cardsOfPlayer2[1][3];
    // Card 3 player 2
    document.getElementById("topx22").innerHTML = cardsOfPlayer2[2][0];
    document.getElementById("rightx22").innerHTML = cardsOfPlayer2[2][1]; 
    document.getElementById("bottomx22").innerHTML = cardsOfPlayer2[2][2]; 
    document.getElementById("leftx22").innerHTML = cardsOfPlayer2[2][3];
    // Card 4 player 2
    document.getElementById("topx23").innerHTML = cardsOfPlayer2[3][0];
    document.getElementById("rightx23").innerHTML = cardsOfPlayer2[3][1]; 
    document.getElementById("bottomx23").innerHTML = cardsOfPlayer2[3][2]; 
    document.getElementById("leftx23").innerHTML = cardsOfPlayer2[3][3];
    // Card 5 player 2
    document.getElementById("topx24").innerHTML = cardsOfPlayer2[4][0];
    document.getElementById("rightx24").innerHTML = cardsOfPlayer2[4][1]; 
    document.getElementById("bottomx24").innerHTML = cardsOfPlayer2[4][2]; 
    document.getElementById("leftx24").innerHTML = cardsOfPlayer2[4][3];    
  }
