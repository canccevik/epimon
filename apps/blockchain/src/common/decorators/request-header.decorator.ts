import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { Request } from 'express'

export const RequestHeader = createParamDecorator(
  (propertyKey: string, context: ExecutionContext) => {
    const { headers } = context.switchToHttp().getRequest<Request>()
    return { [propertyKey]: headers[propertyKey] }
  }
)
