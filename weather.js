import { getArgs } from './helpers/args.js'
import { printHelp, printSuccess, printError, printWeather } from "./services/log.service.js";
import { getKeyValue, saveCity, saveKeyValue, TOKEN_DATA } from "./services/storage.service.js";
import {getIcon, getWeather} from "./services/api.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError('Token is undefined')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DATA.token, token)
        printSuccess('Токен сохранен!')
    } catch(error) {
        printError(error)
    }
}

const getForecast = async () => {
    try {
        const city = await getKeyValue(TOKEN_DATA.city)
        const weather = await getWeather(city)
        printWeather(weather, getIcon(weather.weather[0].icon))
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('City is undefined')
        } else if (e?.response?.status === 401) {
            printError('Token is undefined')
        } else {
            printError(e.message)
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        return printHelp()
    }
    if (args.s) {
       return saveCity(args.s)
    }
    if (args.t) {
        return saveToken(args.t)
    }
    return getForecast()
}

initCLI()
