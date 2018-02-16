# Config Loader

Load configuration file based on a dot string notation  
It looks for a json or javascript file inside the configuration path

## Get value

Set the configuration path

```
config = require('config-loader');
config.path('./configutations');
```

Load a configuration value

```
project
│   README.md    
│
└───configurations
│   │   app.js
│   
└───folder2
    │   file021.txt
    │   file022.txt
    │   ...
```

Get a value

```
// app.js
module.exports = {
    key: 'value'
};

config('app.key'); // it returns 'value'
config('app.missing-key', 'default-value'); // it returns 'default-value'
```

> If you try to get a value that doesn't exist it will return null or the default value

## Set value

You just simple pass the key and the value to set a configuration value

```
config().set('app.key', 'new-value');
config('app.key'); // it returns 'new-value'
```