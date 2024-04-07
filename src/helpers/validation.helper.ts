export class ValidationHelper {
  static reformatError(original) {
    return original.map((validation: any) => validation.errors).flat();
  }
}
