/* TODO: inserite il codice JavaScript necessario a completare il MHW! */


const userAnswers = {}; 


const boxes = document.querySelectorAll('.choice-grid div');
for (const box of boxes) {
    box.addEventListener('click', onBoxClick);
}

function resetQuiz(){
    for (const key in userAnswers) {
        delete userAnswers[key];
    }
    
    const notShow = document.querySelector('#result');
    notShow.classList.add('hidden');
    for (const box of boxes) {
        box.classList.remove('opacity');
        box.classList.remove('selected');
        box.addEventListener('click', onBoxClick);
        box.querySelector('.checkbox').src = "images/unchecked.png";
    }

}
function chooseResult(){
  
    if(userAnswers.two === userAnswers.three)
        return userAnswers.two;
    return userAnswers.one;
}

function showResult(key){
    console.log(RESULTS_MAP[key]);
    const show = document.querySelector('#result');
    show.querySelector('h1').textContent = RESULTS_MAP[key].title;
    show.querySelector('p').textContent = RESULTS_MAP[key].contents;
    show.classList.remove('hidden');
    const button = document.querySelector('#button');
    button.addEventListener('click',resetQuiz);
}

function opacity(selected){
    
    const userAnswerId = selected.dataset.choiceId;
    
    const answers = selected.parentNode.querySelectorAll('div');
    for (const ans of answers) {
        if(ans.dataset.choiceId !== userAnswerId){
            ans.classList.add('opacity');
            ans.querySelector('.checkbox').src = "images/unchecked.png";
            ans.classList.remove('selected');
        }
    }
}

function onBoxClick(event){
    
    
    const box = event.currentTarget;
    
    box.querySelector('.checkbox').src = "images/checked.png";
    
    box.classList.add('selected');
    
    box.classList.remove('opacity');
    opacity(box);
    
    userAnswers[box.dataset.questionId] = box.dataset.choiceId;
    console.log(userAnswers)
    
    
    if(userAnswers.one && userAnswers.two && userAnswers.three){
        for (const box of boxes) {
            box.removeEventListener('click',onBoxClick);
        }
        
        showResult(chooseResult());
    }
}


