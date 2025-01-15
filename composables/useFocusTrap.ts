import { onMounted, onBeforeUnmount } from "vue";

export function useFocusTrap(elementRef: any) {
  let focusableElements: HTMLElement[];

  const handleTab = (e: KeyboardEvent) => {
    if (!elementRef.value) return;

    if (!focusableElements.length) {
      focusableElements = [
        ...elementRef.value.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ),
      ];
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Handle tab and shift+tab navigation
    if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      e.preventDefault();
    } else if (e.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    }
  };

  onMounted(() => {
    document.addEventListener("keydown", handleTab);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("keydown", handleTab);
  });
}
