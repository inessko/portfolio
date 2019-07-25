import {classAdd, classRemove} from './parallax'

const inputName = document.querySelector('.input-name'),
  inputMail = document.querySelector('.input-mail'),
  inputComment = document.querySelector('.input-comment'),
  formBnt = document.querySelector('.form-btn')

formBnt.addEventListener('click', function (event) {
  event.preventDefault()
  let valueName = inputName.value
  let valueMail = inputMail.value
  let valueComment = inputComment.value
  if (!valueName) {
    classAdd(inputName, 'error')
  }else classRemove(inputName,'error')
  if (!valueMail){
    classAdd(inputMail, 'error')
  } else classRemove(inputMail,'error')
  if (!valueComment){
    classAdd(inputComment, 'error')
  }else classRemove(inputComment,'error')
  console.log(event)

})


function ValidateEmail(mail)
{
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))
  {
    return (true)
  }
  alert("You have entered an invalid email address!")
  return (false)
}
