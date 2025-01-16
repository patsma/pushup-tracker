module.exports = {
  rules: {
    'timeline-format': {
      meta: {
        type: 'layout',
        fixable: 'code',
        docs: {
          description: 'Format GSAP animations consistently',
        },
      },
      create(context) {
        const sourceCode = context.getSourceCode();

        function isMultilineNode(node) {
          const text = sourceCode.getText(node);
          const lines = text.split('\n');
          return lines.length > 1;
        }

        function isGsapCall(node) {
          return (
            node.callee?.object?.name === 'gsap' &&
            ['to', 'from', 'fromTo', 'set', 'timeline'].includes(
              node.callee?.property?.name
            )
          );
        }

        function formatObjectToOneLine(node) {
          if (!node.arguments[1]) return null;

          const props = node.arguments[1].properties
            .map(
              (prop) =>
                `${sourceCode.getText(prop.key)}: ${sourceCode.getText(
                  prop.value
                )}`
            )
            .join(', ');

          const extraArg = node.arguments[2]
            ? `, ${sourceCode.getText(node.arguments[2])}`
            : '';

          return (fixer) =>
            fixer.replaceText(
              node,
              `${sourceCode.getText(node.callee)}(${sourceCode.getText(
                node.arguments[0]
              )}, { ${props} }${extraArg})`
            );
        }

        return {
          CallExpression(node) {
            if (isGsapCall(node) && isMultilineNode(node.arguments[1])) {
              const fix = formatObjectToOneLine(node);
              if (fix) {
                context.report({
                  node,
                  message: 'GSAP animations should be on a single line',
                  fix,
                });
              }
              return;
            }

            if (
              node.callee?.type === 'MemberExpression' &&
              ['to', 'from', 'fromTo'].includes(node.callee.property?.name) &&
              node.callee.object?.name !== 'gsap'
            ) {
              let chainRoot = node;
              while (chainRoot.parent?.type === 'MemberExpression') {
                chainRoot = chainRoot.parent.parent;
              }

              if (isMultilineNode(chainRoot)) {
                const comments = sourceCode.getCommentsBefore(chainRoot);
                const hasPrettierIgnore = comments.some(
                  (c) => c.value.trim() === 'prettier-ignore'
                );

                if (!hasPrettierIgnore) {
                  context.report({
                    node: chainRoot,
                    message:
                      'GSAP timeline chains should have prettier-ignore comment',
                    fix: (fixer) =>
                      fixer.insertTextBefore(chainRoot, '// prettier-ignore\n'),
                  });
                }
              }
            }
          },
        };
      },
    },
  },
};
