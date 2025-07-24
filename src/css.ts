export function createCss<Theme extends Record<string, unknown>>(theme: Theme) {
  const getValueOrFunction = (value: string | ((value: Theme) => string)) => {
    if (value instanceof Function) {
      return value(theme);
    }

    return value;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (cssStrings: TemplateStringsArray, ...values: any) {
    const string = cssStrings.reduce((acc, val, index) => {
      const currentInterpolateString = values[index] !== undefined ? getValueOrFunction(values[index]) : "";
      return acc + val + currentInterpolateString;
    }, "");

    const properties = string
      .split(";")
      .filter((item) => Boolean(item.trim()))
      .map((str) => str.trim())
      .map((property) => property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()));

    const styles = properties.reduce(
      (allProps, currenProp) => {
        const [key, value] = currenProp.split(":");
        allProps[key] = value.trim();
        return allProps;
      },
      {} as Record<string, unknown>,
    );

    return styles;
  };
}
