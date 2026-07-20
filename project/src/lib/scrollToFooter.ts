/**
 * Smooth scroll to footer or any anchor element
 * Handles cross-page navigation if needed
 */
export function scrollToElement(elementId: string) {
  const element = document.querySelector<HTMLElement>(`#${elementId}`);
  
  if (element) {
    // Element exists on current page, scroll to it
    element.scrollIntoView({ behavior: 'smooth' });
  } else if (elementId === 'footer') {
    // If footer doesn't exist (on inner page), navigate to home and then scroll
    window.location.href = `/#${elementId}`;
  }
}

/**
 * Specifically for scrolling to footer
 */
export function scrollToFooter() {
  scrollToElement('footer');
}

/**
 * Handle contact link click - scroll to footer with smooth behavior
 */
export function handleContactLinkClick(event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  scrollToFooter();
}
