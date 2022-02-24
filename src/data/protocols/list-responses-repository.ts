export interface ListResponsesRepository {
  listResponses (id: string): Promise<string[]>
}
