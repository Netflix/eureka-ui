import {createEntryHolder} from "./entryholders/entryholder";

export function createEntryHolders(queryOptions) {
  var allHolders = [
    createEntryHolder('i-0001', 'web-frontend'),
    createEntryHolder('i-0002', 'web-frontend'),
    createEntryHolder('i-0010', 'web-backend'),
    createEntryHolder('i-0011', 'web-backend')
  ].map(trimEntryHolder);
  var filtered = [];
  if (queryOptions.id) {
    filtered = allHolders.filter((holder) => holder.id.indexOf(queryOptions.id) > -1);
  } else {
    filtered = allHolders;
  }
  return filtered;
}

function trimEntryHolder(full) {
  return {
    id: full[0].instanceInfo.id,
    app: full[0].instanceInfo.app,
    sources: full.map((holder) => holder.source)
  };
}
