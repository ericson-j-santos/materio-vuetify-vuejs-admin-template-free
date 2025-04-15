// src/services/tools.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { appStore } from '../store/app'
import { useClipboard } from '@vueuse/core'
import { ref } from 'vue'
const source = ref('Hello')
const { copy, copied, isSupported } = useClipboard({ source })

export const toolsStore = defineStore('tools', {
    state: () => ({
        app: appStore(),
        rules: {
            cpf() {
                return v => (v ? v.length <= 14 : true) || 'CPF deve conter 14 dígitos!'
            }
        },
        gets: [],
    }),
    actions: {
        copiarTexto(texto) {
            copy(texto)
            this.app.notificar(`${texto} copiado!`)
        },
        fmtNum(v) {
            if (!v) return
            return v.toString().replaceAll(/[^0-9]/g, "")

            // Descrição: Remove todos os caracteres não numéricos de uma string.
            //     Exemplo: 
            // toolsStore.fmtNum("123-456.789"); // Retorna "123456789"
        },
        fmtData(date) {
            if (!date) return ''
            let [ano, mes, dia] = [date.substring(0, 4), date.substring(5, 7), date.substring(8, 10)]
            if (date.length == 8)
                [ano, mes, dia] = [date.substring(0, 4), date.substring(4, 6), date.substring(6, 8)]
            return `${dia}/${mes}/${ano}`

            // Descrição: Formata uma data no formato YYYY - MM - DD ou YYYYMMDD para DD / MM / YYYY.
            //     Exemplo:
            // toolsStore.fmtData("2025-03-18"); // Retorna "18/03/2025"
            // toolsStore.fmtData("20250318");   // Retorna "18/03/2025"
        },
        fmtEpoch(epoch) {
            const data = new Date(epoch)
            const anoAtual = data.getFullYear().toString().padStart(4, 0)
            const mesAtual = (data.getMonth() + 1).toString().padStart(2, 0)
            const diaAtual = data.getDate().toString().padStart(2, 0)
            return `${diaAtual}-${mesAtual}-${anoAtual} ${data.getHours().toString().padStart(2, '0')}:${data.getMinutes().toString().padStart(2, '0')}h`

            // Descrição: Converte um timestamp Unix(epoch) para uma string de data e hora no formato DD - MM - YYYY HH: MMh.
            //     Exemplo:
            // toolsStore.fmtEpoch(1679030400000); // Retorna "18-03-2023 00:00h"

        },
        currentTime() {
            const dt = new Date()
            return `${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`

            // Descrição: Retorna a hora atual no formato HH: MM: SS.
            //     Exemplo:
            // toolsStore.currentTime(); // Retorna algo como "14:30:45"
        },
        fmtCPF(cpf) {
            if (!cpf) return ''
            cpf = this.fmtNum(cpf).padStart(11, 0)
            const [part1, part2, part3, part4] = [
                cpf.substring(0, 3),
                cpf.substring(3, 6),
                cpf.substring(6, 9),
                cpf.substring(9, 11),
            ]
            return `${part1}.${part2}.${part3}-${part4}`

            // Descrição: Formata um número de CPF para o formato XXX.XXX.XXX - XX.
            //     Exemplo
            // toolsStore.fmtCPF("12345678901"); // Retorna "123.456.789-01"
        },
        fmtDataHoraAtualizacao(data) {
            if (data)
                return `${data.substring(8, 10)}/${data.substring(5, 7)}/${data.substring(0, 4)} ${data.substring(11, 16)}h`

            // Descrição: Formata uma string de data no formato YYYY - MM - DDTHH: MM:SS para DD / MM / YYYY HH: MMh.
            //     Exemplo
            // toolsStore.fmtDataHoraAtualizacao("2025-03-18T14:30:00"); // Retorna "18/03/2025 14:30h"

        },
        fmtDateTimeAPI(dateTime) {
            if (!dateTime) return null

            const [ano, mes, dia, time] = [
                dateTime.substring(0, 4),
                dateTime.substring(5, 7),
                dateTime.substring(8, 10),
                dateTime.substring(11, 19),
            ]
            return `${dia}/${mes}/${ano} ${time}`

            // Descrição: Formata uma string de data e hora no formato YYYY - MM - DDTHH: MM:SS para DD / MM / YYYY HH: MM: SS.
            //     Exemplo:
            // toolsStore.fmtDateTimeAPI("2025-03-18T14:30:00"); // Retorna "18/03/2025 14:30:00"
        },
        fmtHoje() {
            const dataHojeCompleta = new Date()
            const anoAtual = dataHojeCompleta.getFullYear().toString().padStart(4, 0)
            const mesAtual = (dataHojeCompleta.getMonth() + 1).toString().padStart(2, 0)
            const diaAtual = dataHojeCompleta.getDate().toString().padStart(2, 0)
            return `${anoAtual}-${mesAtual}-${diaAtual}`

            // Descrição: Retorna a data atual no formato YYYY - MM - DD.
            //     Exemplo
            // toolsStore.fmtHoje(); // Retorna algo como "2025-03-18"
        },
        fmtHoje(comHifen = true) {
            const hoje = new Date()
            const dia = String(hoje.getDate()).padStart(2, '0')
            const mes = String(hoje.getMonth() + 1).padStart(2, '0') // Janeiro é 0!
            const ano = hoje.getFullYear()

            return comHifen ? `${ano}-${mes}-${dia}` : `${dia}/${mes}/${ano}`
        },


        fmtDinheiro(valor) {
            if (!valor) return ''
            if (typeof valor == 'string')
                valor = parseFloat(valor.replaceAll(",", "."))
            let locale = 'pt-BR'
            let options = { style: 'currency', currency: 'brl', minimumFractionDigits: 2, maximumFractionDigits: 2 }
            let formatter = new Intl.NumberFormat(locale, options)
            return formatter.format(valor).replace("R$", "").trim()

            // Descrição: Formata um valor numérico para uma string de moeda brasileira(R$).
            //     Exemplo
            // toolsStore.fmtDinheiro(1234.56); // Retorna "1.234,56"
            // toolsStore.fmtDinheiro("1234,56"); // Retorna "1.234,56"
        },
        valNumRepetidos(valor) {
            for (i = 0; i < 10; i++) {
                if (valor.replaceAll(i, "") == "")
                    return true
            }
            return false

            // Descrição: Verifica se um valor contém números repetidos.
            //     Exemplo
            // toolsStore.valNumRepetidos("11111111111"); // Retorna true
            // toolsStore.valNumRepetidos("12345678901"); // Retorna false
        },
        dadosContratoNumerico(contrato) {
            return contrato.replace(/[./]/g, '')

            // Descrição: Remove caracteres não numéricos de um contrato.
            //     Exemplo
            // toolsStore.dadosContratoNumerico("12.345.678/0001-90"); // Retorna "12345678000190"
        },
        formatDataAPI(date) {
            if (!date) return ''
            const [ano, mes, dia] = [date.substring(0, 4), date.substring(5, 7), date.substring(8, 10)]
            return `${dia}/${mes}/${ano}`

            // Descrição: Formata uma data no formato YYYY - MM - DD para DD / MM / YYYY.
            //     Exemplo
            // toolsStore.formatDataAPI("2025-03-18"); // Retorna "18/03/2025"
        },
        formatDataInput(data) {
            return `${data.substring(6, 10)}-${data.substring(3, 5)}-${data.substring(0, 2)}`

            // Descrição: Formata uma data no formato DD / MM / YYYY para YYYY - MM - DD.
            //     Exemplo
            // toolsStore.formatDataInput("18/03/2025"); // Retorna "2025-03-18"
        },
        formatarData(data) {
            const [ano, mes, dia] = data.split('-');
            const dateObj = new Date(ano, mes - 1, dia, 12, 0);

            return dateObj.toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            });


            // Descrição: Formata uma data no formato YYYY - MM - DD para uma string de data legível em português.
            //     Exemplo
            // toolsStore.formatarData("2025-03-18"); // Retorna "18 de mar. de 2025"

        },
        fmtValorComUnidadeAbs(valor) {
            if (valor == null || isNaN(valor)) return ''
            const abs = Math.abs(valor)
            const units = [
                [1e12, 'T'],
                [1e9, 'B'],
                [1e6, 'M'],
                [1e3, 'k']
            ]
            for (const [unit, symbol] of units) {
                if (abs >= unit) {
                    // Para "k": se o valor for menor que 10.000, usa uma casa decimal; senão, zero casas.
                    const dec = symbol === 'k' ? (abs < unit * 10 ? 1 : 0) : 1
                    return (valor / unit).toFixed(dec) + symbol
                }
            }
            return valor.toString()

            /* Descrição:
               - Valores abaixo de 1.000 são retornados sem formatação.
               - Valores entre 1.000 e 9.999 exibem uma casa decimal e recebem o sufixo "k" (ex.: 1500 -> "1.5k").
               - Valores entre 10.000 e 999.999 são arredondados sem casas decimais e recebem "k" (ex.: 25000 -> "25k").
               - Valores entre 1.000.000 e 999.999.999 são formatados com uma casa decimal e recebem "M".
               - Valores entre 1.000.000.000 e 999.999.999.999 usam "B".
               - Valores maiores ou iguais a 1.000.000.000.000 usam "T".
          
               Exemplos:
               toolsStore.fmtValorComUnidade(850);         // "850"
               toolsStore.fmtValorComUnidade(1500);        // "1.5k"
               toolsStore.fmtValorComUnidade(25000);       // "25k"
               toolsStore.fmtValorComUnidade(1250000);     // "1.3M"
               toolsStore.fmtValorComUnidade(2500000000);  // "2.5B"
            */
        },
        fmtValorComUnidadeNaoAbs(valor) {
            if (valor == null || isNaN(valor)) return ''

            const units = [
                [1e12, 'T'],
                [1e9, 'B'],
                [1e6, 'M'],
                [1e3, 'k']
            ]
            // Itera pelas escalas; para valores negativos, a condição é aplicada para valor <= -unit
            for (const [unit, symbol] of units) {
                if (valor >= unit || valor <= -unit) {
                    // Para "k": se o valor estiver entre -10.000 e 10.000, usa 1 casa decimal; caso contrário, nenhuma.
                    const dec = (valor < unit * 10 && valor > -unit * 10) ? 1 : 1
                    // Se preferir que para "k" valores maiores ou iguais a 10.000 não tenham casas decimais,
                    // basta alterar para: const dec = (valor < unit * 10 && valor > -unit * 10) ? 1 : 0
                    return (valor / unit).toFixed(dec) + symbol
                }
            }
            // Se o valor for menor que 1.000 (em módulo), preserva os centavos se houver
            return Number.isInteger(valor) ? valor.toString() : valor.toFixed(2)

            /* Descrição:
               - Valores com módulo menor que 1.000 são retornados com duas casas decimais se não forem inteiros.
               - Para valores com módulo maior ou igual a 1.000, a função divide pelo fator da escala e mantém o sinal original,
                 preservando os centavos conforme o número original.
                 
               Exemplos:
               toolsStore.fmtValorComUnidade(850);           // "850" ou "850.00" (se preferir exibir centavos)
               toolsStore.fmtValorComUnidade(1500.55);         // "1.5k" (ou "1.50k" se ajustado)
               toolsStore.fmtValorComUnidade(-1500.55);        // "-1.5k"
               toolsStore.fmtValorComUnidade(25000.99);         // "25k" ou "25.00k" conforme a definição de casas decimais
               toolsStore.fmtValorComUnidade(1250000.75);       // "1.3M" (preservando a parte decimal do valor)
               toolsStore.fmtValorComUnidade(-2500000000.99);   // "-2.5B"
            */
        }
    }
})
