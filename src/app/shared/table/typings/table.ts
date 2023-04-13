export type ColumnType = 'BOOLEAN'
 | 'DATE'
 | 'DATETIME'
 | 'TIME'
 | 'TRANSLATABLE';

export type Column = {
  label: string,
  field: string,
};