# ShortMax prelander

Standalone static page. Open `index.html` directly or serve this folder with any static web server. No build or dependencies required.

Inspired by the repository's Shorta and VPN prelanders. All changes are contained in this folder.

## Download destination

All download CTAs currently open the official Android listing. Set `DOWNLOAD_URL` in `main.js` to an approved campaign URL. Also update the `.download` anchor URLs in `index.html` to preserve the same destination when JavaScript is disabled. No campaign URL was supplied; no affiliate IDs or tracking scripts are included.

## Assets and content

Images downloaded from the official Google Play listing: https://play.google.com/store/apps/details?id=live.shorttv.apps&hl=en&gl=IN

The live listing's promotional screenshots differ from the screenshots supplied in the brief. All images are stored locally in `images/`. Copy uses the supplied app description and features illustrated by its listing. No free-trial claims or invented reviews are included. Genre cards are editorial themes, not named show listings.

The screenshot gallery supports touch scrolling and previous/next buttons. FAQs use native accessible disclosure controls. Reduced-motion preferences are respected.
