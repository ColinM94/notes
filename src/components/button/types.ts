import { MaterialSymbol } from "material-symbols";

export interface Props {
  icon?: MaterialSymbol;
  label?: string;
  onClick: () => void;
  surface?: 0 | 1 | 2;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
}
