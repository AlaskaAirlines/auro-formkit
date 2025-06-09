/* eslint-disable init-declarations */
import stylelint from "stylelint";

const ruleName = "custom/sass-var-interpolation-in-var-fallback";
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: (fallback) => `Sass variable "${fallback}" in var() fallback should be interpolated (use #{$variable})`
});

/**
 * Stylelint rule to enforce Sass variables in var() fallbacks are interpolated.
 * @param {boolean} primaryOption - Whether the rule is enabled.
 * @returns {Function} The rule function that processes CSS and reports violations.
 */
const ruleFunction = (primaryOption) => (root, result) => {
  if (!primaryOption) {
    return;
  }

  root.walkDecls((decl) => {
    const { prop, value } = decl;

    // Only apply the rule to CSS custom property declarations (properties starting with --)
    if (!prop.startsWith('--')) {
      return;
    }

    // Find var() with a fallback argument containing a Sass variable
    const varWithFallbackRegex = /var\((?:[^,]+),\s*(?:[^)]+)\)/gu;
    let matchArray;

    while ((matchArray = varWithFallbackRegex.exec(value)) !== null) {
      const [fullMatch] = matchArray;
      const commaIndex = fullMatch.indexOf(',');
      const closingParenIndex = fullMatch.lastIndexOf(')');
      const fallback = fullMatch.substring(commaIndex + 1, closingParenIndex).trim();

      // If fallback contains a Sass variable without interpolation
      if ((/^\$[a-zA-Z_-][\w-]*$/u).test(fallback)) {
        stylelint.utils.report({
          message: messages.expected(fallback),
          node: decl,
          result,
          ruleName,
          word: fallback,
        });
      }
    }
  });
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = { fixable: false };

// This export format is required for Stylelint plugins
export default stylelint.createPlugin(ruleName, ruleFunction);
export { ruleName, messages };
