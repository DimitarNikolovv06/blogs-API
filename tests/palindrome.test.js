const palindrome = require("../utils/for_testing");

test("palindrome of a", () => {
  const result = palindrome("a");

  expect(result).toBe("a");
});

test("palindrome of react", () => {
  const result = palindrome("react");

  expect(result).toBe("tcaer");
});

test("palindrome of palindrome", () => {
  const result = palindrome("palindrome");

  expect(result).toBe("emordnilap");
});
