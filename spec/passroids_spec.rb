require 'passroids'

RSpec.describe Passroids do
  describe "#strength" do
    context "password length < 4" do
      it "should return 'Weak' if password is nil" do
        expect(Passroids.strength(nil)).to eq("Weak")
      end

      it "should return 'Weak' if password length < 4" do
        expect(Passroids.strength('a' * 3)).to eq("Weak")
      end
    end

    context "password length == 4" do
      context "and all letters are lower case" do
        it "should return 'Weak'" do
          expect(Passroids.strength('a' * 4)).to eq("Weak")
        end
      end

      context "and at least one upper case letter" do
        it "should return 'Weak'" do
          expect(Passroids.strength('aaAa')).to eq("Weak")
        end

        context "and at least one number" do
          it "should return 'Medium'" do
            expect(Passroids.strength('aaA1')).to eq("Medium")
          end
        end

        context "and at least three numbers" do
          it "should return 'Medium'" do
            expect(Passroids.strength('11A1')).to eq("Medium")
          end
        end

        context "and at least one special character" do
          it "should return 'Medium'" do
            expect(Passroids.strength('aA!a')).to eq("Medium")
          end
        end

        context "and at least two special characters" do
          it "should return 'Strong'" do
            expect(Passroids.strength('aA!!')).to eq("Strong")
          end
        end

        context "and both upper and lower case" do
          it "should return 'Medium'" do
            expect(Passroids.strength('aAaA')).to eq("Weak")
          end
        end

        context "and both letters and numbers" do
          it "should return 'Medium'" do
            expect(Passroids.strength('aAa1')).to eq("Medium")
          end
        end
      end
    end

    context "4 <= password length < 8" do
      it "must be tested"
    end

    context "8 <= password length < 16" do
      it "must be tested"
    end

    context "16 <= password length" do
      it "must be tested"
    end
  end
end
