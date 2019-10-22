const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })

module.exports = encrypted => new Promise((resolve, reject) => {
    console.log('decrypting key...')
    const kms = new AWS.KMS()
    kms.decrypt({ CiphertextBlob: new Buffer(encrypted, 'base64') }, (err, data) => {
        if (err) {
            reject(err)
        } else if (data === null) {
            reject(new Error('Unable to decrypt key, KMS returned null. This is likely due to a lack of decryption permissions.'))
        }
        resolve(data.Plaintext.toString('ascii'))
    })
})
