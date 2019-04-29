import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { StateDecorator, Store } from '@sambego/storybook-state';

import Dialog from './';

import Flex from '../flex';
import Card from '../card';
import Button from '../button';

const reactContent = (
  <Flex>
    <Card p={3}>Hello</Card>
    <Card p={3}>World</Card>
  </Flex>
);

const stories = storiesOf('Dialog', module);

const store = new Store({
  dialogIsOpen: false
});

stories.addDecorator(withKnobs);
stories.addDecorator(StateDecorator(store));

stories.add('default', () => {
  const dialogIsOpen = store.get('dialogIsOpen');

  const heading = text('Heading', 'This is my title', 'Main');
  const contentIsText = boolean('Content is text?', true, 'Main');
  const content = contentIsText
    ? text('Content', 'This is my title', 'Main')
    : reactContent;
  const hasBackground = boolean('Has background', true, 'Main');

  const buttons = {
    left: [
      <Button variant="error" onClick={() => console.log('Cancel')}>
        Cancel
      </Button>
    ],
    right: [
      <Button variant="secondary" onClick={() => console.log('Other')}>
        Other
      </Button>,
      <Button onClick={() => console.log('Primary')}>Primary</Button>
    ]
  };

  return (
    <React.Fragment>
      <Button onClick={() => store.set({ dialogIsOpen: !dialogIsOpen })}>
        Open the dialog
      </Button>
      {dialogIsOpen && <p>Open</p>}
      <Dialog
        heading={heading}
        content={content}
        buttons={buttons}
        hasBackground={hasBackground}
        isOpen={dialogIsOpen}
        onOpen={() => console.log('DIALOG', 'open')}
        onClose={() => console.log('DIALOG', 'close')}
      />
    </React.Fragment>
  );
});
