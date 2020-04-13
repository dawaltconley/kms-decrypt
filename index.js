const AWS = require('aws-sdk')
const kms = new AWS.KMS()

exports.encrypt = (params, { region }={}) => new Promise((resolve, reject) => {
    if (region)
        AWS.config.update({ region: region })
    kms.encrypt(params, (err, data) =>
        err ? reject(err) : resolve(data.CiphertextBlob.toString('ascii')))
})

exports.decrypt = (encrypted, { region }={}) => new Promise((resolve, reject) => {
    if (region)
        AWS.config.update({ region: region })
    kms.decrypt({ CiphertextBlob: Buffer.from(encrypted, 'base64') }, (err, data) =>
        err ? reject(err) : resolve(data.Plaintext.toString('ascii')))
})
