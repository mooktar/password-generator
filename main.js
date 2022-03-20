const newPassword = document.querySelector('#new-password')
const copykeyEl = document.querySelector('.copykey')
const lengthEl = document.querySelector('#length')
const upperEl = document.querySelector('#uppercase')
const lowerEl = document.querySelector('#lowercase')
const numberEl = document.querySelector('#numbers')
const symbolEl = document.querySelector('#symbols')
const generateEL = document.querySelector('#generate')

copykeyEl.onclick = () => {
    const textarea = document.createElement('textarea')
    const password = newPassword.innerText

    if(!password) { return }

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password copied to clipboard!')
}

const getLower = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)
const getUpper = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65)
const getNumber = () => String.fromCharCode(Math.floor(Math.random() * 10) + 48)
const symbols = '!@#$%^&*(){}[]=<>/,.'
const getSymbol = () => symbols[Math.floor(Math.random() * symbols.length)]

function generatePassword () {
    const length = +lengthEl.value
    const hasUpper = upperEl.checked
    const hasLower = lowerEl.checked
    const hasNumber = numberEl.checked
    const hasSymbol = symbolEl.checked
    const count = hasLower + hasUpper + hasNumber + hasSymbol
    const items = [{hasUpper}, {hasLower}, {hasNumber}, {hasSymbol}].filter(i => Object.values(i)[0])
    
    if (count == 0) { return }
    
    let generatedPass = ''
    for (let i = 0; i < length; i += count) {
        items.forEach(item => {
            let type = Object.keys(item)
            generatedPass += type == 'hasUpper' 
                ? getUpper()
                : type == 'hasLower'
                    ? getLower()
                    : type == 'hasNumber'
                        ? getNumber()
                        : getSymbol();
        });
    }

    newPassword.innerHTML = generatedPass.slice(0, length)
}

generatePassword()

generateEL.onclick = generatePassword