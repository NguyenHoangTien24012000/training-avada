import {Button, PageActions} from '@shopify/polaris';
import React, { useState } from 'react';

export default function ButtonExample() {
  const [state, setState] = useState(false);
  return (
    <PageActions
    primaryAction={{
      content: 'Save',
    }}
    secondaryActions={[
      {
        content: 'Delete',
        destructive: true,
      },
    ]}
  />
  )
}