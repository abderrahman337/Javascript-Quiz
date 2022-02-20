
// const first_btn = document.querySelector(".first-btn ");
// const general_rols = document.querySelector(".general-rols "); 
// const exist_btn = general_rols.querySelector(".button .btn-exist")
// const start_btn = document.querySelector(".button .btn-start");
// const question_list = document.querySelector(".questions")
// const exist = document.querySelector(".btn-exist ");
// const next = document.querySelector(" .btn-start ")

// first_btn.onclick = ()=>{
//       general_rols.classList.add("activegeneral"); //show info box
//       }
//       // show question
//       // const continue_btn = question_list.querySelector(".btn-start")
     

// // next.onclick=()=>{
// //       general_rols.classList.add("activequestion")
      
// // }


// //here fine/////////////////////
// start_btn.onclick = ()=>{
//       general_rols.classList.remove("activegeneral")
//       question_list.classList.add("activequestion")
//       showquestion(0);
// }
// // let's getting all of this question
// // variable declaration
// let counter
// let que_count= 0;
// let que_numb=1;
// const question_text = document.querySelector(".question_list");

// const list_que = document.querySelector(".question-list")
// function showquestion(index){
     
//       let que_tag =  '<span>' + quiz[index].numb +'.'+ quiz[index].question+'<span>' ;
//       let list_tag = '<div class="option"> '+ quiz[index].options[0] + '<span></span></div>'
//                         + '<div class="option">'+ quiz[index].options[1] + '<span></span></div>'
//                         + '<div class="option">'+ quiz[index].options[2] + '<span></span></div>'
//                         + '<div class="option">'+ quiz[index].options[3] + '<span></span></div>';
//       question_list.innerHTML = que_tag;
//       list_que.innerHTML = list_tag;
// }
//declaration des variable
const start_btn = document.querySelector(".first-btn")
const general_rolls=document.querySelector(".general-rols")
const continu =general_rolls.querySelector(".btn-start")
const next_que = document.querySelector(" .next_que")
const quiz_que= document.querySelector(".questions")
const result_quiz = document.querySelector(".result")
const text_point = quiz_que.querySelector(".text")
const exist_btn = quiz_que.querySelector(".btn-exist")
// const exist_btn = document.querySelector(".btn-exist")
const que_list = document.querySelector(".question-list");
const time_out = quiz_que.querySelector(".seconds")
const time_line = quiz_que.querySelector(".time_line")
const exist_quiz = result_quiz.querySelectorAll(".next-btn .btn-exist")
const restart_quiz = result_quiz.querySelector(".next-btn .btn-start")
const score_Result = result_quiz.querySelector(".text")
const time_off = quiz_que.querySelector(".time_left")


start_btn.onclick=()=>{
      general_rolls.classList.add("activegeneral")
}
continu.onclick=()=>{
      general_rolls.classList.remove("activegeneral")
      quiz_que.classList.add("activequestion")
      quizQuestion(0)
      getpoints(1)
      StartTime(15)
      StartLine(0)
}
restart_quiz.onclick=()=>{
      result_quiz.classList.remove("activeresult")
      quiz_que.classList.add("activequestion")
      quizQuestion(0)
}
exist_btn.onclick=()=>{
      window.location.reload()
}
exist_quiz.onclick=()=>{
      window.location.reload()
}
let que_count = 0;
let count = 1 ;
let que_point = 1;
let counter;
let Time_value = 15
let counterLine
let widthvalue = 0
let userscore = 0
next_que.onclick=()=>{
      if(que_count < quiz.length -1 )
      {
            que_count++;
            que_point++;
            quizQuestion(que_count);
            getpoints(que_point);
            clearInterval(counter)
            StartTime(Time_value)
            clearInterval(counterLine)
            StartLine(widthvalue)
            next_que.style.display ="none"

      }else{
            console.log("test completed")
            ResultQuiz() 
      }  
}
function quizQuestion(index){
      const que_text= document.querySelector(".question_text");
      let que_tag= '<span>'+ quiz[index].numb +'.'+quiz[index].question+'<span>'
      let que_lists = '<div class="option"><span>'+quiz[index].options[0]+'</span></div>'
                  + '<div class="option"><span>'+quiz[index].options[1]+'</span></div>'
                  + '<div class="option"><span>'+quiz[index].options[2]+'</span></div>'
                  + '<div class="option"><span>'+quiz[index].options[3]+'</span></div>';                  
      que_text.innerHTML=que_tag;
      que_list.innerHTML= que_lists;
      const option_list = que_list.querySelectorAll(".option")
      for(i=0 ; i< option_list.length ; i++)
      {
            option_list[i].setAttribute("onclick","optionSelected(this)")
      }
}
function getpoints(index){
      const text_point = quiz_que.querySelector(".text")
      let Totale = '<span><p><b>'+ index +'</b> of <b>'+ quiz.length +'</b> questions </p></span>'
      text_point.innerHTML = Totale
}
let icon_cor = '<div class="icon-true"><i class="fas fa-check"></i></div>'
let icon_false = ' <div class="icon-fals"><i class="fas fa-times"></i></div>'
function optionSelected(answer)
{
      clearInterval(counter)
      StartTime(Time_value)
      clearInterval(counterLine)
      let userans = answer.textContent
      let correctanswer = quiz[que_count].answer
      let alloption = quiz_que.children.length
      if(userans == correctanswer)
      {
            userscore+=1;
            console.log(userscore)
            console.log("correct answer")
            answer.classList.add("correct")
            answer.insertAdjacentHTML("beforeend",icon_cor)
      }
      else{
            console.log("ansewr false")
            answer.classList.add("incorrect")
            answer.insertAdjacentHTML("beforeend",icon_false)
      }
      for(let i=0 ; i< alloption; i++ )
      {
            if(que_list.children[i].textContent==correctanswer)
            {
                  que_list.children[i].setAttribute("class", "option correct ")
                  que_list.children[i].insertAdjacentHTML("beforeend",icon_cor)
            }

      }
      for(let i=0 ; i < alloption ;i++)
      {
            que_list.children[i].classList.add("disabled")
      }
      next_que.style.display ="block"
}
function StartTime(time){
      counter = setInterval(Timer, 1000)
      function Timer(){
            time_out.textContent = time
            time--
            // if(time > 9)
            // {
            //       let addzero = counter.textContent
            //       time_out.textContent = "0"+addzero
            // }
            if(time < 0)
            {
                  time_out.textContent = "00"
                  time_off.textContent = "Time Off  "
            }
      }
}
function StartLine(time){
      counterLine = setInterval(timer , 29)
      function timer(){
            time +=1;
            time_line.style.width = time +"px"
            if(time > 549)
            {
                  clearInterval(counterLine)
            }
      }
}
// result function
function ResultQuiz(){
      quiz_que.classList.remove("activegeneral")
      quiz_que.classList.remove("activequestion")
      result_quiz.classList.add("activeresult")
      if(userscore > 3)
      {
            let scoreTag = '<span><p></p> Perfect 😀you got  <b>'+ userscore+'</b> out of <b>'+quiz.length+' </b></p></span>'
            score_Result.innerHTML = scoreTag
      }else if(userscore > 1)
      {
            let scoreTag = '<span><p></p> Nice work!😎you got  <b>'+ userscore+'</b> out of <b>'+quiz.length+'</b></p></span>'
            score_Result.innerHTML = scoreTag
      }else{
            let scoreTag = '<span><p></p> bed work 🤮,try again! you got only  <b>'+ userscore+'</b> out of <b>'+quiz.length+'</b></p></span>'
            score_Result.innerHTML = scoreTag
      }

}








