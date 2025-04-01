export const scrollPosition = (
  id,
  curItems,
  scrollCounter,
  setScrollCounter
) => {
  if (scrollCounter === false && id && curItems.length > 0) {
    const element = document.getElementById(
      id == "last" ? `quote_${curItems.length - 1}` : `quote_${id - 1}`
    );

    //scroll to and focus on an element (last if coming from add, previous if coming from edit)
    const focus = setTimeout(() => {
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);

    return () => {
      clearTimeout(focus);
      setScrollCounter(true);
    };
  }
};
