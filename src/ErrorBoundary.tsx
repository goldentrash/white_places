import React, { Component, ReactElement } from 'react';

type ErrorBoundaryState = { hasError: boolean };
type ErrorBoundaryProps = { children: ReactElement };
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render(): ReactElement {
    if (this.state.hasError) {
      return <div>Unexpected Error</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
