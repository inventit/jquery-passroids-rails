require 'passroids'

RSpec.describe Passroids do
  it "#strength should return 'weak' with a password less than 4 characters long" do
    expect(Passroids.strength('a' * 3)).to eq('Weak')
  end
end
