import React from 'react';
import { storiesOf } from '@storybook/react';
import '../styles/fonts.scss';
import '../styles/base.scss';
import './storybook-env.scss';
import styles from './indexStory.module.scss';

storiesOf('Welcome', module).add('to <Placeholder Title Goes Here>', () => (
  <div>
    <header className={styles.header}>
      <h1 className={styles.title}>Placeholder Title Goes Here</h1>
    </header>
  </div>
));
