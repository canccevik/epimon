import { port } from 'envalid'
import { Static, makeValidators } from 'nestjs-envalid'

export const config = {
  PORT: port({ default: 3003 })
}

export const validators = makeValidators(config)
export type Config = Static<typeof validators>
export const ENV = 'EnvalidModuleEnv'
