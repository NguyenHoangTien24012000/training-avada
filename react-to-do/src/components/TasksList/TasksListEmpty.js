import {Card, EmptyState} from '@shopify/polaris';
import React from 'react';

export function TasksListEmpty() {
  return (
    <Card sectioned>
      <EmptyState
        heading="Empty Task"
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        fullWidth
      >
      </EmptyState>
    </Card>
  );
}