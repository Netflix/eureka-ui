import $ from "jquery"
import {queryUriFormatter} from "../utils/query"

export function fetchEntryHolders(queryOptions) {
  var url = "/api/diagnostic/registry/entryholders";
  if(queryOptions) {
    url = url + '?' + queryUriFormatter(queryOptions);
  }
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        var holderList = data
          .map((item) => {
            var row = {};
            row['id'] = item['id'];
            row['app'] = item['app'];
            row['sources'] = item['sources'].map((src) => `${src.origin}/${src.name}/${src.id}`).join(', ')
            return row;
          }
        )
        resolve(holderList);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        reject(status);
      }.bind(this)
    });
  });
}

export function fetchEntryHolder(instanceId) {
  var url = `/api/diagnostic/registry/entryholders/${instanceId}`;
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        resolve(data);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        reject(status);
      }.bind(this)
    });
  });
}
