import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Response } from 'express'
import { Observable, map } from 'rxjs'
import { Message } from '../decorators'
import { Payload } from '../interfaces'

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Payload<T>> {
  constructor(private readonly reflector: Reflector) {}

  public intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Payload<T>> {
    return next.handle().pipe(map((data) => this.transformResponse(data, context)))
  }

  private transformResponse<T>(data: T, context: ExecutionContext): Payload<T> {
    const handler = context.getHandler()
    const message = this.reflector.get(Message, handler)
    const { statusCode } = context.switchToHttp().getResponse<Response>()

    return { message, statusCode, data }
  }
}
