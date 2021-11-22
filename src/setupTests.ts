import "@testing-library/jest-dom/extend-expect";
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };
module.exports = {
  // The root of the source code
  // `<rootDir>` is a token Jest substitutes
  roots: ["<rootDir>/src"],

  // Typescript support for Jest transformations
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: ["@testing-library/react/cleanup-after-each", "@testing-library/jest-dom/extend-expect"],
  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename should contain `test`.
  testRegex: "(/__tests__/.*|(\\.|/)(test))\\.tsx?$",

  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
