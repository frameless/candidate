import '@nl-design-system-candidate/code-block-css/html/code-block.css';
import '@nl-design-system-candidate/heading-css/html/heading.css';
import '@nl-design-system-candidate/paragraph-css/html/paragraph.css';
import '@nl-design-system-candidate/code-css/html/code.css';
import '@nl-design-system-unstable/voorbeeld-design-tokens/dist/variables.css';
import '@gemeente-denhaag/side-navigation/index.css';
import '@utrecht/drawer-css/dist/index.css';
import '@utrecht/body-css/dist/index.css';
import '@utrecht/page-body-css/dist/index.css';
import '@utrecht/button-css/dist/index.css';
import '@utrecht/button-link-css/dist/index.css';
import '@utrecht/nav-bar-css/dist/index.css';
import '@utrecht/nav-list-css/dist/index.css';
import '@utrecht/textbox-css/dist/index.css';
import '@utrecht/page-layout-css/dist/index.css';
import '@utrecht/code-block-css/dist/index.css';
import '@utrecht/root-css/dist/index.css';
import '@utrecht/textbox-css/dist/html/index.css';
import '@utrecht/form-label-css/dist/html/index.css';
import '@utrecht/checkbox-css/dist/html/index.css';
import '@utrecht/select-css/dist/html/index.css';
import '@utrecht/heading-1-css/dist/html/index.css';
import '@utrecht/heading-2-css/dist/html/index.css';
import '@utrecht/heading-3-css/dist/html/index.css';
import '@fontsource-variable/noto-sans/index.css';
import '@fontsource-variable/noto-sans-mono/index.css';
import '@fontsource-variable/noto-serif/index.css';
import '@fontsource/noto-sans/latin.css';
import '@fontsource/noto-sans-mono/latin.css';
import '@fontsource/noto-serif/latin.css';
import '@fontsource/noto-sans/latin-ext.css';
import '@fontsource/noto-sans-mono/latin-ext.css';
import '@fontsource/noto-serif/latin-ext.css';
import '@fontsource/noto-sans/greek.css';
import '@fontsource/noto-sans-mono/greek.css';
import '@fontsource/noto-serif/greek.css';
import '@fontsource/noto-sans/cyrillic.css';
import '@fontsource/noto-sans-mono/cyrillic.css';
import '@fontsource/noto-serif/cyrillic.css';
import { StoryList } from './story-list-element.js';

const stories = [
  import('./button-react.stories.js'),
  import('./code-react.stories.js'),
  import('./code-block-react.stories.js'),
  import('./color-sample-react.stories.js'),
  import('./data-badge-react.stories.js'),
  import('./heading-react.stories.js'),
  import('./link-react.stories.js'),
  import('./mark-react.stories.js'),
  import('./number-badge-react.stories.js'),
  import('./paragraph-react.stories.js'),
  import('./skip-link-react.stories.js'),
];

Promise.all(stories).then((stories) => {
  console.log(stories);
  stories.forEach((module) => {
    const storyList = document.createElement('story-list') as StoryList;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    storyList.module = module as unknown as any;
    document.querySelector('main')?.appendChild(storyList);
  });
});
