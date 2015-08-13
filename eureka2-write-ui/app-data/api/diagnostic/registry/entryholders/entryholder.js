
export function createEntryHolder(id, app) {
  return [
    createInstanceInfoCopy('local', id, app),
    createInstanceInfoCopy('replicated', id, app)
  ];
}

export function createInstanceInfoCopy(source, id, app) {
  return   {
    "source": {
      "origin": source.toLowerCase(),
      "name": source.toUpperCase(),
      "id": 0
    },
    "instanceInfo": {
      "id": `${app}_${id}`,
      "appGroup": `${app}-group`,
      "app": app,
      "asg": `${app}-v001`,
      "vipAddress": `${app}:7001`,
      "secureVipAddress": `${app}:7002`,
      "ports": [
        {
          "port": "7001",
          "secure": false
        },
        {
          "port": "7002",
          "secure": true
        }
      ],
      "status": "UP",
      "homePageUrl": "http://somehost:7001/home.html",
      "statusPageUrl": "http://somehost:7001/status.html",
      "healthCheckUrls": [
        "http://somehost:7001/health"
      ],
      "metaData": {
        "custom-keyA": "custom-valueA",
        "custom-keyB": "custom-valueB"
      },
      "dataCenterInfo": {
        "name": "aws",
        "region": "us-east-1",
        "zone": "us-east-1c",
        "placementGroup": "placementGroup",
        "amiId": "ami123",
        "instanceId": id,
        "instanceType": "m3.xlarge",
        "eth0mac": "00-11-22-33-44",
        "accountId": "account123",
        "publicAddress": {
          "protocolType": "IPv4",
          "label": "public",
          "ipAddress": "10.10.10.10",
          "hostName": "host1.test"
        },
        "privateAddress": {
          "protocolType": "IPv4",
          "label": "private",
          "ipAddress": "1.1.1.1",
          "hostName": "host1.test.private"
        }
      }
    }
  };
}