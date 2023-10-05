function replaceOgpLabel (article) {
  const cardLargeMedia = article.querySelector('[data-testid="card.layoutLarge.media"]');

  if (cardLargeMedia) {
    const anchor = cardLargeMedia.querySelector('a');
    const ariaLabel = anchor?.ariaLabel;

    if (ariaLabel) {
      const ogpLabelContainer = anchor?.lastChild;
      const ogpLabelBackground = ogpLabelContainer?.lastChild;
      const ogpLabel = ogpLabelBackground?.lastChild?.lastChild;

      if (ogpLabelContainer && ogpLabelBackground && ogpLabel) {
        ogpLabelContainer.style.right = '12px';
        ogpLabelContainer.style.top = '12px';
        ogpLabelContainer.style.bottom = 'auto';
        ogpLabelBackground.style.height = 'auto';

        const domain = ariaLabel.substring(0, ariaLabel.indexOf(' '));
        const headline = ariaLabel.substring(ariaLabel.indexOf(' ') + 1);

        ogpLabel.innerHTML = "<b>"+ domain + "</b> " + headline;
        ogpLabel.style.cssText += 'overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;text-align:left;';
      }
    }
  }
}

const mutationObserver = new MutationObserver((mutationRecords) => {
  mutationRecords.forEach((mutationRecord) => {
    const articles = mutationRecord.target.querySelectorAll('article');

    for (let article of articles) {
      replaceOgpLabel(article);
    }
  })
});

mutationObserver.observe(
  document.body,
  { childList: true, subtree: true }
);
