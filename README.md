# `eff-diceware-passphrase`

> Generate a cryptographically random password from EFF's improved Diceware word list

In July 2016, EFF release a more user friendly Diceware list in the article
[Deep Dive: EFF's New Wordlists for Random Passphrases](https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases).

A Diceware list is a dictionary of `6^5 == 7776` words, making it possible to
use 5 normal dice as a source of entropy. Since the dictionary is fixed, it is
possible to reason about how much entropy each new word (token) contributes to
the passphrase; `lg(6^5) ≈ 12.9 bits`.

However in this module we use the CSRNG builtin to sample `n` words from
the dictionary, and securely shuffle them. The sampling is without replacement
as to not confuse the user in case of repeated words.
This lowers the entropy by a negligible amount.

## Usage

```js
var generatePassphrase = require('eff-diceware-passphrase')

generatePassphrase(8) // List of 8 words
generatePassphrase.entropy(100) // List of words with at least 100 bits of entropy

```

You can also get the JSON encoded dictionary directly:

```js
var dictionary = require('eff-diceware-passphrase/wordlist.json')
```

### Bundle size considerations

Be aware that the JSON encoded Diceware list is just over `25kb` gzipped.
Making a [minimal](example.js) Browserify bundle with optimisations will yield
a bundle of `34.6kb`.

```sh
$ browserify -g uglifyify -g unassertify example.js | uglifyjs -cm | gzip - | wc -c
34593
```

## API

### `generatePassphrase(count)`

Generate a list of `count` words, randomly shuffled and without replacement.

### `const arr = generatePassphrase.words`

Sorted array of all words in the Diceware list

### `const arr = generatePassphrase.entropy(minimum)`

Convenience function for generating a password with at least `mimimum` bits of entropy.

### `const i = generatePassphrase.indexOf(word)`

Like `Array.prototype.indexOf`. Returns the index in `generatePassphrase.words`
or `-1` if not found.

### `const bool = generatePassphrase.includes(word)`

Like `Array.prototype.includes`. Returns `true` if part of
`generatePassphrase.words` or `false` if not found.

### `const i = generatePassphrase.indexOfPrefix(prefix)`

Returns the index of the first occurrence of the prefix, or the end of the
wordlist if no prefixes match. Can be used to slice the list for eg. autocomplete

## Install

```sh
npm install eff-diceware-passphrase
```

## License

[ISC](LICENSE.md)
