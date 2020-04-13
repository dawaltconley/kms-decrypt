# KMS Decrypt

A simple function for decrypting information using the AWS Key Management Service. Returns a promise which resolves to the decrypted secret.

## Examples

Decrypting an environment variable.

```javascript
const { decrypt } = require('@dawaltconley/kms-decrypt')

const eAuth = process.env['SECRET']
let dAuth

exports.handler = async (event, context) => {
    if (!dAuth)
        dAuth = await decrypt(eAuth)

    // do something with decrypted secret
}
```

Decrypting multiple environment variables.

```javascript
const { decrypt } = require('@dawaltconley/kms-decrypt')

const eAuth = [
    process.env['USERNAME'],
    process.env['PASSWORD']
]
let dAuth

exports.handler = async (event, context) => {
    if (!dAuth)
        dAuth = eAuth.map(decrypt)

    const [ user, pass ] = await Promise.all(dAuth)

    // do something with decrypted login
}
```

You can also encrypt data using the encrypt method. This is a simple Promise wrapper on the [AWS SDK KMS encrypt method](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/KMS.html#encrypt-property), which takes a `params` object as its argument.
