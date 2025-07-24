import { describe, expect, it, beforeEach } from "vitest";
import { createCss } from "../css";

describe("css", () => {
  let css: ReturnType<typeof createCss>;

  beforeEach(() => {
    css = createCss<{
      color: {
        primary: string;
      };
    }>({
      color: {
        primary: "red",
      },
    });
  });
  it.each([
    {
      cssString: `
      color: red;
      border-radius: 10px;
      padding: 10px;
    `,
      expected: {
        color: "red",
        borderRadius: "10px",
        padding: "10px",
      },
    },
    {
      cssString: `
      color: #fff;
      border-radius: ${10}px;
      padding: 10px;
    `,
      expected: {
        color: "#fff",
        borderRadius: `10px`,
        padding: "10px",
      },
    },
  ])("should return converted css string to object", ({ cssString, expected }) => {
    const style = css`
      ${cssString}
    `;

    expect(style).toMatchObject(expected);
  });

  it("should return converted css string with property as callback fn to object", () => {
    const style = css`
      color: ${({ color }) => color.primary};
      border-radius: ${10}px;
      padding: 10px;
    `;

    expect(style).toMatchObject({
      color: "red",
      borderRadius: "10px",
      padding: "10px",
    });
  });

  it("isEmpty", () => {
    const style = css``;

    expect(style).toMatchObject({});
  });
});
