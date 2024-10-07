export default function getCurrentPage(user, pages, quoteId) {
  if (quoteId !== null) {
    return pages.edit;
  }

  return user ? pages.quotes : pages.home;
}
