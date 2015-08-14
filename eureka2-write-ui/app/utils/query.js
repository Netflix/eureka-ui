export var queryParameterNames = ["id", "app"];

export function queryParser(queryString) {
  if (!queryString) {
    return {};
  }
  var parts = queryString.split(/\s*and\s*/);
  var query = {};
  for (let part of parts) {
    var keyValue = part.split(/\s*=\s*/);
    var key = keyValue[0];
    if (key && ["id", "app", "source", "cardinality"]) {
      if (keyValue.length == 1) {
        return {
          error: `Key ${key} has no value assigned`
        }
      }
      query[key] = keyValue[1];
    } else {
      return {
        error: `Invalid key name ${key}`
      }
    }
  }
  return query;
}

export function queryUriFormatter(query) {
  if (!query) {
    return "";
  }
  return Object.keys(query).map((key) => key + "=" + query[key]).join("&");
}