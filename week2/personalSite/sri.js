const name = document.getElementById('name');
const number = document.getElementById('number');
const message = document.getElementById('message');
const form = document.getElementById('submit-form');
const btn = document.getElementById('btn');
const email = document.getElementById('email');

const loading = document.getElementById('loading');



const nameL = document.getElementById('name-l');
const numberL = document.getElementById('number-l');
const messageL = document.getElementById('messageL');

let val = 0;

loading.style.display = 'none';

form.addEventListener('submit',(e) => {
    if(name.value === ''){
        nameL.innerText = "Name cannot be empty"
    }else if(!isNaN(name.value) ){
        nameL.innerText =  "Name should be alphabets"
    }else {
        nameL.innerText = ''
    }

    if(number.value.length > 10 || number.value.length <10){
        numberL.innerText = "Number should be a 10 digit number";
    }else {
        numberL.innerText = ''
    }

    if(message.value === ''){
        messageL.innerText = "This field cannot be empty";
    }else {
        messageL.innerText = ''
    }

    if(name.value === '' || !isNaN(name.value) || (number.value.length > 10 || number.value.length <10) || message.value === ''){
        val = 1
    }else {
        val = 0
    }

    
    console.log(val);


if (val == 0) {
        $.ajax({
            url:"https://script.google.com/macros/s/AKfycbzdiU07eAZ5FJw9BrlrN0c1TYEuFTrruLCbMf7T2zTgSpggppM0S9fc-zQOIIEaYXT8/exec",
            data:$("#submit-form").serialize(),
            method:"post",
            success:function (response){
                
                loading.style.display = 'flex'
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
                //window.location.href="https://google.com"
            },
            error:function (err){
                alert("Something Error")

            }
        })
}
      
})



