export interface EventBusType {
  connected: boolean

  disconnected: boolean

  connect(): void

  disconnect(): void

  on<T>(event: string, listener: (args?: T) => void): void

  once<T>(event: string, listener: (args?: T) => void): void

  emit<T>(event: string, params?: T): void

  emitLast<T>(event: string, params?: T): void

  off(event?: string): void
}

export interface EventBusContextType {
  isConnected: boolean
  provider: EventBusType
}
