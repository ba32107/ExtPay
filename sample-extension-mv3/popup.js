// Replace 'sample-extension' with the id of the extension you
// registered on ExtensionPay.com to test payments. You may need to
// uninstall and reinstall the extension to make it work.
// Don't forget to change the ID in background.js too!
const extpay = ExtPay('<redacted>')

function populate() {
    extpay.getUser().then(user => {
        document.querySelector('textarea').textContent = JSON.stringify(user, null, 2)
    }).catch(err => {
        document.querySelector('textarea').textContent = "Error fetching data :( Check that your ExtensionPay id is correct and you're connected to the internet"
    })
}

document.getElementById('trial').addEventListener('click', extpay.openTrialPage)
document.getElementById('payments').addEventListener('click', extpay.openPaymentPage)
document.getElementById('refresh').addEventListener('click', populate)
document.getElementById('logout').addEventListener('click', async () => {
    await chrome.storage.sync.remove('extensionpay_installed_at')
    await chrome.storage.sync.remove('extensionpay_api_key')
    await chrome.storage.sync.remove('extensionpay_user')
    populate()
})

populate()
