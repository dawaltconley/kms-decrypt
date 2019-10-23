const AWS = require('aws-sdk')

module.exports = (encrypted, opts={}) => new Promise((resolve, reject) => {
    if (opts.region)
        AWS.config.update({ region: opts.region })
    const kms = new AWS.KMS()
    kms.decrypt({ CiphertextBlob: Buffer.from(encrypted, 'base64') }, (err, data) => {
        if (err) {
            reject(err)
        } else if (data === null) {
            reject(new Error('Unable to decrypt key, KMS returned null. This is likely due to a lack of decryption permissions.'))
        }
        resolve(data.Plaintext.toString('ascii'))
    })
})
