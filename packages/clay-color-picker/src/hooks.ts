/**
 * © 2019 Liferay, Inc. <https://liferay.com>
 *
 * SPDX-License-Identifier: BSD-3-Clause
 */
import * as React from 'react';

/**
 * Utility hook for calculating the mouse position
 */
export function useMousePosition(containerRef: React.RefObject<any>) {
	const [xy, setXY] = React.useState({x: 0, y: 0});

	const onMouseMove = (event: React.MouseEvent | MouseEvent) => {
		const rect = containerRef.current.getBoundingClientRect();

		const x = event.pageX;

		let newLeft = x - (rect.left + window.pageXOffset);

		newLeft = newLeft < 0 ? 0 : newLeft > rect.width ? rect.width : newLeft;

		const y = event.pageY;

		let newTop = y - (rect.top + window.pageYOffset);

		newTop = newTop < 0 ? 0 : newTop > rect.height ? rect.height : newTop;

		setXY({x: newLeft, y: newTop});
	};

	return {...xy, onMouseMove, setXY};
}

/**
 * Regex to only handle values of A,B,C,D,E,F,0,1,2,3,4,5,6,7,8,9
 */
const HEX_REGEX = /^[a-fA-F0-9]+$/;

/**
 * Hook for updating input value
 */
export function useHexInput(hex: string): [string, (val: string) => void] {
	const [inputValue, setInputValue] = React.useState(hex);

	const handleNewInputValue = (value: string) => {
		const match = value.match(HEX_REGEX);

		setInputValue(match ? match[0] : '');
	};

	return [inputValue, handleNewInputValue];
}

const ESC_KEY_CODE = 27;

/**
 * Hook for closing dropdown when user hits ESC key or clicks outside the menu.
 */
export function useDropdownCloseInteractions(
	elementRef: React.RefObject<HTMLElement>,
	setActive: (val: boolean) => void
) {
	React.useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (
				event.target instanceof Element &&
				elementRef.current &&
				!elementRef.current.contains(event.target)
			) {
				setActive(false);
			}
		};

		const handleEsc = (event: KeyboardEvent) =>
			event.keyCode === ESC_KEY_CODE ? setActive(false) : undefined;

		window.addEventListener('mousedown', handleClick);
		window.addEventListener('keydown', handleEsc);

		return () => {
			window.removeEventListener('mousedown', handleClick);
			window.removeEventListener('keydown', handleEsc);
		};
	}, []);
}
