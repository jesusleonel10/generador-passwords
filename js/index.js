/* Generamos una letra miniscula, mayuscula, un numero y un simbolo */
const getRandomLower = () => String.fromCharCode(Math.floor(Math.random()*26) + 97);
const getRandomUpper = () => String.fromCharCode(Math.floor(Math.random()*26) + 65);
const getRandomNumber = () => String.fromCharCode(Math.floor(Math.random()*10) + 48);
const getRandomSymbol = () => {
    const symbols = "!@#$%&*=+-/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

/* Objeto que contiene cada elemento generado de las funciones de arriba */
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

/* Funcion que recibe un string para ser mezclado en orden aleatorio y devolverlo*/
const mixPassword = (password) => {
    let num = password.length - 1
    for (let i=0; num > i; num--){
      let random = Math.floor(Math.random() * num)
      let aux = password[random]
      password[random] = password[num]
      password[num] = aux
    }
    return password.join("")
};

/* Generamos la contraseña recibiendo 5 parametros de los elementos que la conforman */
const generatePassword = (lower, upper, number, symbol, length) => {
    if(lower || upper || number || symbol) {
        let generatedPassword = "";
    
        const typesCount = lower + upper + number + symbol;
    
        /* Filtramos los valores que solo sean true, osea cuya casilla haya sido marcada */
        
        const typesArr = [{lower}, {upper}, {number}, {symbol}]
        .filter((item) => Object.values(item)[0])
    
    
        /* Iteramos sobre la longitud de la contraseña y la cantidad de opciones que marcaron */
        for (let i = 0; i < length; i += typesCount) {
            typesArr.forEach((type) => {
                const funcName = Object.keys(type)[0]; //Obtenemos la clave del objeto
                generatedPassword += randomFunc[funcName](); //Invocamos al objeto que contiene la misma clave y sumamos el valor a generatedPassword
            })
        }
        const finalPassword = mixPassword(generatedPassword.split("")).slice(0, length)  //Invocamos la funcion para que la clave sea mezclada, la pasamos como array
        return finalPassword;
    } else {
        alert("Debe seleccionar al menos una opcion")
        const text = "Selecciona alguna opción"
        return text
    }

};

/* Recibimos el valor de las casillas, si esta checked sumamos 21 al valor final */
const valueOptions = (...arguments) => {
    let valueTotal = 0
    for (let value of arguments) {
        if (typeof(value) === "boolean" && value) {
            valueTotal += 21
        } else if (Number(value)) {
            valueTotal += value
        }
    }
    return valueTotal
    
}

const generate = document.getElementById("GenerateBtn");

generate.addEventListener("click", () => {
    const level = document.getElementById("level___bar")
    const length = document.getElementById("PasswordLength").value;
    const hasUpper = document.getElementById("uppercase").checked;
    const hasLower = document.getElementById("lowercase").checked;
    const hasNumber = document.getElementById("numbers").checked;
    const hasSymbol = document.getElementById("symbols").checked;

    const checkboxs = document.getElementsByClassName("checkbox_options")
    
    
    document.getElementById("PasswordResult").value = generatePassword(
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        length
    );

    const levelSecurity = valueOptions(hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        parseInt(length))

    /* De acuerdo al valor final mostramos el nivel de seguridad cambiando el porcentaje del with y su color */
    if (levelSecurity < 30) {
        level.style.cssText = `width: ${levelSecurity}%; background-color: #F30D0D;`
    } else if (levelSecurity > 30 && levelSecurity <50) {
        level.style.cssText = `width: ${levelSecurity}%; background-color: #F38E0D;`
    } else if (levelSecurity > 50 && levelSecurity < 70) {
        level.style.cssText = `width: ${levelSecurity}%; background-color: #F3EC0D;`
    } else if (levelSecurity > 80) {
        level.style.cssText = `background-color: #3AF30D;`
        level.style.removeProperty('width')
    }
});

/* Para poder copiar al portapapeles */
const button = document.getElementById("ClipboardBtn");
button.addEventListener("click", (e) => {
    e.preventDefault();
    document.execCommand(
        "copy",
        false,
        document.getElementById("PasswordResult").select()
    )
    alert("Contraseña Copiada!")
});






