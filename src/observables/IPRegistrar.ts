import type Observable from './Observable'
import { type Observer } from './Observable'

class IPRegistrar implements Observable<string> {
  // -- singleton pattern
  private static instance: IPRegistrar
  private constructor () {}

  public static getInstance (): IPRegistrar {
    if (this.instance === undefined) {
      this.instance = new this()
    }

    return this.instance
  }

  // -- observer pattern
  private data: string | undefined
  private readonly observers: Array<Observer<string>> = []

  public pullData (): string | undefined {
    return this.data
  }

  public pushData (data: string): void {
    this.data = data
    this.notifyObservers(data)
  }

  private notifyObservers (data: string): void {
    for (const observer of this.observers) {
      observer(data)
    }
  }

  public registObserver (cb: Observer<string>): void {
    this.observers.push(cb)
  }
}

export default IPRegistrar
