import { port, str } from 'envalid'
import { Static, makeValidators } from 'nestjs-envalid'

export const config = {
  PORT: port({ default: 3003 }),
  GLOBAL_PREFIX: str({ default: 'api' }),
  ROOT_NODE_URI: str()
}

export const validators = makeValidators(config)
export type Config = Static<typeof validators>
export const ENV = 'EnvalidModuleEnv'
