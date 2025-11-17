import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ErrorBoundary.module.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    this.logError(error, errorInfo);
  }

  logError = (error, errorInfo) => {
    console.error('Error Boundary Caught an Error:', error);
    console.error('Error Info:', errorInfo);
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <h2 className={styles.title}>Something went wrong</h2>
            <p className={styles.message}>An unexpected error has occurred.</p>

            {this.props.showDetails && (
              <details className={styles.details}>
                <summary className={styles.summary}>Error Details</summary>
                <pre className={styles.pre}>
                  {this.state.error && this.state.error.toString()}
                  {'\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className={styles.actions}>
              <button onClick={this.handleReset} className={styles.retryButton}>
                Try Again
              </button>

              <button
                onClick={this.handleReload}
                className={styles.reloadButton}
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// PropTypes
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  showDetails: PropTypes.bool,
};

// Default props
ErrorBoundary.defaultProps = {
  showDetails: process.env.NODE_ENV === 'development',
};

export { ErrorBoundary };
