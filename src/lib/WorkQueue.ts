export type HandlerFunction<T> = (workQueue: WorkQueue<T>, item: T) => void

export default class WorkQueue<T> {
  private items: Array<T> = []

  constructor() {}

  public length(): number {
    return this.items.length
  }

  public add(item: T) {
    this.items.push(item)
  }

  public process(handler: HandlerFunction<T>) {
    const currentItems = this.items
    this.items = []

    for (const item of currentItems) {
      handler(this, item)
    }
  }

  public print() {
    for (const item of this.items) {
      console.log({ item })
    }
  }
}
