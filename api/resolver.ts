export const hello = (): string => 'hello';

interface UserInput {
  name: string;
  age: number;
}

class User {
  constructor(private readonly name: string, private readonly age: number) {}
}

const users = [new User('hi', 1), new User('bye', 2)];

export const user = (): User[] => users;

export const insertUser = ({
  user: { name, age },
}: {
  user: UserInput;
}): User[] => {
  const result = [new User(name, age)].concat(users);
  console.log(result);

  return result;
};

export const rand = ({ offset }: { offset: number }): number => offset * 5;
