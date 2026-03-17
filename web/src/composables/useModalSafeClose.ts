import { ref } from 'vue';
export function useModalSafeClose(closeAction: () => void) {
    const isClickStartingOnOverlay = ref(false);

    const watchClickStart = (event: MouseEvent): void => {
        isClickStartingOnOverlay.value = event.target === event.currentTarget;
    };

    const confirmClickEnd = (event: MouseEvent): void => {
        const isClickEndingOnOverlay = event.target === event.currentTarget;

        if (isClickStartingOnOverlay.value && isClickEndingOnOverlay) {
            closeAction();
        }

        isClickStartingOnOverlay.value = false;
    };

    return {
        watchClickStart,
        confirmClickEnd
    };
}