// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fieldValue = (object: any, field: string | undefined): any =>
  field?.split('.').reduce((obj, field) => (obj as never)?.[field], object);
