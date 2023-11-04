import { port, str, num } from 'envalid'
import { Static, makeValidators } from 'nestjs-envalid'

export const config = {
  PORT: port({ default: 3001 }),
  GLOBAL_PREFIX: str({ default: 'api' }),
  DATABASE_URI: str(),
  OWNER_WALLET_SECRET_PHRASE: str(),
  OWNER_WALLET_INITIAL_BALANCE: num({ default: 10000 }),
  MINING_REWARD: num({ default: 100 })
}

export const validators = makeValidators(config)
export type Config = Static<typeof validators>
export const ENV = 'EnvalidModuleEnv'
