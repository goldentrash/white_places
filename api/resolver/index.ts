interface UserInput {
  name: string;
  age: number;
}

class User {
  constructor(private readonly name: string, private readonly age: number) {}
}

const users = [new User('hi', 1), new User('bye', 2)];

export default {
  user: (): User[] => users,
  insertUser: ({ user: { name, age } }: { user: UserInput }): User[] => {
    const result = [new User(name, age)].concat(users);
    console.log(result);

    return result;
  },
  rand: ({ offset }: { offset: number }): number => offset * 5,
  hello: (): string => 'hello',
};
