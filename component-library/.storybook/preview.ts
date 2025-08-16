import type { Preview, Decorator, StoryFn, StoryContext } from '@storybook/react';
import React, { useEffect } from 'react';

const GlobalStyles = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return React.createElement('style', {
    children: `
      body {
        font-family: 'Inter', sans-serif;
        margin: 0;
        padding: 0;
      }
      #storybook-root {
        padding: 20px;
      }
    `,
  });
};

const withGlobalStyles: Decorator = (Story: StoryFn, context: StoryContext) => {
  return (
    <>
    <GlobalStyles />
    <Story />
    </>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withGlobalStyles],
};

export default preview;