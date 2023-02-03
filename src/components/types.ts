export type PathType = {
  path: string[];
  color: string;
  stroke: number;
};
export type SigningPathType = PathType[];
export type ColorSelectorProps = {
  currentColor: string;
  strokeWidth: number;
  onChangeColor: (color: string) => void;
  onChangeStroke: (stroke: number) => void;
};
export type StrokeViewProps = {
  color: string;
  size: number;
};
