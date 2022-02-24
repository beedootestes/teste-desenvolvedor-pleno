export interface ListResponsesRepository {
  list (id: string): Promise<string[]>
}
