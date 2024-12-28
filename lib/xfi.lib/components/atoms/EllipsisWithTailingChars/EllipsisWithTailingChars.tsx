import { SxProps, Typography, TypographyProps } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

export type Props = {
  text: string;
  typographyVariant?: TypographyProps['variant'];
  endChars?: number;
  sx?: SxProps;
};

export const TEST_ID = 'ellipsis-test-id';

/**
 * A component that truncates text with ellipsis and optional trailing characters.
 *
 * The `EllipsisWithTailingChars` component truncates the provided text with ellipsis (...)
 * and optionally adds trailing characters at the end. It dynamically adjusts the text based on
 * the available width of the container.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.text - The text to truncate.
 * @param {string} [props.typographyVariant='body2'] - The typography variant for the truncated text.
 * @param {number} [props.endChars] - The number of trailing characters to add at the end of the truncated text.
 * @param {SxProps<Theme>} [props.sx] - The style object for customizing the component's appearance.
 *
 * @returns {ReactElement} The `EllipsisWithTailingChars` component, which truncates text with ellipsis and optional trailing characters.
 */
const EllipsisWithTailingChars = ({ text, typographyVariant = 'body2', endChars, sx }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [truncatedText, setTruncatedText] = useState(text);

  const measureWidth = (textToMeasure: string) => {
    const span = document.createElement('span');

    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    span.style.whiteSpace = 'nowrap';
    span.innerText = textToMeasure;
    document.body.appendChild(span);
    const width = span.getBoundingClientRect().width;

    document.body.removeChild(span);

    return width;
  };

  const truncateText = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.offsetWidth;

    if (measureWidth(text) <= containerWidth) {
      setTruncatedText(text);

      return;
    }

    let truncated = '';

    if (endChars !== undefined) {
      const endSlice = text.slice(-endChars);
      let start = 0;
      let end = text.length - endChars;

      while (start < end) {
        const middle = Math.floor((start + end) / 2);
        const candidate = text.slice(0, middle - endChars) + '...' + endSlice;

        if (measureWidth(candidate) <= containerWidth) {
          start = middle + 1;
        } else {
          end = middle - 1;
        }
      }

      truncated = text.slice(0, start - endChars) + '...' + endSlice;
    } else {
      let start = 0;
      let end = text.length;

      while (start < end) {
        const middle = Math.floor((start + end) / 2);
        const candidate = text.slice(0, middle) + '...' + text.slice(-middle);

        if (measureWidth(candidate) <= containerWidth) {
          start = middle + 1;
        } else {
          end = middle - 1;
        }
      }

      truncated = text.slice(0, start) + '...' + text.slice(-start);
    }

    setTruncatedText(truncated);
  };

  useEffect(() => {
    truncateText();
    const resizeObserver = new ResizeObserver(truncateText);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [text, endChars]);

  return (
    <Typography
      variant={typographyVariant}
      ref={containerRef}
      textAlign="end"
      width="100%"
      sx={sx}
      data-testid={TEST_ID}
    >
      {truncatedText}
    </Typography>
  );
};

export default EllipsisWithTailingChars;
