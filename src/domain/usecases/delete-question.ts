export interface DeleteQuestion {
  delete (id: string): Promise<Boolean>
}
