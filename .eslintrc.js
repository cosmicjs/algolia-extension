module.exports = {
 env: {
   browser: true,
   commonjs: true,
 },
 parser: 'babel-eslint',
 plugins: ['react', 'env'],
 extends: 'airbnb',
 rules: {
   'camelcase': ['off'],
   'import/no-extraneous-dependencies': ['off'],
   'jsx-a11y/anchor-is-valid': ['off'],
   'jsx-a11y/label-has-for': ['off'],
   'no-undef': ['off'],
   'react/forbid-prop-types': ['off'],
   'react/react-in-jsx-scope': ['off']
 }
}
