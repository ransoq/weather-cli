import { homedir } from 'os'
import { join } from 'path'
import { promises } from 'fs'
import {printError, printSuccess} from "./log.service.js";

const filePath = join(homedir(), 'weather-data.json')

const TOKEN_DATA = {
    token: 'token',
    city: 'city',
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('City is undefined')
    }
    try {
        await saveKeyValue(TOKEN_DATA.city, city)
        printSuccess('City has been saved!')
    } catch (e) {
        printError(e.message)
    }
}

const saveKeyValue = async (key, value) => {
    let data = {}

    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath)
        data = JSON.parse(file)
    }

    data[key] = value
    await promises.writeFile(filePath, JSON.stringify(data))
}

const getKeyValue = async (key) => {
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath)
        const data = JSON.parse(file)
        return data[key]
    }
    return undefined
}

const isExist = async (path) => {
    try {
        await promises.stat(path)
        return true
    } catch(e) {
        return false
    }
}

export { saveKeyValue, getKeyValue, saveCity, TOKEN_DATA }
