import {classAdd, classRemove} from './parallax'

const formMail = document.querySelector('.form-mail'),
  inputName = document.querySelector('.input-name'),
  inputMail = document.querySelector('.input-mail'),
  inputComment = document.querySelector('.input-comment'),
  formBnt = document.querySelector('.form-btn'),
  rexValidateMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/



formMail.addEventListener('submit', function (event) {
  event.preventDefault()
  let valueName = inputName.value
  let valueMail = inputMail.value
  let valueComment = inputComment.value
  if (valueName) {
    classRemove(inputName, 'error')
  }else classAdd(inputName,'error')
  if (valueMail){
    classRemove(inputMail, 'error')
    ValidateEmail(valueMail)
  } else classAdd(inputMail, 'error')
  if (valueComment){
    classRemove(inputComment, 'error')
  }else classAdd(inputComment,'error')

})

function ValidateEmail(mail) {
  if (rexValidateMail.test(mail))
  {
    classRemove(inputMail, 'error')
    return
  } else classAdd(inputMail, 'error')
  console.log('dsdj')
}
