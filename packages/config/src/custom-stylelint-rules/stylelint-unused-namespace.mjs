/**
 * Stylelint rule that detects unused namespace declarations in SCSS files.
 * It reports each `@use` statement whose namespace alias is never referenced
 * as a lint error.
 * @module stylelint-unused-namespace
 */

import stylelint from "stylelint";

const ruleName = 'custom/scss-unused-namespace';
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (namespace) => `Unused namespace "${namespace}" is declared but never used`
});


/**
 * Creates the rule function that reports unused `@use` namespaces.
 * @param {boolean} primaryOption - If true, the rule runs. If false, it reports nothing.
 * @returns {Function} The rule function that processes CSS and reports violations.
 */
const ruleFunction = (primaryOption) => (root, result) => {

  // Skip processing if rule is disabled
  if (!primaryOption) {
    return;
  }

  // Track namespace declarations and their usage
  const namespaces = new Map();

  // First pass: collect all @use declarations with namespaces
  root.walkAtRules('use', (atRule) => {
    // Extract namespace information from @use statements
    const match = atRule.params.match(/['"](?<modulePath>[^'"]+)['"]\s+as\s+(?<namespace>[^;]+)/u);

    if (match) {
      const { modulePath, namespace } = match.groups;
      const cleanNamespace = namespace.trim();

      // Store namespace with its information
      namespaces.set(cleanNamespace, {
        modulePath,
        node: atRule,
        used: false,
        line: atRule.source.start.line
      });
    }
  });

  // Skip if no namespaces found
  if (namespaces.size === 0) {
    return;
  }

  // Second pass: check for namespace usage in the file
  root.walkDecls((decl) => {
    // Check property and value for namespace references
    const declString = decl.toString();

    namespaces.forEach((info, namespace) => {
      // Look for patterns like namespace.$var or namespace.function()
      const namespacePattern = new RegExp(`${namespace}\\.\\S+`, 'u');

      if (namespacePattern.test(declString)) {
        info.used = true;
      }
    });
  });

  // Also check for namespaces in @include, @extend, etc.
  root.walkAtRules((atRule) => {
    // Skip @use rules as they were processed in the first pass
    if (atRule.name === 'use') {
      return;
    }

    const atRuleString = atRule.toString();

    namespaces.forEach((info, namespace) => {
      const namespacePattern = new RegExp(`${namespace}\\.\\S+`, 'u');

      if (namespacePattern.test(atRuleString)) {
        info.used = true;
      }
    });
  });

  // Report unused namespaces
  namespaces.forEach((info, namespace) => {
    if (!info.used) {
      stylelint.utils.report({
        message: messages.rejected(namespace),
        node: info.node,
        result,
        ruleName,
      });
    }
  });
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = { fixable: false };

/**
 * Exports the plugin as the default export, and `ruleName` and `messages` as named exports.
 */
export default stylelint.createPlugin(ruleName, ruleFunction);
export { ruleName, messages };

