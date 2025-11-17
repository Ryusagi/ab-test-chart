export interface SelectProps<T> {
  options: T[];
  selected: T;
  onChange: (elem: T) => void;
}
