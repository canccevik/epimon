import { port, str, url } from 'envalid'
import { Static, makeValidators } from 'nestjs-envalid'

export const config = {
  PORT: port({ default: 3004 }),
  MINING_WALLET_SECRET_PHRASE: str(),
  ROOT_NODE_URI: url(),
  ROOT_SOCKET_URI: url(),
  LOCAL_API_URI: url()
}

export const validators = makeValidators(config)
export type Config = Static<typeof validators>
export const ENV = 'EnvalidModuleEnv'
