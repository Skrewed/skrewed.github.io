var msgDias, dumSemanas, dumTotalDias, dumDias, atualString, dumString, atualDate, dumDate, dumTempo, dia, mes, ano, ig, dataAtual, diaAtual, mesAtual, anoAtual, anoBi, igDias, totalDias, diaProv, mesProv, anoProv

function calcular() {

    //Entrada do usuário
    dia = Number(document.getElementById('dia').value)
    mes = Number(document.getElementById('mes').value)
    ano = Number(document.getElementById('ano').value)
    
    //Salva em variáveis data atual.
    dataAtual = new Date()
    anoAtual = dataAtual.getFullYear()
    diaAtual = dataAtual.getDate()
    mesAtual = dataAtual.getMonth() + 1

    //new Date pega data em inglês, então o mês precisou vir primeiro
    dumString = `"${mes.toString().padStart(2, "0")}/${dia.toString().padStart(2, "0")}/${ano}"`
    dumDate = new Date(dumString)

    if (dia == 0 || mes == 0 || ano == 0){
        alert('Preencha corretamente dia, mês e ano.')
    } else if (dia > 31 || dia < 0){
        alert('O dia deve ser entre 1 e 31.')
    } else if (mes > 12 || mes < 0) {
        alert('O mês deve ser entre 1 e 12.')
    } else if (ano.toString().length != 4 || ano < 0) {
        alert(`O ano deve ser completo. Exemplo: ${anoAtual}.`)
    } else if (dumDate > dataAtual || (dia == diaAtual && mes == mesAtual && ano == anoAtual)){
        alert(`A DUM deve ser anterior à data atual.`)
    } else {
        
        //Verifica se ano atual é bissexto, e sendo, anoBi recebe 1
        if (((anoAtual % 4 == 0) && (anoAtual % 100 != 0)) || (anoAtual % 400 == 0)){
            anoBi = 1
        } else{
            anoBi = 0
        }
    
        //Se ano bissexto, 'fev' recebe 29 dias
        if (anoBi == 1) {
            var fev = 29
        } else {
            var fev = 28
        }

        //subtrai o total de milisegundos entre uma data e outra
        dumTempo = dataAtual.getTime() - dumDate.getTime()
        //descobre quantos dias são esses milissegundos (tirei 12h (1/2 dia [43200000ms]). Assim, se passar do meio dia, a data atual conta como um dia na idade gestacional.
        dumTotalDias = ((dumTempo - 43200000) / (1000 * 3600 * 24)).toFixed(0)

        dumSemanas = Math.floor(dumTotalDias / 7)
        dumDias = (dumTotalDias % 7).toFixed(0)

        //Se o resto da divisão do total de dias por 7 for maior que 0, então será x Semana e x dias; do contrário, não precisa mostrar dias.
        if (dumDias > 0) {
            msgDias = ` e ${dumDias} dias.`
        } else {
            msgDias = '.'
        }

        //Se a DUM for em janeiro, fevereiro ou março, é somado 7 ao dia; e 9 ao mês e o ano deve ser mantido.
        if (mes == 1 || mes == 2 || mes == 3){
            diaProv = dia + 7
            mesProv = mes + 9
            anoProv = ano
                if (mesProv == 10 && diaProv > 31 ) { //Obs: se o dia somado ultrapassar 30 ou 31 (dependendo do mês), o saldo restante deverá ser considerado no mês seguinte. Se o somatório fosse dia 32/10/2018, por exemplo, a data provável do parto seria dia 01/11/2018.
                    diaProv = diaProv - 31
                    mesProv = mesProv + 1
                } else if (mesProv == 11 && diaProv > 30 ) {
                    diaProv = diaProv - 30
                    mesProv = mesProv + 1
                } else if (mesProv == 12 && diaProv > 31 ) {
                    diaProv = (diaProv - 31)
                    mesProv = 1
                    anoProv = anoProv + 1
                }
        } else { // Se a DUM for de abril a dezembro, é somado 7 ao dia; e subtraído 3 do mês e acrescentado 1 ao ano.
            diaProv = dia + 7
            mesProv = mes - 3
            anoProv = ano + 1
            if (mesProv == 1 && diaProv > 31) { //Obs: se o dia somado ultrapassar 30 ou 31 (dependendo do mês), o saldo restante deverá ser considerado no mês seguinte. Se o somatório fosse dia 32/10/2018, por exemplo, a data provável do parto seria dia 01/11/2018.
                diaProv = diaProv - 31
                mesProv = mesProv + 1
            } else if (mesProv == 2 && diaProv > fev ) {
                diaProv = diaProv - fev
                mesProv = mesProv + 1
            } else if (mesProv == 3 && diaProv > 31 ) {
                diaProv = diaProv - 31
                mesProv = mesProv + 1
            } else if (mesProv == 4 && diaProv > 30 ) {
                diaProv = diaProv - 30
                mesProv = mesProv + 1
            } else if (mesProv == 5 && diaProv > 31 ) {
                diaProv = diaProv - 31
                mesProv = mesProv + 1
            } else if (mesProv == 6 && diaProv > 30 ) {
                diaProv = diaProv - 30
                mesProv = mesProv + 1
            } else if (mesProv == 7 && diaProv > 31 ) {
                diaProv = diaProv - 31
                mesProv = mesProv + 1
            } else if (mesProv == 8 && diaProv > 31 ) {
                diaProv = diaProv - 31
                mesProv = mesProv + 1
            } else if (mesProv == 9 && diaProv > 30 ) {
                diaProv = diaProv - 30
                mesProv = mesProv + 1
            }
        }
        window.document.getElementById('igResultado').innerHTML = `${dumSemanas} semanas${msgDias}`
        window.document.getElementById('dppResultado').innerHTML = `${diaProv.toString().padStart(2,"0")}/${mesProv.toString().padStart(2,"0")}/${anoProv}`
    }
}