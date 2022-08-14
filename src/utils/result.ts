type PaginationType = {
  page: number
  total: number
  perPage: number
  pageCount: number
}
type DataType<T> = object | object[] | T
type ErrorType = { message: string }
type ResultType<T> = {
  data?: DataType<T>
  pagination?: PaginationType
  // status?: number
  error?: ErrorType
}

export class Result<T> {
  declare data?: DataType<T>
  declare pagination?: PaginationType
  // declare status?: number
  declare error?: ErrorType

  constructor(result?: ResultType<T>) {
    this.error = result?.error
    this.data = result?.data
    this.pagination = result?.pagination
    // this.status = result?.status
  }

  setData(data: DataType<T>) {
    this.data = data 
  }

  setError(error: string) {
    this.error = { message: error }
    // this.status = status
  }

  setPagination(pagination: PaginationType) {
    this.pagination = {
      ...pagination,
      pageCount: Math.ceil(pagination.total / pagination.perPage),
    }
  }
}
