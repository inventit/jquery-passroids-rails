require 'passroids'

RSpec.describe Passroids do
  describe "#strength" do
    context "Password length: < 4" do
      it "should return 'Weak' if password is nil" do
        expect(Passroids.strength(nil)).to eq("Weak")
      end

      it "should return 'Weak' if password length < 4" do
        expect(Passroids.strength('a' * 3)).to eq("Weak")
      end
    end

    context "Password length: 4 <= and < 5" do
      it "should reutrn 'Weak' if all letters are lower case" do
        expect(Passroids.strength('a' * 4)).to eq("Weak")
      end
    end

    context "Password length: 5 <= and < 8" do
      it "must be tested"
    end

    context "Password length: 8 <= and < 16" do
      it "must be tested"
    end

    context "Password length: 15 <=" do
      it "must be tested"
    end
  end
end
