const statusElem = document.getElementById('status');
const urlElem = document.getElementById('url');

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (!tabs) {
    statusElem.innerText = 'No active tab to generate QR code for.';
    return;
  }
  const tab = tabs[0];

  const qrCanvas = document.getElementById('qrcode');

  statusElem.innerText = 'Generating QR Code...';
  QRCode.toCanvas(qrCanvas, tab.url, (error) => {
    if (error) {
      statusElem.innerText = 'Error generating QR code';
      console.error(error);
      return;
    }

    statusElem.innerText = tab.title;
    urlElem.innerText = tab.url;
    console.log('QR generated for ' + tab.url);
  });
});
