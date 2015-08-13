jest.dontMock('../query');

describe('queryParser', function () {
  it('parses query string into a map', function () {
    var q = require("../query")
    var input = "id=i-a.* and app=eureka2-write";
    var expected = {
      id: "i-a.*",
      app: "eureka2-write"
    };
    var result = q.queryParser(input);
    Object.keys(expected).forEach((key) =>
        expect(result[key]).toBe(expected[key])
    );
  });
});

describe('queryUriFormatter', function () {
  it('builds query URI', function () {
    var q = require("../query")
    var input = {
      id: "i-a.*",
      app: "eureka2-write"
    };
    var result = q.queryUriFormatter(input);
    expect(result).toBe("id=i-a.*&app=eureka2-write");
  });
});
