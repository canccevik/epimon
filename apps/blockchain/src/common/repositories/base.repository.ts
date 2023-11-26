import { FilterQuery, Model, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose'
import {
  CreateResult,
  DeleteResult,
  FindAllResult,
  FindResult,
  InsertManyResult,
  UpdateResult
} from './types/queries.type'
import { PaginationResult, PaginationDto } from '@epimon/common'

export class BaseRepository<T> {
  constructor(private readonly model: Model<T>) {}

  public async create(object: Partial<T>): Promise<CreateResult<T>> {
    return this.model.create(object)
  }

  public async insertMany(objects: T[]): Promise<InsertManyResult<T>> {
    return this.model.insertMany(objects)
  }

  public find(query: FilterQuery<T>): FindAllResult<T> {
    return this.model.find(query)
  }

  public findById(id: string): FindResult<T> {
    return this.model.findById(id)
  }

  public findByIdAndDelete(id: string): FindResult<T> {
    return this.model.findByIdAndRemove(id)
  }

  public findByIdAndUpdate(
    id: string,
    update: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): FindResult<T> {
    return this.model.findByIdAndUpdate(id, update, { new: true })
  }

  public findOne(filter: FilterQuery<T>): FindResult<T> {
    return this.model.findOne(filter)
  }

  public findOneAndDelete(filter: FilterQuery<T>): FindResult<T> {
    return this.model.findOneAndDelete(filter)
  }

  public findOneAndUpdate(
    filter: FilterQuery<T>,
    update: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): FindResult<T> {
    return this.model.findOneAndUpdate(filter, update, { new: true })
  }

  public updateMany(
    filter: FilterQuery<T>,
    object: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): UpdateResult<T> {
    return this.model.updateMany(filter, object, { new: true })
  }

  public updateOne(
    query: FilterQuery<T>,
    object: UpdateWithAggregationPipeline | UpdateQuery<T>
  ): UpdateResult<T> {
    return this.model.updateOne(query, object)
  }

  public deleteMany(filter: FilterQuery<T>): DeleteResult<T> {
    return this.model.deleteMany(filter)
  }

  public deleteOne(filter: FilterQuery<T>): DeleteResult<T> {
    return this.model.deleteOne(filter)
  }

  public async paginate({ page, limit }: PaginationDto): Promise<PaginationResult<T>> {
    let query = this.model.find()

    if (page && limit) {
      query = query.skip((page - 1) * limit)
    }
    if (limit) {
      query = query.limit(limit)
    }

    const records = (await query.exec()) as T
    const totalRecords = await this.model.find().countDocuments()
    const lastPage = Math.ceil(totalRecords / limit)
    const previousPage = page > 1 ? page - 1 : null
    const nextPage = page < lastPage ? page + 1 : null

    return {
      records,
      lastPage,
      previousPage,
      nextPage,
      totalRecords,
      currentPage: page,
      pageSize: limit
    }
  }
}
