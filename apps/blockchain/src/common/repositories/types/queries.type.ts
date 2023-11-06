import { Document, HydratedDocument, IfAny, Query, Require_id, UpdateWriteOpResult } from 'mongoose'

export type CreateResult<T> = HydratedDocument<T>

export type InsertManyResult<T> = IfAny<T, {}, Document<unknown, {}, T> & Require_id<T>>[]

export type FindAllResult<T> = Query<HydratedDocument<T>[], HydratedDocument<T>>

export type FindResult<T> = Query<HydratedDocument<T> | null, HydratedDocument<T>, object, T>

export type UpdateResult<T> = Query<UpdateWriteOpResult, HydratedDocument<T>, object, T>

export type DeleteResult<T> = Query<
  { ok?: number | undefined; n?: number | undefined } & {
    deletedCount?: number | undefined
  },
  HydratedDocument<T>,
  object,
  T
>
