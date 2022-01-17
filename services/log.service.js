import chalk from 'chalk'
import dedent from "dedent-js";

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error)
}

const printSuccess = (message) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message)
}

const printHelp = () => {
    console.log(
        dedent(`${chalk.bgCyan(' HELP ')}
        Без параметров - вывод погоды
        -s [CITY] для установки города
        -h для вывода помощи
        -t [API_KEY] для сохранения токена
        `)
    )
}

const printWeather = (res, icon) => {
    console.log(
        dedent(`${chalk.bgBlueBright(' WEATHER ')}
        Город: ${res.name} 
        Погода: ${res.weather[0].description} ${icon}
        Температура: ${res.main.temp} F (ощущается как ${res.main.feels_like} F)
        Влажность: ${res.main.humidity}%`)
    )
}

export { printSuccess, printError, printHelp, printWeather }
