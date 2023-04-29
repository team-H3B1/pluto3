export type Observer<T> = (data: T) => void

interface Observable<T> {
  pullData: () => T | undefined
  pushData: (data: T) => void
  registObserver: (cb: Observer<T>) => void
}

export default Observable
