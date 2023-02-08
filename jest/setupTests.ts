// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import replaceAllInserter from 'string.prototype.replaceall';

replaceAllInserter.shim();

// hide error messages about act() being unsupported in production build
const ignoredErrors = [
    /act(...) is not supported in production builds of React, and might not behave as expected./,
  ]
  const consoleError = global.console.error
  global.console.error = (...args) => {
    if (ignoredErrors.some((el) => el.test(args[0]))) {
      return consoleError(...args)
    }
  }
  