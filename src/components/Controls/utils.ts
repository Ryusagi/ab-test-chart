const capitalizeFirst = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const getSelectOptions = (values: string[]) =>
  values.map(value => ({
    label: capitalizeFirst(value),
    value: value,
  }));
