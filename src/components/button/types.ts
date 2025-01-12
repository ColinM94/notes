import { MaterialSymbol } from "material-symbols";

export interface Props {
  icon: MaterialSymbol;
  label: string;
  onClick: () => void;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
}
