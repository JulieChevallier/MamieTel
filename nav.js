const getRow = document.getElementsByClassName("selectionable");
let elementSelected = 1;
let activedArrow = false;
const windowBox = document.getElementById("screen");
//en réalité l'historique est complètement buggé
var historic = ['accueil.html'];
var pointeurHistoric=0;

var wordLength =0;
var wordEnteredReverse ="";
var copyWord="";
var firstTimeEnter=true;
var wordEntered = "";
var charList;



function deletePoints(word){
    let wordCopy="";
    for(var i=0;i<word.length;i++){
        if(word[i]!="." & word[i]!=" "){
            wordCopy+=word[i];
        }else if(word[i]==" "){
            wordCopy+="+";
        }
    }
    word = wordCopy;
    return word;
}

function displayWord(word){
    for(var i=0;i<word.length;i++){
        charList[i].innerHTML=word[i];
    }
}

function resetPage(){
    elementSelected = 1;
    activedArrow = false;
    wordEntered ="";
}


function nav(event){
    if(event.key=="ArrowUp"){
        if(elementSelected>1){
            elementSelected--;
            activedArrow=true;
            for(let i=0; i<getRow.length;i++){
                getRow[i].classList.remove("selected");
            }
            getRow[elementSelected-1].classList.add("selected");
        }
    }else if(event.key=="ArrowDown"){
        if(elementSelected<getRow.length){
            elementSelected++;
            activedArrow=true;
            for(let i=0; i<getRow.length;i++){
                getRow[i].classList.remove("selected");
            }
            getRow[elementSelected-1].classList.add("selected");
        }
    }else if(event.key=="Enter"){
        if(activedArrow){
            goToNotice(getRow[elementSelected-1].getAttribute("href"));
        }else{
            goToNotice(getRow[1].getAttribute("href"));
        }
    }
    if(document.getElementById("input").classList[1]=="selected"){
        if(firstTimeEnter){
            charList = document.getElementsByClassName("char");
            for(var i=0;i<charList.length;i++){
                wordEntered+=".";
            }
            firstTimeEnter=false;
        }else{
            if(event.key!="ArrowDown" & event.key!="ArrowUp" & event.key!="ArrowRight" & event.key!="ArrowLeft" & event.key!="Backspace" & wordLength<=document.getElementsByClassName("char").length & event.key!="Shift" & event.key!="Tab"){
                
                copyWord="";
                for(var i=0;i<wordEntered.length;i++){
                    if(wordLength==i){
                        copyWord+=event.key;
                    }else{
                        copyWord+=wordEntered[i];
                    }
                }
                wordEntered = copyWord;
                
                wordLength++;
                displayWord(wordEntered);
            }
            if(event.key=="Backspace" & wordLength>=0){
                copyWord="";
                for(var i=0;i<wordEntered.length;i++){
                    if(wordLength-1==i){
                        copyWord+=".";
                    }else{
                        copyWord+=wordEntered[i];
                    }
                }
                wordEntered = copyWord;
                wordLength--;
                displayWord(wordEntered);
            }
        }
    }
    if(document.getElementById("button").classList[1]=="selected" & event.key=="Enter"){
        wordEnteredReverse="";
        for(var i=0;i<wordEntered.length;i++){
            wordEnteredReverse=wordEnteredReverse+wordEntered[wordEntered.length-1-i];
        }
        if(deletePoints(wordEntered)=="Monique"){
            goToNotice("rose.html");
        }else{
            document.location.href='https://www.google.com/search?q='+deletePoints(wordEntered);
        }
        
    }
}

//Système de redirection asynchrone

function goToNotice(namePage){
    console.log(historic);
    if(pointeurHistoric<0){
        pointeurHistoric=0;
    }
    if(namePage=="previous"){
        
        fetch(historic[pointeurHistoric])
        .then(function(response) {
            return response.text();
        })
        .then(function(data) {
            //historic.push(historic[pointeurHistoric]);
            windowBox.innerHTML=data;
            resetPage();
            pointeurHistoric--;
        });
    }else{
        fetch(namePage)
        .then(function(response) {
            return response.text();
        })
        .then(function(data) {
            pointeurHistoric++;
            historic.splice(pointeurHistoric,0,namePage);
            
            windowBox.innerHTML=data;
            resetPage();
        });
    }
}