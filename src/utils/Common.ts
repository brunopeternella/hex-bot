import { COMMAND_NOT_FOUND } from './PredefinedTexts';
import { IRegion } from '../interfaces/IRegion';
import { Regions } from './Regions';
import { COMMANDS } from './Commands';

export function getTextByCommand(command: string): string{
    const _command = COMMANDS.find(obj => obj.command === command)

    if(_command === undefined)
        return COMMAND_NOT_FOUND

    return _command.text
}

export function isValidRegion(region: string): boolean {
    let hasRegion = false

    Regions.forEach((element: IRegion) => {
        if(element.region === region){
            hasRegion = true
            return
        }
    });

    if(!hasRegion)
        return false

    return true
}

export function getCompleteUrl(region: string, endpoint: string): string {
    return `https://${region}.api.riotgames.com${endpoint}`
}
