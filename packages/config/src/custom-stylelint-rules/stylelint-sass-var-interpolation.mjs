import stylelint from "stylelint";

const ruleName = "custom/sass-var-interpolation-in-var-fallback";
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: (fallback) => `Sass variable "${fallback}" in var() fallback should be interpolated (use #{$variable})`
});

/**
 * Stylelint rule to enforce Sass variables in var() fallbacks are interpolated.
 */
const plugin = stylelint.createPlugin(ruleName, (primaryOption) => (root, result) => {
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
    let matchArray = null;

    while ((matchArray = varWithFallbackRegex.exec(value)) !== null) {
      // Get the full match and extract the fallback part
      const [fullMatch] = matchArray;
      // Extract the fallback (between the comma and the closing parenthesis)
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
          word: fallback
        });
      }
    }
  });
});

// This export format is required for Stylelint plugins
export default plugin;
export { ruleName, messages };
