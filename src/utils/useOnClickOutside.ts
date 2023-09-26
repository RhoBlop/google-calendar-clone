import { useEffect } from 'react';

export function useOnClickOutside(
    ref: React.RefObject<HTMLElement>,
    onClickOutside: () => void,
    isVisible = true,
) {
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                isVisible &&
                ref.current &&
                !ref.current.contains(e.target as Node)
            ) {
                onClickOutside();
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [ref, onClickOutside, isVisible]);
}
