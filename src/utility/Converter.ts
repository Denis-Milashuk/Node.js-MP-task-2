export abstract class Converter<E, D> {
  abstract convertToDto(entity: E): D;
  abstract convertToEntity(dto: D): E;
}
