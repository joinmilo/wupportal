// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fieldValue = (row: any, field: string | undefined): any =>
  field?.split('.').reduce((obj, field) => (obj as never)?.[field], row);
