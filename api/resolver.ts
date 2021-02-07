export const hello = (): string => 'hello';
export const user = (): string[] => ['hi', 'bye', 'and then?'];
export const rand = ({ offset }: { offset: number }): number => offset * 5;
