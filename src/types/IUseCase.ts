export default interface IUseCase<Dto, Response> {
  execute(dto?: Dto): Promise<Response> | Response;
}
