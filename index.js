'use strict'

var assert = require('nanoassert')
var wordlist = require('./wordlist.json')
var sample = require('secure-sample')
var shuffle = require('secure-shuffle')
var binarySearch = require('binary-search-bounds')

var NUMBER_OF_TOKENS = wordlist.length
var ENTROPY_PER_TOKEN = Math.log(NUMBER_OF_TOKENS) / Math.log(2)

module.exports = function words (count) {
  assert(count > 0, 'count must be positive integer')
  assert(count < NUMBER_OF_TOKENS, 'count must be less than the number of tokens')

  var idx = sample(count, NUMBER_OF_TOKENS)

  return shuffle(idx.map(function (i) {
    return wordlist[i]
  }))
}

module.exports.words = wordlist
module.exports.entropy = function (minimum) {
  assert(minimum > 0, 'minimum entropy must be positive')
  assert(minimum <= NUMBER_OF_TOKENS * ENTROPY_PER_TOKEN, 'minimum entropy must be less than maximum possible entropy')

  return module.exports(Math.ceil(minimum / ENTROPY_PER_TOKEN))
}

module.exports.indexOf = function (word) {
  assert(typeof word === 'string', 'word must be string')

  return binarySearch.eq(wordlist, word)
}

module.exports.includes = function (word) {
  assert(typeof word === 'string', 'word must be string')

  return module.exports.indexOf(word) !== -1
}

module.exports.indexOfPrefix = function (word) {
  assert(typeof prefix === 'string', 'prefix must be string')

  return binarySearch.ge(wordlist, word)
}
