# Jquery::Passroids::Rails

[Passroids](http://plugins.jquery.com/project/PassRoids) for Rails.

Unfortunately, Passroids is not maintained any more. This gem provides `jquery.passroids.js` and the ruby implementation. `jquery.passroids.js` is latest version, probably.

## Installation

Add this line to your application's Gemfile:

```ruby
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

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/jquery-passroids-rails.

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
