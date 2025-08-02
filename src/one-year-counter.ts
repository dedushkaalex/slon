export const getMenCountByYear = (users: { name: string; gender: string; birthday: string }[]) => {
  const men = users.filter((user) => user.gender === "male");

  const years = men.map(({ birthday }) => birthday.slice(0, 4));

  return years.reduce(
    (acc, val) => {
      const count = (acc[val] ?? 0) + 1;

      return {
        ...acc,
        [val]: count,
      };
    },
    {} as Record<string, number>,
  );
};
