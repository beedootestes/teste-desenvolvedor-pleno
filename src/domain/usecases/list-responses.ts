export interface ListResponses {
  list (id: string): Promise<string[]>
}
