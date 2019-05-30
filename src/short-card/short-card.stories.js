import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import { UndoAlt, Trash } from 'styled-icons/fa-solid';

import ShortCard from '.';

import { Column } from '../grid';

const stories = storiesOf('3. Complex|Short Card', module);

stories.addDecorator(withKnobs);

stories.add('as a reminder', () => {
  const title = text('Title', 'Christmas', 'Main');
  const description = text('Description', 'December 25th', 'Main');

  return (
    <Column width={[1, 1 / 2, 1 / 4]}>
      <ShortCard
        title={title}
        description={description}
        buttons={[
          {
            icon: Trash,
            color: 'error',
            color: 'error500',
            hoverColor: 'error700',
            onClick: () => console.log('Delete me')
          }
        ]}
      />
    </Column>
  );
});

stories.add('as an invitation', () => {
  const title = text('Title', 'Grandma', 'Main');
  const description = text('Description', 'oldgrandma@gmail.com', 'Main');

  return (
    <Column width={[1, 1 / 2, 1 / 4]}>
      <ShortCard
        title={title}
        description={description}
        buttons={[
          {
            icon: UndoAlt,
            color: 'mediumGray',
            hoverColor: 'darkGray',
            onClick: () => console.log('Resend me')
          },
          {
            icon: Trash,
            color: 'error500',
            hoverColor: 'error700',
            onClick: () => console.log('Delete me')
          }
        ]}
      />
    </Column>
  );
});
