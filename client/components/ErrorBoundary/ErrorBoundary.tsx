import React, { ErrorInfo } from 'react';
import { ErrorBoundaryProps } from './types';

export class ErrorBoundary extends React.Component {
  state: {
    hasError: boolean;
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please reload the page</h1>;
    }
    return this.props.children;
  }
}
