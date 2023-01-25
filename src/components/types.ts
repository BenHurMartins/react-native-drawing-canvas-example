export type PathType = {
  path: String[];
  color: String;
  stroke: number;
};
export type SigningPathType = PathType[];
export type ColorSelectorProps = {
  onChangeColor: (color: string) => void;
  onChangeStroke: (stroke: number) => void;
};
export type StrokeViewProps = {
  color: string;
  size: number;
};
