# Jquery::Passroids::Rails

[Passroids](http://plugins.jquery.com/project/PassRoids) for Rails.

<a href="https://travis-ci.org/inventit/jquery-passroids-rails"><img src="https://travis-ci.org/inventit/jquery-passroids-rails.svg?branch=master" alt="Build Status" /></a>

Unfortunately, Passroids is not maintained any more. This gem provides `jquery.passroids.js` and the ruby implementation. `jquery.passroids.js` is latest version, probably.

## Installation

`jquery.passroids.js` provided by this gem is depends on `jquery.textchange.js`. You can install `jquery.textchange.js` by installing [jquery-textchange-rails](https://github.com/inventit/jquery-textchange-rails).

Add this line to your application's Gemfile:

```ruby
gem 'jquery-textchange-rails', git: 'https://github.com/inventit/jquery-textchange-rails.git'
gem 'jquery-passroids-rails'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install jquery-passroids-rails

## Usage

### Javascript

```
$('form').passroids({
  main: '.password',                  // password field
  verify: '.password_confirm',        // password confirm field.
  button: '.password_update_execute', // submit button
  minimum: 1                          // weak (0 = no requirement/weak, 1 = Medium, 2 = Strong, 3 = Excellent).
});
```

### Ruby

```ruby
Passroids.strength('hoge') # => "Weak"
```

## Runnint tests

### Javascript

No tests.

### Ruby

1. Install all dependencies with `bundle install`.
1. Run `bundle exec rspec`.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/jquery-passroids-rails.

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
